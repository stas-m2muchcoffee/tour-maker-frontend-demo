import { useQuery } from "@apollo/client/react";
import { map } from "lodash";

import { GetToursDocument } from "../../../graphql/__generated__/graphql";
import { TourCard } from "../../../components/tour-card";
import { useActiveUser } from "../../../hooks/use-active-user";

export const MyToursSection = () => {
  const me = useActiveUser();
  const { data, loading } = useQuery(GetToursDocument, {
    variables: {
      filter: {
        userId: me?.id,
      },
    },
  });

  if (loading) return null;

  return (
    <>
      <h2 className="text-primary mb-2">My tours</h2>
      <p className="text-secondary mb-4">
        {data?.tour.getTours?.results?.length
          ? "Your personal collection"
          : "No tours found. Please create your own tour."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {map(data?.tour.getTours?.results, (tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </>
  );
};
