import { useEffect, useState } from "react";
import Pagination from "../components/common/Pagination";
import BooksTbody from "../components/wishlist/BooksTbody";
import Thead from "../components/wishlist/Thead";
import WishlistSkeleton from "../components/wishlist/WishlistSkeleton";
import Breadcrumb from "../components/wishlist/Breadcrumb";

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
    let ignore = false;

    if (wishlistItems.length > 0) {
      const query = `${url}?ids=${wishlistItems.join(",")}`;

      const getBooks = async () => {
        try {
          const response = await fetch(query);

          if (!response.ok) {
            throw new Error("Failed to fetch books");
          }

          const data = await response.json();
          if (!ignore) {
            setBooks(data);
            setStatus("loaded");
          }
        } catch (err) {
          setError(err.message);
          setStatus("error");
        }
      };

      getBooks();
    } else {
      setStatus("loaded");
    }

    return () => {
      ignore = true;
    };
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
    <div className="min-h-screen flex flex-col pb-10">
      <Breadcrumb />
      {status === "loading" && <WishlistSkeleton />}

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
                <Thead />
                <BooksTbody books={books} deleteBook={deleteBook} />
              </table>
              <Pagination books={books} fetchStatus={status} setUrl={setUrl} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
