import getCurrentUser from '@/actions/getCurrentUser';
import getCurrentUserBooks from '@/actions/getCurrentUserBooks';
import getMostRecentReviews from '@/actions/getMostRecentReviews';
import ConditionalNav from '@/components/ConditionalNav';
import HomeBox from '@/components/HomeBox';
import LoginModal from '@/components/Login/LoginModal';
import Navbar from '@/components/Navbar/Navbar';
import HomeBook from '@/components/home/HomeBook';
import HomeUpdateItem from '@/components/home/HomeUpdateItem';
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
  // console.log(currentUserBooks);
  const getCurrentBooks = [];

  const mostRecentReviews = await getMostRecentReviews();

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
    <>
      <Navbar currentUser={currentUser} />
      <div className="w-[780px] navOne:w-[1220px] mx-auto pt-[100px] navOne:pt-[50px]">
        <div className="flex flex-row justify-between mt-2">
          <div className="w-[300px]">
            <HomeBox heading="Currently reading" bottomBorder>
              <div>
                <div className="flex flex-col gap-2 py-2">
                  <HomeBook
                    title={sampleBooks[0].title}
                    authors={sampleBooks[0].authors}
                    imgsrc={sampleBooks[0].imageLinks.thumbnail}
                  />
                  <HomeBook
                    title={sampleBooks[0].title}
                    authors={sampleBooks[0].authors}
                    imgsrc={sampleBooks[0].imageLinks.thumbnail}
                  />
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
              <div></div>
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
              <div className="flex flex-col gap-4 pt-2">{updateDisplay}</div>
            </div>
          </div>
          <SwitchWithFooter />
        </div>
      </div>
    </>
  );
}
