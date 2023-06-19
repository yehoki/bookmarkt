import React from 'react';
import Link from 'next/link';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="bg-goodreads-beige drop-shadow-md font-Lato">
      <div className="px-[20%] flex items-center">
        <h1 className="text-center font-bold text-2xl text-goodreads-brown ">
          <Link href={'/'}>Bookmarkt</Link>
        </h1>
        <nav className="flex justify-evenly mx-8">
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
        <div>
          <form>
            <input type="search" name="q" placeholder="Search books" />
            <button type="submit"></button>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Navbar;
