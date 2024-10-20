const BookSkeleton = () => {
  return (
    <div className="space-y-3 group animate-pulse">
      <div className="flex items-center justify-center rounded-md border border-[#324251]/30 bg-white p-4 h-[200px]">
        <div className="h-full w-[144px] bg-gray-300 rounded-md" />
      </div>
      <div className="space-y-3">
        <div className="h-6 bg-gray-300 rounded-md lg:h-8" />
        <div className="h-4 bg-gray-300 rounded-md lg:h-5" />
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-300 rounded-md lg:h-8 w-1/2" />
          <div className="h-4 bg-gray-300 rounded-md lg:h-5 w-1/4" />
        </div>
        <button className="flex items-center justify-center gap-1 rounded-md py-1.5 bg-gray-300 animate-pulse w-full">
          <div className="h-5 w-5 bg-gray-300 rounded-full" />
          <span className="h-4 bg-gray-300 rounded-md w-1/2" />
        </button>
      </div>
    </div>
  );
};

export default BookSkeleton;
