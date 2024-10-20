import { useEffect, useState } from "react";
import SearchAndFilter from "../components/home/SearchAndFilter";
import Books from "../components/home/Books";

const App = () => {
  const [url, setUrl] = useState("https://gutendex.com/books/?page=1");
  const [searchText, setSearchText] = useState("");
  const [wishlistIds, setWishlistIds] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [filterValue, setFilterValue] = useState("");
  const [books, setBooks] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  useEffect(() => {
    const query = JSON.parse(localStorage.getItem("query"));
    const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems"));
    const valueFilter = JSON.parse(localStorage.getItem("filterValue"));

    if (query) setSearchText(query);
    if (wishlistItems) setWishlistIds(wishlistItems);
    if (valueFilter) setFilterValue(valueFilter);
  }, []);

  useEffect(() => {
    let ignore = false;
    const getBooks = async () => {
      setFetchStatus("loading");
      let u = url;
      if (searchText) {
        u += `&search=${searchText}`;
      }
      if (filterValue) {
        u += `&topic=${filterValue}`;
      }
      try {
        const response = await fetch(u);
        const data = await response.json();
        if (!ignore) {
          setBooks(data);
          setFetchStatus("success");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setFetchStatus("error");
      }
    };
    getBooks();

    return () => {
      ignore = true;
    };
  }, [url, searchText, filterValue]);

  const toggleWishlist = (id) => {
    const ids = localStorage.getItem("wishlistItems");
    if (!ids) {
      localStorage.setItem("wishlistItems", JSON.stringify([id]));
      setWishlistIds([id]);
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

  const onQueryChange = (query) => {
    setSearchText(query);
    localStorage.setItem("query", JSON.stringify(query));
  };

  const onFilterChange = (e) => {
    const value = e.target.value;
    localStorage.removeItem("filterValue");
    setFilterValue(value);
    localStorage.setItem("filterValue", JSON.stringify(value));
  };

  return (
    <div className="overflow-hidden">
      <SearchAndFilter
        searchText={searchText}
        onQueryChange={onQueryChange}
        filterValue={filterValue}
        onFilterChange={onFilterChange}
      />

      <Books
        books={books}
        fetchStatus={fetchStatus}
        toggleWishlist={toggleWishlist}
        wishlistIds={wishlistIds}
        setUrl={setUrl}
      />
    </div>
  );
};

export default App;
