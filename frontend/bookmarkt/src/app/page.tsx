import getBooksReadThisYear from '@/actions/getBooksReadThisYear';
import getCurrentUser from '@/actions/getCurrentUser';
import getCurrentUserBooks from '@/actions/getCurrentUserBooks';
import getMostRecentReviews from '@/actions/getMostRecentReviews';
import HomeBox from '@/components/HomeBox';
import LoginModal from '@/components/Login/LoginModal';
import Navbar from '@/components/Navbar/Navbar';
import HomeBook from '@/components/home/HomeBook';
import HomeUpdateItem from '@/components/home/HomeUpdateItem';
import HomeUpdateItemMobile from '@/components/home/HomeUpdateItemMobile';
import SwitchWithFooter from '@/components/home/SwitchWithFooter';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <>
        <Navbar currentUser={currentUser} />
        <LoginModal />
      </>
    );
  }

  const currentUserBooks = await getCurrentUserBooks();
  const firstTwoBooks = currentUserBooks.books.slice(0, 3);

  const mostRecentReviews = await getMostRecentReviews();

  const booksReadFromThisYear = await getBooksReadThisYear();
  console.log(booksReadFromThisYear);

  const updateDisplay = mostRecentReviews.map((review) => {
    return (
      <HomeUpdateItem
        key={review.id}
        userName={review.user.name ? review.user.name : 'User'}
        bookTitle={review.book.title}
        imageUrl={
          review.book.imageLinks.thumbnail
            ? review.book.imageLinks.thumbnail
            : ''
        }
        googleBookId={review.book.googleId}
        reviewRating={review.rating}
        reviewDescription={review.description ? review.description : ''}
        authors={review.book.author}
        bookDescription={review.book.description}
      />
    );
  });

  const mobileUpdateDisplay = mostRecentReviews.map((review) => {
    return (
      <HomeUpdateItemMobile
        key={review.id}
        userName={review.user.name ? review.user.name : 'User'}
        bookTitle={review.book.title}
        bookAuthors={review.book.author}
        googleBookId={review.book.googleId}
        reviewRating={review.rating}
        reviewDescription={review.description ? review.description : ''}
        imageUrl={
          review.book.imageLinks.thumbnail
            ? review.book.imageLinks.thumbnail
            : ''
        }
      />
    );
  });

  const sampleBooks = [
    {
      title: 'sampleBook',
      subtitle: 'sampleSubtitle',
      authors: ['sample Author'],
      publishedDate: '2023-07-10',
      description: 'Sample description text',
      imageLinks: {
        thumbnail: '/images/empty-book.png',
      },
    },
    {
      title: 'sampleBook',
      subtitle: 'sampleSubtitle',
      authors: ['sampleAuthor'],
      publishedDate: '2023-07-10',
      description: 'Sample description text',
      imageLinks: {
        thumbnail: '/images/empty-book.png',
      },
    },
  ];

  return (
    <div className="w-full h-[100dvh] bg-[rgba(244,241,234,0.5)]">
      <Navbar currentUser={currentUser} />
      <div className="md:w-[780px] navOne:w-[1220px] mx-auto pt-[100px] navOne:pt-[50px]">
        <div className="md:hidden mx-auto max-w-[625px] px-2">
          <div className="border-[#eeeeee] border-[1px] my-2">
            <div className="relative w-full aspect-[14/3] ">
              <Image
                src="/images/goodreads-span.png"
                fill
                alt="Goodreads span image"
              />
            </div>
            <div className="bg-white p-2 ">
              <div className="text-lg">
                Discover the Biggest Books of Summer
              </div>
              <div className="text-base text-neutral-400">
                Check out your fellow Goodreads members` most anticipated titles
                for the season.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mx-auto">
            {/* Review tab */}
            {mostRecentReviews.length === 0 ? (
              <div className="text-sm text-center">No more updates</div>
            ) : (
              mobileUpdateDisplay
            )}
          </div>
        </div>
        <div className="hidden md:flex flex-row justify-between mt-2 ">
          <div className="w-[300px]">
            <HomeBox heading="Currently reading" bottomBorder>
              <div>
                <div className="flex flex-col gap-2 py-2">
                  {firstTwoBooks.length > 0 && (
                    <HomeBook
                      title={firstTwoBooks[0].title}
                      authors={firstTwoBooks[0].author}
                      googleBookId={firstTwoBooks[0].googleId}
                      imgsrc={
                        firstTwoBooks[0].imageLinks.thumbnail
                          ? firstTwoBooks[0].imageLinks.thumbnail
                          : undefined
                      }
                    />
                  )}
                  {/* <HomeBook
                    title={firstTwoBooks[1].title}
                    authors={firstTwoBooks[1].author}
                    imgsrc={
                      firstTwoBooks[1].imageLinks.thumbnail
                        ? firstTwoBooks[1].imageLinks.thumbnail
                        : undefined
                    }
                  /> */}
                </div>
              </div>
              <div className="flex gap-[2px] text-xs py-2">
                <Link
                  href="/books"
                  className="text-goodreads-mybooks-green hover:underline"
                >
                  View all books
                </Link>
                <div className="text-goodreads-mybooks-green"> · </div>
                <div>Add a book</div>
                <div className="text-goodreads-mybooks-green"> · </div>
                <div>General update</div>
              </div>
            </HomeBox>
            <HomeBox heading="2023 Reading Challenge" bottomBorder>
              <div></div>
            </HomeBox>
            <HomeBox heading="Want to read" bottomBorder>
              <div>
                <div className="w-[110px] h-[130px] bg-[#7584e9]">
                  <div className="text-white text-4xl font-semibold text-center pb-1">
                    2023
                  </div>
                  <div className="w-[105px] h-[40px] relative mx-auto">
                    <Image
                      src="/images/2023-reading-challenge.svg"
                      alt="Reading challenge"
                      fill
                    />
                  </div>
                  <div>
                    <div className="text-white text-[22px] font-semibold uppercase text-center leading-none">
                      Reading
                    </div>
                    <div className="text-white text-md font-semibold uppercase text-center leading-none">
                      Challenge
                    </div>
                  </div>
                </div>
              </div>
            </HomeBox>
            <HomeBox heading="Bookshelves">
              <div></div>
            </HomeBox>
          </div>
          <div className="w-[460px] navOne:w-[560px]">
            <div className="border-[#eeeeee] border-[1px]">
              <div className="relative w-full h-[100px] ">
                <Image
                  src="/images/goodreads-span.png"
                  fill
                  sizes="100vw"
                  alt="Goodreads span image"
                />
              </div>
              <div className="bg-white p-2 ">
                <div className="text-lg">
                  Discover the Biggest Books of Summer
                </div>
                <div className="text-base text-neutral-400">
                  Check out your fellow Goodreads members` most anticipated
                  titles for the season.
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="uppercase font-medium">Updates</div>
              <div className="flex flex-col gap-4 pt-2">
                {mostRecentReviews.length === 0 ? (
                  <div className="text-sm text-center">No more updates</div>
                ) : (
                  updateDisplay
                )}
              </div>
            </div>
          </div>
          <SwitchWithFooter />
        </div>
      </div>
    </div>
  );
}
