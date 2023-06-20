import React from 'react';
import Link from 'next/link';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex bg-goodreads-beige drop-shadow-md font-Lato px-min-nav">
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-center font-bold text-2xl text-goodreads-brown ">
          <Link href={'/'}>Bookmarkt</Link>
        </h1>
        <nav className="hidden desktop:flex justify-between mx-8">
          <Link className="nav-btn" href={'/'}>
            Home
          </Link>
          <Link className="nav-btn" href={'/books'}>
            My Books
          </Link>
          <Link className="nav-btn" href={'/login'}>
            Login
          </Link>
          <Link className="nav-btn" href={'/register'}>
            Register
          </Link>
        </nav>
        <form className="px-4 flex justify-center flex-1 desktop:flex-initial">
          <input
            className="px-2 rounded-sm flex-auto"
            type="search"
            name="q"
            placeholder="Search books"
          />
          <button type="submit"></button>
        </form>
        <div className="flex gap-4">
          <p>B1</p>
          <p>B2</p>
          <p>B3</p>
          <p>B4</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
