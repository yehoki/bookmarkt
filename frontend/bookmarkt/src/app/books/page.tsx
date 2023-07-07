import getCurrentUser from '@/actions/getCurrentUser';
import getCurrentUserBooks from '@/actions/getCurrentUserBooks';
import MyBook from '@/components/Books/MyBookSection.tsx/MyBook';
import ConditionalNav from '@/components/ConditionalNav';

const Page = async () => {
  const currentUserBooks = await getCurrentUserBooks();

  return (
    <div className="pt-6 w-[1000px] mx-auto pb-[25px]">
      <div className="pb-2 border-b border-b-slate-300 flex items-center justify-between">
        <h2
          className="
        font-bold
        text-xl
        text-goodreads-mybooks-green
        "
        >
          My Books
        </h2>
        <div>Search</div>
      </div>
      {/* below header */}
      <div>
        <div className="flex flex-row justify-between">
          {/* Left col */}
          <div className="w-[200px]">
            <div className="border-b border-b-slate-300">
              <h3>Bookshelves</h3>
              <ul>
                <li>Bookshelf 1</li>
                <li>Bookshelf 2</li>
                <li>Bookshelf 3</li>
              </ul>
            </div>
            <div>
              <h3>Your reading activity</h3>
            </div>
            <div>
              <h3>Add books</h3>
            </div>
            <div>
              <h3>Tools</h3>
            </div>
          </div>
          {/* Right col */}
          <div className="w-[750px]">
            <div className="grid grid-cols-6 flex-[1_1_75%] gap-2 pt-2">
              {currentUserBooks.map((book) => (
                <MyBook
                  key={book.id}
                  title={book.title}
                  authors={book.author}
                  id={book.id}
                  googleId={book.googleId}
                  thumbnailUrl={
                    book.imageLinks && book.imageLinks.thumbnail
                      ? book.imageLinks.thumbnail
                      : ''
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
