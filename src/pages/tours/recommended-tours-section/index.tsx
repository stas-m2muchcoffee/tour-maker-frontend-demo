import { useQuery } from "@apollo/client/react";
import { map } from "lodash";

import { GetRecommendedToursDocument } from "../../../graphql/__generated__/graphql";
import { TourCard } from "../../../components/tour-card";

export const RecommendedToursSection = () => {
  const { data } = useQuery(GetRecommendedToursDocument);

  return (
    <>
      <h2 className="text-primary mb-2">Recommendations</h2>
      <p className="text-secondary mb-4">
        {data?.tour.getRecommendedTours?.length
          ? "Curated tours tailored to your preferences"
          : "No recommended tours found. Please try again later or update your preferences."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {map(data?.tour.getRecommendedTours, (tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </>
  );
};
