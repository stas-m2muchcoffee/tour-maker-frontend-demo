import { get, head, values } from "lodash";
import type { GraphQLFormattedError } from "graphql";

export const getToastApolloErrors = (e?: GraphQLFormattedError): string => {
  return (
    head<string>(
      values<string>(get(e, "extensions.originalError.message.[0].constraints"))
    ) ||
    get(e, "extensions.originalError.message") ||
    "An error occurred"
  );
};
