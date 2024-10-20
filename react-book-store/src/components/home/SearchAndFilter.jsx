import dropdownData from "../../../utils/dropdownData";

const SearchAndFilter = ({
  searchText,
  onQueryChange,
  filterValue,
  onFilterChange,
}) => {
  return (
    <div className="bg-book-banner-image bg-no-repeat bg-cover object-fill h-60 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative mt-40 z-10 px-4 smd:px-8 lg:px-16">
        <h2 className="text-2xl font-bold mb-2 text-white">
          Discover Your Next Favorite Book
        </h2>
        <p className="text-lg text-white mb-4">
          Search by title or author, and filter by topic or bookshelves
        </p>
        <div className="md:grid grid-cols-3 gap-4 shadow-md rounded-md bg-white p-8">
          <div className="col-span-2">
            <label
              htmlFor="search"
              className="block text-gray-600 font-medium mb-2"
            >
              Search by Book Title or Author Name
            </label>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Enter book title or author name"
              className="border border-gray-200 rounded w-full p-2 focus:outline-none"
              value={searchText}
              onChange={(e) => onQueryChange(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="filterBy"
              className="block text-gray-600 font-medium mb-2"
            >
              Filter by Topic or Bookshelf
            </label>
            <select
              className="cursor-pointer rounded-md border px-4 py-2 text-center text-gray-600 w-full"
              name="filterBy"
              id="filterBy"
              value={filterValue}
              onChange={onFilterChange}
            >
              <option value="">Select a topic or bookshelf</option>
              {dropdownData.map((data, i) => (
                <option value={data.value} key={i}>
                  {data.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
