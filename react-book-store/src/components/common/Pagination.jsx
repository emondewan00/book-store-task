const Pagination = ({ setUrl, fetchStatus, books }) => {
  return (
    <div className="flex justify-end gap-x-4 mt-2">
      <button
        className={`flex items-center justify-center gap-1 rounded-md py-1.5 transition-all px-5 ${
          books.previous
            ? "bg-[#1C4336]/[14%] text-[#1C4336] hover:bg-[#1C4336]/[24%]"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
        onClick={() => setUrl(books.previous)}
        disabled={!books.previous || fetchStatus === "loading"}
      >
        Previous
      </button>
      <button
        className={`flex items-center justify-center gap-1 rounded-md py-1.5 transition-all px-5 ${
          books.next
            ? "bg-[#1C4336] text-white hover:opacity-80"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
        onClick={() => setUrl(books.next)}
        disabled={!books.next || fetchStatus === "loading"}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
