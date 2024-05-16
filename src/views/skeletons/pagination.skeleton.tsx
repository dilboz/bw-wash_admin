import { Line } from "@components";

export const PaginationSkeleton = () => {
  return (
    <div className="pagination-skeleton mt-3">
      <Line width="100%" height={41} radius={4} />
    </div>
  );
};
