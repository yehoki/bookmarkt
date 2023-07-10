import getCurrentUser from '@/actions/getCurrentUser';
import ConditionalNav from '@/components/ConditionalNav';
import HomeBox from '@/components/HomeBox';
import LoginModal from '@/components/Login/LoginModal';
import Navbar from '@/components/Navbar/Navbar';
import HomeBook from '@/components/home/HomeBook';
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

  const getCurrentBooks = [];

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
        <div className="flex flex-row justify-between">
          <div className="w-[300px]">
            <HomeBox heading="Currently reading" bottomBorder>
              <div>
                <div className="flex flex-col gap-2">
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
                  View all books{' '}
                </Link>
                <div className="text-goodreads-mybooks-green"> · </div>
                <div>Add a book</div>
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
          <div className="w-[460px] navOne:w-[560px] border-[1px]">
            Middle Row
          </div>
          <div className="w-[300px] hidden navOne:block border-[1px]">
            Right Row (Invisible below navOne)
          </div>
        </div>
      </div>
    </>
  );
}
