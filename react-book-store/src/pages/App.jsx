import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const dropdownData = [
  { label: "Science Fiction", value: "science-fiction" },
  { label: "Children's Literature", value: "childrens-literature" },
  { label: "Philosophy", value: "philosophy" },
  { label: "Historical Fiction", value: "historical-fiction" },
  { label: "Mystery", value: "mystery" },
  { label: "Adventure", value: "adventure" },
  { label: "Poetry", value: "poetry" },
  { label: "Drama", value: "drama" },
  { label: "Fantasy", value: "fantasy" },
  { label: "Religion", value: "religion" },
  { label: "Mythology", value: "mythology" },
  { label: "Biography", value: "biography" },
  { label: "Politics", value: "politics" },
  { label: "Horror", value: "horror" },
];
const App = () => {
  const [url, setUrl] = useState("https://gutendex.com/books/?page=1");
  const [searchText, setSearchText] = useState("");
  const [wishlistIds, setWishlistIds] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [filterValue, setFilterValue] = useState("");
  const [books, setBooks] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  useEffect(() => {
    const query = JSON.parse(localStorage.getItem("query"));
    const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems"));
    const valueFilter = JSON.parse(localStorage.getItem("filterValue"));

    if (query) setSearchText(query);
    if (wishlistItems) setWishlistIds(wishlistItems);
    if (valueFilter) setFilterValue(valueFilter);
  }, []);

  useEffect(() => {
    const getBooks = async () => {
      setFetchStatus("loading");
      let u = url;
      if (searchText) {
        u += `&search=${searchText}`;
      }
      if (filterValue) {
        u += `&topic=${filterValue}`;
      }
      try {
        const response = await fetch(u);
        const data = await response.json();
        setBooks(data);
        setFetchStatus("success");
      } catch (error) {
        console.error("Error fetching books:", error);
        setFetchStatus("error");
      }
    };
    getBooks();
  }, [url, searchText, filterValue]);

  const toggleWishlist = (id) => {
    const ids = localStorage.getItem("wishlistItems");
    if (!ids) {
      localStorage.setItem("wishlistItems", JSON.stringify([id]));
      setWishlistIds([id]);
    } else {
      const currentIds = JSON.parse(ids);
      const index = currentIds.indexOf(id);
      if (index === -1) {
        currentIds.push(id);
      } else {
        currentIds.splice(index, 1);
      }
      setWishlistIds(currentIds);
      localStorage.setItem("wishlistItems", JSON.stringify(currentIds));
    }
  };

  const onQueryChange = (query) => {
    setSearchText(query);
    localStorage.setItem("query", JSON.stringify(query));
  };

  const onFilterChange = (e) => {
    const value = e.target.value;
    localStorage.removeItem("filterValue");
    setFilterValue(value);
    localStorage.setItem("filterValue", JSON.stringify(value));
  };

  return (
    <div>
      <div className="bg-flight-banner-image bg-no-repeat bg-cover object-fill h-56 flex items-center justify-center">
        <div className="mt-40">
          <h2 className="text-2xl font-bold mb-2 text-white">
            Search for Books
          </h2>
          <p className="text-lg text-white mb-4">
            Find books by name or publication year
          </p>
          <div className="grid grid-cols-3 gap-4 shadow-md rounded-md bg-white p-8 min-w-[30vw] w-full">
            <div className="col-span-2">
              <label
                htmlFor="search"
                className="block text-gray-600 font-medium mb-2"
              >
                Search by Book Title
              </label>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Type your search words"
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
                Filter by
              </label>
              <select
                className="cursor-pointer rounded-md border px-4 py-2 text-center text-gray-600"
                name="filterBy"
                id="filterBy"
                value={filterValue}
                onChange={onFilterChange}
              >
                <option value="">Select a genre</option>
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

      <div className="my-40 max-w-6xl mx-auto">
        {fetchStatus === "loading" && (
          <div className="grid grid-cols-5 gap-4">
            {skeleton.map((i) => (
              <div key={i} className="space-y-3 group animate-pulse">
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
            ))}
          </div>
        )}
        {fetchStatus === "error" && (
          <p className="text-center text-red-500">Error fetching books.</p>
        )}
        {fetchStatus === "success" && (
          <div className="grid grid-cols-5 gap-4">
            {books?.results?.map((book) => (
              <div key={book.id} className="space-y-3 group">
                <div className="flex items-center justify-center rounded-md border border-[#324251]/30 bg-white p-4 h-[200px]">
                  <img
                    className="h-full object-contain max-w-[144px] hover:scale-105 duration-150 delay-75 ease-in-out"
                    src={book.formats["image/jpeg"]}
                    alt={book.title}
                  />
                </div>
                <div className="space-y-3">
                  <Link
                    to={`/book/${book.id}`}
                    className="text-lg font-bold lg:text-xl line-clamp-1 group-hover:text-blue-500"
                  >
                    {book.title}
                  </Link>
                  <p className="text-xs lg:text-sm line-clamp-1">
                    By : <span>{book?.authors[0]?.name}</span>
                  </p>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">
                      Type: {book.media_type}
                    </h4>
                    <p className="text-xs lg:text-sm">Id: {book.id}</p>
                  </div>
                  <button
                    onClick={() => toggleWishlist(book.id)}
                    className={`flex items-center justify-center gap-1 rounded-md py-1.5 transition-all w-full ${
                      wishlistIds.includes(book.id)
                        ? "bg-[#DC2954]/[14%] text-[#DC2954] hover:bg-[#DC2954]/[24%]"
                        : "bg-[#1C4336]/[14%] text-[#1C4336] hover:bg-[#1C4336]/[24%]"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={wishlistIds.includes(book.id) ? "#DC2954" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                    {wishlistIds.includes(book.id)
                      ? "In wishlist"
                      : "Add to Wishlist"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end gap-x-4 mt-2">
          <button
            className={`flex items-center justify-center gap-1 rounded-md py-1.5 transition-all px-5 ${
              books.previous
                ? "bg-[#1C4336]/[14%] text-[#1C4336] hover:bg-[#1C4336]/[24%]"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            onClick={() => setUrl(books.previous)}
            disabled={!books.previous}
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
            disabled={!books.next}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
