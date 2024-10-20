import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookDetailsSkeleton from "../components/book/BookDetailsSkeleton";
import DownloadOptions from "../components/book/DownloadOptions";
import Details from "../components/book/Details";
import BookImageAndTitle from "../components/book/BookImageAndTitle";

const BookDetails = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [status, setStatus] = useState("loading");
  const [book, setBook] = useState({});
  const { bookId } = useParams();

  useEffect(() => {
    const wishlistIds = JSON.parse(localStorage.getItem("wishlistItems"));
    if (wishlistIds) {
      setIsWishlisted(wishlistIds.includes(parseInt(bookId)));
    }
  }, [bookId]);

  useEffect(() => {
    const getBook = async () => {
      try {
        setStatus("loading");
        const response = await fetch(`https://gutendex.com/books/${bookId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBook(data);
        setStatus("loaded");
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        setStatus("error");
      }
    };
    getBook();
  }, [bookId]);

  if (status === "loading") {
    return <BookDetailsSkeleton />;
  }

  const toggleWishlist = (id) => {
    const ids = localStorage.getItem("wishlistItems");
    if (!ids) {
      localStorage.setItem("wishlistItems", JSON.stringify([id]));
      setIsWishlisted(true);
    } else {
      const currentIds = JSON.parse(ids);
      const index = currentIds.indexOf(id);
      if (index === -1) {
        currentIds.push(id);
        setIsWishlisted(true);
      } else {
        currentIds.splice(index, 1);
        setIsWishlisted(false);
      }
      localStorage.setItem("wishlistItems", JSON.stringify(currentIds));
    }
  };

  return (
    <div className="max-w-5xl mt-10 mx-auto pb-10 px-4">
      <div className="shadow-md bg-white p-6">
        <BookImageAndTitle
          book={book}
          toggleWishlist={toggleWishlist}
          isWishlisted={isWishlisted}
        />
        <Details book={book} />
        <DownloadOptions book={book} />
      </div>
    </div>
  );
};

export default BookDetails;
