import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const languages = {
  en: "English",
  bn: "Bengali",
  fr: "French",
  es: "Spanish",
  de: "German",
  it: "Italian",
  zh: "Chinese",
  ja: "Japanese",
  hi: "Hindi",
  ru: "Russian",
  ar: "Arabic",
  pt: "Portuguese",
  ko: "Korean",
  tr: "Turkish",
  ur: "Urdu",
};

const Wishlist = () => {
  const [url, setUrl] = useState("https://gutendex.com/books/");
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
    if (wishlistIds.length > 0) {
      let query = url + `?ids=${wishlistIds.join(",")}`;
      const getBooks = async () => {
        const response = await fetch(query);
        const data = await response.json();
        setBooks(data);
      };
      getBooks();
      console.log(query, "query");
    }
  }, [url, wishlistIds]);

  const toggleWishlist = (id) => {
    setWishlistIds((prevIds) => {
      const currentIds = [...prevIds]; // Create a copy of the current state
      const index = currentIds.indexOf(id);
      if (index === -1) {
        currentIds.push(id); // Add to wishlist if not found
      } else {
        currentIds.splice(index, 1); // Remove if already exists
      }
      localStorage.setItem("wishlistItems", JSON.stringify(currentIds)); // Update localStorage
      return currentIds; // Update state
    });
  };

  console.log(books);
  return (
    <div>
      <div className="bg-gray-100 h-40 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Wishlist
        </h1>
      </div>
      <table className="w-full max-w-5xl mx-auto mt-10">
        <thead className="w-full">
          <tr className="hidden md:table-row border-b *:pb-2">
            <th className="text-start w-1/3">Product</th>
            <th className="text-start w-1/6">Price</th>
            <th className="text-start w-1/6">Stock Status</th>
            <th className="text-start w-1/6">Action</th>
          </tr>
        </thead>
        <tbody className="cart md:*:!border-b">
          {books.results.map((book) => (
            <tr
              key={book.id}
              className="flex flex-col items-center justify-center border  p-4 m-4 md:!border-x-0 md:p-0 md:m-0 md:table-row md:*:my-2"
            >
              <td className="md:grid grid-cols-3 items-center gap-x-4 group">
                <img
                  src={book.formats["image/jpeg"]}
                  alt={book.title}
                  className="object-contain h-40 p-4 w-40 mx-auto md:mx-auto"
                />
                <div className="col-span-2 md:text-start text-center">
                  <Link
                    to={`/book/${book.id}`}
                    className="text-xl md:text-lg my-2 md:my-0 group-hover:text-blue-500"
                  >
                    {book.title}
                  </Link>
                  <p>Downloaded: {book.download_count}</p>
                </div>
              </td>
              <td className="text-center md:text-start">
                By: <span>{book?.authors?.[0]?.name || "Unknown Author"}</span>
                <p>
                  Born:{" "}
                  {book?.authors?.[0]?.birth_year
                    ? book.authors[0].birth_year
                    : "N/A"}{" "}
                  -{" "}
                  {book?.authors?.[0]?.death_year
                    ? book.authors[0].death_year
                    : "Present"}
                </p>
              </td>
              <td>{languages[book.languages?.[0]] || "Unknown"}</td>
              <td>
                <button
                  onClick={() => toggleWishlist(book.id)}
                  className={`flex items-center justify-center gap-1 rounded-md  py-1.5  lg:py-2 w-full bg-[#DC2954]/[14%] text-[#DC2954] transition-all hover:bg-[#DC2954]/[24%]
                  `}
                >
                  Remove from Wishlist
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Wishlist;
