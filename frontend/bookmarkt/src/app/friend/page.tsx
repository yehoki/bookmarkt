import getCurrentUser from '@/actions/getCurrentUser';
import getCurrentUserFriends from '@/actions/getCurrentUserFriends';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar/Navbar';
import DesktopFriendListDisplay from '@/components/User/Friends/DesktopFriendListDisplay';
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
        <div className="hidden lg:block pb-[25px]">
          <div className="w-[970px] mx-auto mt-4">
            <div className="text-xl font-semibold border-b-[1px] pb-1">
              Friends
            </div>
            <div className="py-4 flex gap-4">
              <div className="w-[625px]">
                <form>
                  <div className="flex gap-1 items-center w-full text-sm mb-10">
                    <input
                      className="w-full px-2 py-1 border rounded-sm"
                      type="text"
                      placeholder="Search your friends list"
                    />
                    <button className="bg-goodreads-beige hover:bg-[#ede6d6] py-1 px-2 rounded-sm border">
                      Search
                    </button>
                  </div>
                </form>

                <div className="text-xs border-b-[1px]">Showing</div>
                <div className="py-2">
                  {currentUserFriends ? (
                    currentUserFriends.map((friend) => (
                      <DesktopFriendListDisplay
                        key={friend.id}
                        name={friend.name ? friend.name : 'Username'}
                        id={friend.id}
                        image={friend.image ? friend.image : ''}
                        bookCount={friend.googleBookIds.length}
                        friendCount={friend.friendIds.length}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="w-[300px]">Right</div>
            </div>
          </div>
        </div>
        <div className="lg:hidden">
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
