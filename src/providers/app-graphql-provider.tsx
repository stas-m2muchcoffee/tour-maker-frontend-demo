import { useMemo, type PropsWithChildren } from "react";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  defaultDataIdFromObject,
  InMemoryCache,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { ErrorLink } from "@apollo/client/link/error";
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from "@apollo/client/errors";
import { createClient } from "graphql-ws";
import { map } from "rxjs";

import { useLoader } from "../hooks/use-loader";

const getOperationType = (operation: ApolloLink.Operation) => {
  const definition = getMainDefinition(operation.query);

  if (definition.kind === "OperationDefinition") {
    return definition.operation;
  }

  return "unknown";
};

export const AppGraphqlProvider = ({ children }: PropsWithChildren) => {
  const { showLoader, hideLoader } = useLoader();
  const token = null;

  const client = useMemo(() => {
    const httpUri = `${import.meta.env.VITE_API_URL}/graphql`;
    const wsUri = `${import.meta.env.VITE_WS_API_URL}/graphql`;

    const httpLink = new HttpLink({
      uri: httpUri,
    });

    const authLink = new SetContextLink((prevContext) => {
      return {
        ...prevContext,
        headers: {
          ...prevContext.headers,
          authorization: token ? `Bearer ${token}` : null,
        },
      };
    });

    const wsLink = new GraphQLWsLink(
      createClient({
        url: wsUri,
        shouldRetry: () => true,
        keepAlive: 20_000,
        ...(token
          ? { connectionParams: () => ({ authorization: `Bearer ${token}` }) }
          : {}),
      })
    );

    const authHttpLink = authLink.concat(httpLink);

    const splitLink = ApolloLink.split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      authHttpLink
    );

    const loadingLink = new ApolloLink(
      (
        operation: ApolloLink.Operation,
        forward: ApolloLink.ForwardFunction
      ) => {
        const operationType = getOperationType(operation);

        const isSubscription = operationType === "subscription";

        if (isSubscription) return forward(operation);

        let loadingId: string;
        queueMicrotask(() => {
          loadingId = showLoader();
        });

        return forward(operation).pipe(
          map((result: ApolloLink.Result) => {
            queueMicrotask(() => {
              if (loadingId) hideLoader(loadingId);
            });
            return result;
          })
        );
      }
    );

    const errorLink = new ErrorLink(({ error }) => {
      if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      } else if (CombinedProtocolErrors.is(error)) {
        error.errors.forEach(({ message, extensions }) =>
          console.log(
            `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
              extensions
            )}`
          )
        );
      } else {
        console.error(`[Network error]: ${error}`);
      }
    });

    return new ApolloClient({
      cache: new InMemoryCache({
        dataIdFromObject(responseObject) {
          const queryRegex = /Query$/;
          const pagingRegex = /PagingResult$/;
          const typename = responseObject.__typename;

          switch (true) {
            case typename && queryRegex.test(typename):
              return responseObject.__typename;
            case typename && pagingRegex.test(typename):
              return `${responseObject.__typename}:${Date.now()}`;
            default:
              return defaultDataIdFromObject(responseObject);
          }
        },
      }),
      defaultOptions: {
        query: {
          errorPolicy: "all",
        },
      },
      devtools: {
        enabled: import.meta.env.MODE === "development",
      },
      link: ApolloLink.from([loadingLink, errorLink, splitLink]),
    });
  }, [token, showLoader, hideLoader]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
