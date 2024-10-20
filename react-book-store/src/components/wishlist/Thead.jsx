const Thead = () => {
  return (
    <thead className="hidden md:table-header-group">
      <tr className="border-b *:pb-2">
        <th className="text-start">Book</th>
        <th className="text-start w-1/6">Author</th>
        <th className="text-start w-1/6">Languages</th>
        <th className="text-start w-1/6">Action</th>
      </tr>
    </thead>
  );
};

export default Thead;
