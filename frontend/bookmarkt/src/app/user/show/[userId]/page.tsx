import getCurrentUser from '@/actions/getCurrentUser';
import getUserById from '@/actions/getUserById';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar/Navbar';
import UserReviews from '@/components/User/UserReviews';
import Image from 'next/image';
import { format } from 'date-fns';

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
      <div className="pt-[100px] navOne:pt-[50px]">
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
                'Edit your profile'
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
              <UserReviews
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
        <div>Currently Reading</div>
        <div>Reading challenge</div>
        <div>Bookshelves</div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfilePage;
