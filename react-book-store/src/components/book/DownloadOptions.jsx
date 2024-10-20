const DownloadOptions = ({ book }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl md:text-2xl font-semibold">Download Options</h2>
      <ul className="mt-2">
        {book?.formats &&
          Object.entries(book?.formats)?.map(([format, link]) => (
            <li key={format} className="mt-1">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Download as {format.split("/")[1].split("+")[0].toUpperCase()}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DownloadOptions;
