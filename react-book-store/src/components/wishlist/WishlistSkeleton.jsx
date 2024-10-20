const skeleton = [0, 1, 2];

const WishlistSkeleton = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-10 px-4">
      <table className="w-full">
        <thead className="hidden md:table-header-group">
          <tr className="border-b *:pb-2">
            <th className="text-start">Book</th>
            <th className="text-start w-1/6">Author</th>
            <th className="text-start w-1/6">Languages</th>
            <th className="text-start w-1/6">Action</th>
          </tr>
        </thead>
        <tbody>
          {skeleton.map((i) => (
            <tr
              key={i}
              className="flex flex-col items-center justify-center border p-4 md:!border-x-0 md:p-0 md:m-0 md:table-row animate-pulse"
            >
              <td className="md:grid grid-cols-3 items-center gap-x-4">
                <div className="h-40 w-40 bg-gray-300 mx-auto rounded-md" />
                <div className="col-span-2 md:text-start text-center">
                  <div className="h-6 bg-gray-300 rounded-md w-3/4 mx-auto mb-2" />
                  <div className="h-4 bg-gray-300 rounded-md w-1/2 mx-auto" />
                </div>
              </td>
              <td className="text-center md:text-start">
                <div className="h-4 bg-gray-300 rounded-md w-1/2 mx-auto mb-1" />
                <div className="h-4 bg-gray-300 rounded-md w-3/4 mx-auto" />
              </td>
              <td>
                <div className="h-4 bg-gray-300 rounded-md w-3/4" />
              </td>
              <td>
                <button className="flex items-center justify-center gap-1 rounded-md py-1.5 lg:py-2 px-4 bg-gray-300 animate-pulse w-full">
                  <div className="h-5 w-5 bg-gray-300 rounded-full" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WishlistSkeleton;
