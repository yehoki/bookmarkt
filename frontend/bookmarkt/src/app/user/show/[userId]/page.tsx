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

  // const currentUserBookshelves = await getUserBookselvesByUserId(userId);

  // const currentlyReadingBookshelf = currentUserBookshelves?.find(
  //   (bookshelf) => bookshelf.name === 'Currently reading'
  // );

  // const currentlReadingGoogleBookIds =
  //   currentlyReadingBookshelf?.googleBooks.map((book) => book.googleBookId);

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
              <div className="pl-4 w-full">
                <div
                  className="border-b-[1px] border-[#d8d8d8] 
                text-2xl font-semibold tracking-wide text-goodreads-brown py-1 mb-1"
                >
                  {userData.name}
                </div>
                <div className="flex flex-row gap-20">
                  <div className="font-semibold">Activity</div>
                  <div>Joined in {format(userData.createdAt, 'MMMM yyyy')}</div>
                </div>
                {/* <div className='flex flex-row gap-16'>
                    <div>Activity</div>
                </div> */}
              </div>
            </div>
            <div>Users Fav books</div>
            <div>Bookshelves</div>
          </div>
          <div className=" ">
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
                UserName
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
                  <button
                    className="px-4 sm:px-8 py-2 bg-goodreads-beige hover:bg-[#ede6d6] 
                border-goodreads-brown/20 border rounded-sm"
                  >
                    Add Friend
                  </button>
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
