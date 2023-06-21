'use client';
import Link from 'next/link';
import Container from '../Container';
import Logo from './Logo';
import { BiSearch } from 'react-icons/bi';
import Links from './Links';

export default function NavLayout({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
}) {
  return (
    <div
      className="
    fixed w-full z-10
   bg-goodreads-beige drop-shadow-md font-Lato"
    >
      <Container>
        <div
          className="
        flex
        flex-row
        lg:w-[1220px]
        mx-auto
        items-center gap-3 md:gap-0"
        >
          <Logo />
          <Links />
          {/* <nav className="hidden desktop:flex justify-between mx-8">
            <Link className="nav-btn" href={'/'}>
              Home
            </Link>
            <Link className="nav-btn" href={isLoggedIn ? '/books' : ''}>
              My Books
            </Link>
            <Link className="nav-btn" href={'/'}>
              Browse
            </Link>
            <Link className="nav-btn" href={'/register'}>
              Community
            </Link>
          </nav> */}
          <div
            className="
          border-[1px] border-[#999999] 
          w-full lg:w-[30%] px-2 py-1 rounded-[4px] 
          bg-[#FFFFFF] shadow-sm hover:shadow-md 
          transition cursor-pointer"
          >
            <div className="flex flex-row items-center justify-between gap-3">
              <div>Search books</div>
              <div className="px-1 rounded-full">
                <BiSearch size={18} />
              </div>
            </div>
          </div>
          {/* <form className="px-4 flex justify-center flex-1 desktop:flex-initial">
            <input
              className="px-2 rounded-sm flex-auto"
              type="search"
              name="q"
              placeholder="Search books"
            />
            <button type="submit"></button>
          </form> */}
          <div>{children}</div>
        </div>
      </Container>
    </div>
  );
}
