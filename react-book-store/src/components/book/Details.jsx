const Details = ({ book }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg md:text-xl font-semibold">Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-4">
        <div>
          <strong>Subjects:</strong>
          <ol className="list-decimal list-inside mt-2 ml-4">
            {book?.subjects?.map((subject, i) => (
              <li key={i} className="my-1">
                {subject}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <strong>Bookshelves:</strong>
          <ol className="list-decimal list-inside mt-2 ml-4">
            {book?.bookshelves?.map((shelf, index) => (
              <li key={index} className="my-1">
                <span className="bg-blue-200 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {shelf}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <strong>Language:</strong> {book?.languages?.join(", ")}
        </div>
        <div>
          <strong>Copyright:</strong> Public Domain
        </div>
      </div>
    </div>
  );
};

export default Details;
