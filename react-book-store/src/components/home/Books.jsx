import BookSkeleton from "./BookSkeleton";
import BookCard from "./BookCard";
import Pagination from "../common/Pagination";
const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Books = ({ fetchStatus, books, toggleWishlist, wishlistIds, setUrl }) => {
  return (
    <div className="py-40 max-w-6xl mx-auto px-4">
      {fetchStatus === "loading" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {skeleton.map((i) => (
            <BookSkeleton key={i} />
          ))}
        </div>
      )}
      {fetchStatus === "error" && (
        <p className="text-center text-red-500">Error fetching books.</p>
      )}
      {fetchStatus === "success" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {books?.results?.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              wishlistIds={wishlistIds}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
      <Pagination setUrl={setUrl} books={books} fetchStatus={fetchStatus} />
    </div>
  );
};

export default Books;
