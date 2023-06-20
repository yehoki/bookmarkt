import Link from 'next/link';

export default function NavLayout({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
}) {
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
          <Link className="nav-btn" href={isLoggedIn ? '/books' : ''}>
            My Books
          </Link>
          <Link className="nav-btn" href={'/'}>
            Browse
          </Link>
          <Link className="nav-btn" href={'/register'}>
            Community
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
        <>{children}</>
      </div>
    </div>
  );
}
