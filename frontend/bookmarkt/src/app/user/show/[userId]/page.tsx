import getCurrentUser from '@/actions/getCurrentUser';
import getUserById from '@/actions/getUserById';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar/Navbar';
import UserReviewsMobile from '@/components/User/UserReviewsMobile';
import Image from 'next/image';
import { format } from 'date-fns';
import UserReviews from '@/components/User/UserReviews';
import MobileBox from '@/components/User/Mobile/MobileBox';
import { getUserBookselvesByUserId } from '@/actions/getUserBookshelvesByUserId';
import FriendButton from '@/components/User/FriendButton';
import Link from 'next/link';
import { getUsersBooksFromBookshelf } from '@/actions/getUsersBooksFromBookshelf';
import { getGoogleBooksFromList } from '@/actions/getGoogleBooksFromList';
import { getSingleBook } from '@/actions/getSingleBook';
import AddBookButton from '@/components/Books/SearchBooks/AddBookButton';
import { Bookshelf } from '@prisma/client';
import SingleBookReviews from '@/components/Books/SingleBook/SingleBookReviews';
import getReviewsByUserId from '@/actions/getReviewsByUserId';

interface UserProfilePageProps {
  params: { userId: string };
}

const UserProfilePage: React.FC<UserProfilePageProps> = async ({ params }) => {
  const userId = params.userId;
  const currentUser = await getCurrentUser();

  if (!userId || userId === '') {
    return <div>ErrorState</div>;
  }
  const userData = await getUserById(userId);

  if (!userData) {
    return <div>ErrorState</div>;
  }

  const checkFriends = () => {
    if (
      currentUser &&
      currentUser.friendIds &&
      currentUser.friendIds.includes(userData.id)
    ) {
      return true;
    }
    return false;
  };

  const checkRequest = () => {
    if (!checkFriends()) {
      if (
        currentUser &&
        currentUser.friendRequestsSent &&
        currentUser.friendRequestsSent.includes(userData.id)
      ) {
        return true;
      }
    }
    return false;
  };

  const checkRequestReceived = () => {
    if (!checkFriends()) {
      if (
        currentUser &&
        currentUser.friendRequestsReceived &&
        currentUser.friendRequestsReceived.includes(userData.id)
      ) {
        return true;
      }
    }
    return false;
  };

  const loggedInUserBookshelves = currentUser ? currentUser.bookshelves : [];

  const findBookshelfForBookId = (bookId: string, bookshelves: Bookshelf[]) => {
    return bookshelves.find((bookshelf) =>
      bookshelf.googleBooks.find(
        (bookshelfBook) => bookshelfBook.googleBookId === bookId
      )
    )?.name;
  };

  const userReviews = currentUser
    ? await getReviewsByUserId(currentUser.id)
    : [];
  const findLoggedInUserBookRating = (bookId: string) => {
    return userReviews?.find((review) => review.googleBookId === bookId)
      ?.rating;
  };

  const currentUserBookshelves = await getUserBookselvesByUserId(userId);

  const currentlyReadingBookshelf = currentUserBookshelves?.find(
    (bookshelf) => bookshelf.name === 'Currently reading'
  );

  const currentlReadingGoogleBookIds =
    currentlyReadingBookshelf?.googleBooks.map((book) => book.googleBookId);

  const currentlyReadingBooks = await getUsersBooksFromBookshelf(
    'Currently reading',
    userId
  );

  const currentlyReadingGoogleBooks = currentlyReadingBooks
    ? await Promise.all(
        currentlyReadingBooks.googleBooks.map(async (book) => {
          const res = await getSingleBook(book.googleBookId);
          if (res) {
            return res;
          }
          return null;
        })
      )
    : [];

  const numberOfRatings = userData.reviewIds.length;
  const numberOfReviews = userData.reviews.filter(
    (review) => review.description !== ''
  ).length;
  const averageRating =
    userData.reviews.reduce((total, review) => total + review.rating, 0) /
    userData.reviews.length;

  return (
    <>
      <Navbar currentUser={currentUser} />
      <div className="pt-[100px] navOne:pt-[50px] md:w-[970px] mx-auto">
        <div className="hidden md:flex mt-[15px] ml-[5px] ">
          <div className="flex flex-col  flex-1 ">
            <div className="flex flex-row ">
              <div className="mr-[10px]">
                <div className="relative w-[150px] h-[150px] rounded-full border border-black mb-1">
                  <Image
                    src={
                      userData.image ? userData.image : '/images/empty-user.png'
                    }
                    alt={`${userData.name} image`}
                    fill
                    className="rounded-full"
                  />
                </div>
                <UserReviews
                  ratedTotal={numberOfRatings}
                  averageRating={numberOfRatings !== 0 ? averageRating : 0}
                  reviewsTotal={numberOfReviews}
                />
              </div>
              <div className="pl-4 w-full flex flex-col gap-2">
                <div
                  className="border-b-[1px] border-[#d8d8d8] 
                text-2xl font-semibold tracking-wide text-goodreads-brown py-1 mb-1"
                >
                  {userData.name}
                </div>
                {currentUser && currentUser.id === userData.id ? (
                  <button
                    className="px-4 sm:px-8 py-2 bg-goodreads-beige hover:bg-[#ede6d6] 
                           border-goodreads-brown/20 border rounded-sm mr-auto
                           "
                  >
                    Edit your profile
                  </button>
                ) : (
                  <FriendButton
                    isFriends={checkFriends()}
                    userId={userId}
                    isRequestSent={checkRequest()}
                    isRequestReceived={checkRequestReceived()}
                  />
                )}
                <div className="flex flex-row gap-20">
                  <div className="font-semibold">Activity</div>
                  <div>Joined in {format(userData.createdAt, 'MMMM yyyy')}</div>
                </div>
                {/* <div className='flex flex-row gap-16'>
                    <div>Activity</div>
                </div> */}
              </div>
            </div>
            <div className="mt-4 ">
              <h3 className="uppercase font-semibold text-sm border-b-[1px] py-1">
                {userData.name}&apos;s Bookshelves
              </h3>
              <div className="flex gap-4 py-2">
                {currentUserBookshelves ? (
                  currentUserBookshelves.map((bookshelf) => (
                    <Link
                      href={`/books/user/${bookshelf.userId}?shelf=${bookshelf.name}`}
                      key={bookshelf.id}
                      className="text-xs text-goodreads-mybooks-green hover:underline"
                    >
                      {bookshelf.name} ({bookshelf.googleBooks.length})
                    </Link>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="uppercase font-semibold text-sm border-b-[1px] py-1">
                Currently Reading
              </h3>
              {currentlyReadingGoogleBooks &&
                currentlyReadingGoogleBooks[0] && (
                  <div className="flex gap-4 py-6">
                    <div className="relative w-[65px] aspect-[2/3] border">
                      <Link
                        href={`/books/${currentlyReadingGoogleBooks[0].id}`}
                      >
                        <Image
                          src={
                            currentlyReadingGoogleBooks[0].volumeInfo
                              .imageLinks &&
                            currentlyReadingGoogleBooks[0].volumeInfo.imageLinks
                              .thumbnail
                              ? currentlyReadingGoogleBooks[0].volumeInfo
                                  .imageLinks.thumbnail
                              : '/images/empty-book.png'
                          }
                          fill
                          alt="Currently reading book"
                        />
                      </Link>
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div className="text-xs">
                        <h4>
                          <Link
                            className="text-goodreads-mybooks-green hover:underline font-semibold mb-1"
                            href={`/user/show/${userData.id}`}
                          >
                            {userData.name}
                          </Link>{' '}
                          is currently reading
                        </h4>
                        <h5 className="text-base font-semibold">
                          {currentlyReadingGoogleBooks[0].volumeInfo.title}
                        </h5>
                        <div className="mb-1">
                          by{' '}
                          {currentlyReadingGoogleBooks[0].volumeInfo.authors &&
                          currentlyReadingGoogleBooks[0].volumeInfo.authors[0]
                            ? currentlyReadingGoogleBooks[0].volumeInfo
                                .authors[0]
                            : ''}
                        </div>
                        <div className="mb-1">
                          bookshelves:{' '}
                          <Link
                            className="text-goodreads-mybooks-green hover:underline"
                            href={`/books/user/${
                              userData.id
                            }?shelf=${'Currently reading'}`}
                          >
                            Currently reading
                          </Link>
                        </div>
                      </div>
                      <div className="">
                        <AddBookButton
                          bookId={currentlyReadingGoogleBooks[0].id}
                          bookshelves={loggedInUserBookshelves}
                          currentBookshelf={
                            findBookshelfForBookId(
                              currentlyReadingGoogleBooks[0].id,
                              loggedInUserBookshelves
                            ) || ''
                          }
                        />
                        <div className="text-xs text-[#999999] flex flex-col justify-start items-center mt-2">
                          Rate this book
                          <SingleBookReviews
                            bookId={currentlyReadingGoogleBooks[0].id}
                            reviewRating={
                              findLoggedInUserBookRating(
                                currentlyReadingGoogleBooks[0].id
                              ) || 0
                            }
                            size={18}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
          <div className="">
            <div>Reading Challenge</div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="border-b-[1px] flex flex-col justify-center items-center px-3 pt-3 pb-4">
            <div className="relative h-[100px] w-[100px]">
              <Image
                src={userData.image ? userData.image : '/images/empty-user.png'}
                alt="User picture"
                fill
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col justify-center items-center ">
              <div className="py-2 text-2xl font-bold tracking-wider">
                {userData.name ? userData.name : 'Name'}
              </div>
              <div className="py-2">
                {currentUser && currentUser.id === userData.id ? (
                  <button
                    className="px-4 sm:px-8 py-2 bg-goodreads-beige hover:bg-[#ede6d6] 
                           border-goodreads-brown/20 border rounded-sm"
                  >
                    Edit your profile
                  </button>
                ) : (
                  <FriendButton
                    isFriends={checkFriends()}
                    userId={userId}
                    isRequestSent={checkRequest()}
                    isRequestReceived={checkRequestReceived()}
                  />
                )}
              </div>
              <div className="text-sm">
                <UserReviewsMobile
                  ratedTotal={numberOfRatings}
                  reviewsTotal={numberOfReviews}
                  averageRating={numberOfRatings !== 0 ? averageRating : 0}
                />
              </div>
              <div className="text-[#999999] text-sm">
                Member since {format(userData.createdAt, 'MMMM yyyy')}
              </div>
            </div>
          </div>
          <MobileBox>Currently Reading</MobileBox>
          <MobileBox>Reading challenge</MobileBox>
          <MobileBox>Bookshelves</MobileBox>
          <MobileBox>Currently Reading</MobileBox>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserProfilePage;
