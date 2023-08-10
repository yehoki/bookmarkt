import getCurrentUser from '@/actions/getCurrentUser';
import getCurrentUserFriends from '@/actions/getCurrentUserFriends';
import Navbar from '@/components/Navbar/Navbar';
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

          <div>
            {currentUserFriends ? (
              currentUserFriends.map((friend) => (
                <div key={friend.id}>{friend.name}</div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
