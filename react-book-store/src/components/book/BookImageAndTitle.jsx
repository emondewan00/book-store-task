import calculateAge from "../../../utils/calculateAge";

const BookImageAndTitle = ({ book, toggleWishlist, isWishlisted }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 mb-6 md:mb-0 border">
        <img
          src={book?.formats && book.formats["image/jpeg"]}
          alt={book?.title}
          className="w-full mx-auto p-4 hover:scale-105 transition-all duration-150 delay-75 max-h-80 object-contain"
        />
      </div>
      <div className="w-full md:w-2/3 md:ml-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{book?.title}</h1>
        <div className="text-base md:text-lg">
          <strong>Authors:</strong>
          <ul className="list-disc list-inside mt-2">
            {book?.authors?.length > 0 ? (
              book.authors.map((author, index) => (
                <li key={index}>
                  {author.name} Born: {author.birth_year}-
                  {author.death_year || "Present"} (
                  {calculateAge(author.birth_year, author.death_year)} ages)
                </li>
              ))
            ) : (
              <li>Not Available</li>
            )}
          </ul>
        </div>
        <p className="text-base md:text-lg mt-2">
          <strong>Downloads:</strong> {book?.download_count}
        </p>
        <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-4 items-start sm:items-center mt-4">
          <button
            onClick={() => toggleWishlist(book.id)}
            className={`flex items-center justify-center gap-1 rounded-md py-2 px-5 transition-all ${
              isWishlisted
                ? "bg-[#DC2954]/[14%] text-[#DC2954] hover:bg-[#DC2954]/[24%]"
                : "bg-[#1C4336]/[14%] text-[#1C4336] hover:bg-[#1C4336]/[24%]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isWishlisted ? "#DC2954" : "none"}
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
            {isWishlisted ? "In wishlist" : "Add to Wishlist"}
          </button>
          <button className="bg-green-100 px-5 py-2 rounded">
            Read Online
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookImageAndTitle;
