import { useCallback } from "react";
import { useQuery } from "@apollo/client/react";
import { floor, map, uniqBy } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

import { GetToursDocument } from "../../../graphql/__generated__/graphql";
import { TourCard } from "../../../components/tour-card";
import { useActiveUser } from "../../../hooks/use-active-user";

const toursPageSize = 20;

export const MyToursSection = () => {
  const me = useActiveUser();
  const { data, fetchMore, loading } = useQuery(GetToursDocument, {
    variables: {
      filter: {
        userId: me?.id,
      },
      paging: {
        page: 1,
        limit: toursPageSize,
      },
    },
    skip: !me?.id,
  });
  const toursData = data?.tour.getTours;
  const tours = toursData?.results || [];
  const toursTotalCount = toursData?.total || 0;

  const fetchMoreTours = useCallback(async () => {
    if (loading) return;

    await fetchMore({
      variables: {
        filter: {
          userId: me?.id,
        },
        paging: {
          page: floor(tours.length / toursPageSize) + 1,
          limit: toursPageSize,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const prevResults = prev.tour?.getTours?.results || [];
        const newResults = fetchMoreResult.tour?.getTours?.results || [];

        return {
          ...prev,
          tour: {
            ...prev.tour,
            getTours: {
              ...fetchMoreResult.tour?.getTours,
              results: uniqBy([...prevResults, ...newResults], "id"),
            },
          },
        };
      },
    });
  }, [fetchMore, tours.length, loading, me?.id]);

  return (
    <>
      <h2 className="text-primary mb-2">My tours</h2>
      <p className="text-secondary mb-4">
        {data?.tour.getTours?.results?.length
          ? "Your personal collection"
          : "No tours found. Please create your own tour."}
      </p>

      <InfiniteScroll
        dataLength={tours?.length}
        next={fetchMoreTours}
        hasMore={toursTotalCount > tours?.length}
        loader={
          <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        }
        scrollThreshold="200px"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {map(data?.tour.getTours?.results, (tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};
