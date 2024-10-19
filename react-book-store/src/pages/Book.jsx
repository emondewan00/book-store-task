import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Book = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState();

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await fetch(`https://gutendex.com/books/${bookId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };
    getBook();
  }, [bookId]);

  return (
    <div className="w-full max-w-7xl mx-auto mt-10 pb-10">
      <div className="shadow-md bg-white p-8 flex">
        <div>
          <img src={book?.formats["image/jpeg"]} alt={book?.title} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{book?.title}</h1>
          <p className="text-gray-600">
            By:{" "}
            {book?.authors.map((author, i) => (
              <span key={i}>{author.name}</span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Book;
