import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const [url, setUrl] = useState("https://gutendex.com/books/?page=1");
  const [searchText, setSearchText] = useState("");
  const [wishlistIds, setWishlistIds] = useState([]);

  const [books, setBooks] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  useEffect(() => {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems"));
    if (wishlistItems) {
      setWishlistIds(wishlistItems);
    }
  }, []);

  useEffect(() => {
    const getBooks = async () => {
      let u = url;
      if (searchText) {
        u = `${url}&search=${searchText}`;
      }
      const response = await fetch(u);
      const data = await response.json();
      setBooks(data);
    };
    getBooks();
  }, [url, searchText]);

  const toggleWishlist = (id) => {
    const ids = localStorage.getItem("wishlistItems");
    if (!ids) {
      localStorage.setItem("wishlistItems", JSON.stringify([id]));
      setWishlistIds(ids);
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

  return (
    <div>
      <div className="bg-flight-banner-image bg-no-repeat bg-cover object-fill h-56 flex items-center justify-center">
        {/* <img src="./flight-banner-image.jpg" alt="" /> */}
        {/* <div className="flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-white">Welcome to Zepto</h1>
      </div> */}

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
                onChange={(e) => setSearchText(e.target.value)}
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
              >
                <option value="">Sort</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="year_asc">Publication Year (Oldest)</option>
                <option value="year_desc">Publication Year (Newest)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="my-40 max-w-6xl mx-auto">
        <div className="grid grid-cols-5 gap-4">
          {books.results.map((book) => (
            <div key={books.id} className="space-y-3 group">
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

                  <p className="text-xs lg:text-sm"> Id:{book.id}</p>
                </div>

                <button
                  onClick={() => toggleWishlist(book.id)}
                  className={`flex items-center justify-center gap-1 rounded-md bg-[#1C4336]/[14%] py-1.5 text-[#1C4336] transition-all hover:bg-[#1C4336]/[24%] lg:py-2 w-full ${
                    wishlistIds.includes(book.id)
                      ? "bg-[#DC2954]/[14%] text-[#DC2954] transition-all hover:bg-[#DC2954]/[24%]"
                      : "bg-[#1C4336]/[14%] py-1.5 text-[#1C4336] transition-all hover:bg-[#1C4336]/[24%]"
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
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-x-4 mt-2">
          <button
            className="flex items-center justify-center gap-1 rounded-md bg-[#1C4336]/[14%] py-1.5 text-[#1C4336] transition-all hover:bg-[#1C4336]/[24%] px-5"
            onClick={() => setUrl(books.previous)}
            disabled={books.previous === null}
          >
            Previous
          </button>

          <button
            className="flex items-center justify-center gap-1 rounded-md bg-[#1C4336] py-1.5 text-white transition-all hover:opacity-80 px-5"
            onClick={() => setUrl(books.next)}
            disabled={books.next === null}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
