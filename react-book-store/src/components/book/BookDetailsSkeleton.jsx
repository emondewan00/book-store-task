const BookDetailsSkeleton = () => {
  return (
    <div className="max-w-5xl mt-10 mx-auto pb-10 animate-pulse">
      <div className="shadow-md bg-white p-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-6 md:mb-0 border">
            <div className="h-72 bg-gray-200 mx-auto p-4"></div>
          </div>
          <div className="md:w-2/3 md:ml-6">
            <div className="h-8 bg-gray-200 mb-4 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded mb-2 w-1/4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2 w-1/3"></div>
            <div className="flex gap-x-4 items-center mt-2">
              <div className="w-36 h-10 bg-gray-200 rounded"></div>
              <div className="w-24 h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Metadata Section */}
        <div className="mt-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid md:grid-cols-2 mt-2 gap-4">
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-5/6"></div>
              <div className="h-6 bg-gray-200 rounded w-4/5"></div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-5/6"></div>
              <div className="h-6 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>

        {/* Download Options Section */}
        <div className="mt-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsSkeleton;
