import { useQuery } from "@apollo/client/react";

import { GetMeDocument } from "../graphql/__generated__/graphql";

export const useActiveUser = () => {
  const { data } = useQuery(GetMeDocument);

  return data?.user?.getMe;
};
