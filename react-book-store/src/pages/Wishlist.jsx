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

const skeleton = [0, 1, 2];

const Wishlist = () => {
  const [url, setUrl] = useState("https://gutendex.com/books/");
  const [status, setStatus] = useState("loading");
  const [books, setBooks] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const wishlistItems =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setStatus("loading");

    if (wishlistItems.length > 0) {
      const query = `${url}?ids=${wishlistItems.join(",")}`;

      const getBooks = async () => {
        try {
          const response = await fetch(query);

          if (!response.ok) {
            throw new Error("Failed to fetch books");
          }

          const data = await response.json();
          setBooks(data);
          setStatus("loaded");
        } catch (err) {
          setError(err.message);
          setStatus("error");
        }
      };

      getBooks();
    } else {
      setStatus("loaded");
    }
  }, [url]);

  const deleteBook = (id) => {
    const filteredBooks = books.results.filter((book) => book.id !== id);
    setBooks((prevBooks) => ({ ...prevBooks, results: filteredBooks }));
    const wishlistItems =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];
    const updatedWishlist = wishlistItems.filter((itemId) => itemId !== id);
    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gray-100 h-56 flex items-center justify-center bg-flight-banner-image relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="text-2xl font-bold text-center text-white relative z-40">
          Wishlist
        </h1>
      </div>

      {status === "loading" && (
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
      )}

      {status === "error" && (
        <div className="flex justify-center items-center h-[75vh]">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      )}

      {status === "loaded" && (
        <div className="w-full max-w-5xl mx-auto mt-10 px-4 ">
          {books.results.length === 0 ? (
            <div className="flex justify-center items-center h-[70vh]">
              <p className="text-xl">Your wishlist is empty.</p>
            </div>
          ) : (
            <>
              <table className="w-full">
                <thead className="hidden md:table-header-group">
                  <tr className="border-b *:pb-2">
                    <th className="text-start">Book</th>
                    <th className="text-start w-1/6">Author</th>
                    <th className="text-start w-1/6">Languages</th>
                    <th className="text-start w-1/6">Action</th>
                  </tr>
                </thead>
                <tbody className="space-y-4 md:space-y-0">
                  {books.results.map((book) => (
                    <tr
                      key={book.id}
                      className="flex flex-col items-center justify-center border p-4 md:!border-x-0 md:p-0 md:m-0 md:table-row"
                    >
                      <td className="md:grid grid-cols-3 items-center gap-x-4 group">
                        <img
                          src={book.formats["image/jpeg"]}
                          alt={book.title}
                          className="object-contain h-40 p-4 w-40 mx-auto"
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
                        By:{" "}
                        <span>
                          {book?.authors?.[0]?.name || "Unknown Author"}
                        </span>
                        <p>
                          Born: {book?.authors?.[0]?.birth_year || "N/A"} -{" "}
                          {book?.authors?.[0]?.death_year || "Present"}
                        </p>
                      </td>
                      <td>
                        {book?.languages?.map((language, i) => (
                          <span key={i}>
                            {languages[language] || "Unknown"}
                          </span>
                        ))}
                      </td>
                      <td>
                        <button
                          onClick={() => deleteBook(book.id)}
                          className="flex items-center justify-center gap-1 rounded-md py-1.5 lg:py-2 px-4 bg-[#DC2954]/[14%] text-[#DC2954] transition-all hover:bg-[#DC2954]/[24%]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6l-1.5 14.5a2 2 0 0 1-2 1.5H8.5a2 2 0 0 1-2-1.5L5 6"></path>
                            <path d="M10 11v6"></path>
                            <path d="M14 11v6"></path>
                            <path d="M5 6l1-2a2 2 0 0 1 2-1h8a2 2 0 0 1 2 1l1 2"></path>
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
