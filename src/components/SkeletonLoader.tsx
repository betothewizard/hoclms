export const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="space-y-2 my-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 bg-gray-300/60 rounded-xl w-full"></div>
        ))}
      </div>
    </div>
  );
};