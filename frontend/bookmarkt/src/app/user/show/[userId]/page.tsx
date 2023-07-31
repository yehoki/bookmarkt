import getCurrentUser from '@/actions/getCurrentUser';
import getUserById from '@/actions/getUserById';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar/Navbar';
import Image from 'next/image';

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
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="py-2 text-2xl">UserName</div>
            <div>
              {currentUser && currentUser.id === userData.id
                ? 'Edit your profile'
                : 'Follow'}
            </div>
            <div>
              Reviews: {numberOfRatings} books rated {numberOfReviews} reviews
              written
            </div>
            <div>Member since {userData.createdAt.toString()}</div>
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
