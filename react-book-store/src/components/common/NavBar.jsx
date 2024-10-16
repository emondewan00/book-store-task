const NavBar = () => {
  return (
    <div className="">
      <div className="max-w-7xl flex justify-between mx-auto py-3">
        <div>
          <h1 className="text-blue-400 text-3xl font-bold font-serif">
            BookStore
          </h1>
        </div>
        <div className="flex gap-x-4 *:px-3 *:py-2 *:inline-block">
          <a href="">Home</a>
          <a href="">Wishlist</a>
          <a href="">Home</a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
