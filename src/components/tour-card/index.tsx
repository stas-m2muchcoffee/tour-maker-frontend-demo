import { generatePath, Link } from "react-router";
import { map } from "lodash";

import type { TourCardProps } from "./types";
import { RoutePath } from "../../enums/route-path.enum";

export const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <Link
      to={generatePath(RoutePath.TOUR_DETAILS, { id: tour.id })}
      className="bg-bg-primary border border-border-primary rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-gray-100"
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-primary line-clamp-2">{tour.title}</h3>
        <p className="text-secondary text-sm leading-relaxed line-clamp-5">
          {tour.description}
        </p>
        <span className="text-xs text-tertiary tracking-wider uppercase">
          {tour.city.name}, {tour.city.countryName}
        </span>
        <div className="flex items-center gap-2 line-clamp-1">
          {map(tour.categories, (category) => (
            <div
              key={category.id}
              className="text-xs text-tertiary border border-tertiary rounded-full px-2 py-1"
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};
