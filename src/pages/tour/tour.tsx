import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router";
import { map } from "lodash";

import { GetTourDocument } from "../../graphql/__generated__/graphql";
import { TourMap } from "../../components/tour-map";

const TourPage = () => {
  const { id } = useParams();
  const { data } = useQuery(GetTourDocument, {
    variables: {
      input: { id: id! },
    },
  });
  const tour = data?.tour?.getTour;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-tertiary text-xs uppercase tracking-wider">
        {tour?.city?.name}, {tour?.city?.countryName}
      </p>
      <h2 className="text-primary text-xl font-bold">{tour?.title}</h2>
      <div className="flex items-center gap-2">
        {map(tour?.categories, (category) => (
          <div
            key={category.id}
            className="text-xs text-tertiary border border-tertiary rounded-full px-2 py-1"
          >
            {category.name}
          </div>
        ))}
      </div>
      <p className="text-secondary">{tour?.description}</p>

      {!!tour && <TourMap tour={tour} />}
    </div>
  );
};

export default TourPage;
