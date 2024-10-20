import { Link } from "react-router-dom";

const BookCard = ({ book, wishlistIds, toggleWishlist }) => {
  return (
    <div className="space-y-3 group">
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
          <h4 className="text-lg font-semibold">Type: {book.media_type}</h4>
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
          {wishlistIds.includes(book.id) ? "In wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
