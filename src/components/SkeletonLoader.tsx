export const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-3/4 rounded bg-gray-300"></div>
      <div className="my-2 space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 w-full rounded-xl bg-gray-300/60"></div>
        ))}
      </div>
    </div>
  );
};
