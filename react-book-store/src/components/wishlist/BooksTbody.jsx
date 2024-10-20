import { Link } from "react-router-dom";
import languages from "../../../utils/languages";
const BooksTbody = ({ books, deleteBook }) => {
  return (
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
            By: <span>{book?.authors?.[0]?.name || "Unknown Author"}</span>
            <p>
              Born: {book?.authors?.[0]?.birth_year || "N/A"} -{" "}
              {book?.authors?.[0]?.death_year || "Present"}
            </p>
          </td>
          <td>
            {book?.languages?.map((language, i) => (
              <span key={i}>{languages[language] || "Unknown"}</span>
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
  );
};

export default BooksTbody;
