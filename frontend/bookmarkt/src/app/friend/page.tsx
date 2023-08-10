import getCurrentUser from '@/actions/getCurrentUser';
import getCurrentUserFriends from '@/actions/getCurrentUserFriends';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar/Navbar';
import MobileFriendListDisplay from '@/components/User/Friends/MobileFriendListDisplay';
import { redirect } from 'next/navigation';

export default async function FriendPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect('/user/sign_up');
  }

  const currentUserFriends = await getCurrentUserFriends();

  return (
    <>
      <Navbar currentUser={currentUser} />

      <main className="pt-[100px] navOne:pt-[50px] px-2">
        <div className="hidden md:block">1234</div>
        <div className="md:hidden">
          <div className="py-2 border-b-[1px] ">
            <div className="flex justify-between items-center">
              <div className="text-2xl ">
                Friends ({currentUserFriends ? currentUserFriends.length : 0})
              </div>
              <div className="text-goodreads-mybooks-green font-bold">
                Add friends
              </div>
            </div>
            <div>
              <form>
                <input
                  type="text"
                  placeholder="Search your friends list"
                  className="w-full px-2 py-1 border rounded-md mt-2 border-goodreads-brown"
                />
              </form>
            </div>
          </div>

          <div className="py-2">
            {currentUserFriends ? (
              currentUserFriends.map((friend) => (
                <MobileFriendListDisplay
                  name={friend.name ? friend.name : ''}
                  id={friend.id}
                  bookCount={friend.googleBookIds.length}
                  imageUrl={friend.image ? friend.image : ''}
                  key={friend.id}
                />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
