import getCurrentUser from '@/actions/getCurrentUser';
import getCurrentUserFriends from '@/actions/getCurrentUserFriends';
import { getSingleBook } from '@/actions/getSingleBook';
import { getUserBooksByBookshelf } from '@/actions/getUserBooksByBookshelf';
import { getUserBookselvesByUserId } from '@/actions/getUserBookshelvesByUserId';
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
  if (!currentUserFriends) {
    return <div>Could not get friend information (EmptyState)</div>;
  }
  // want to get the current user friends and what they are reading
  // - at least the first 20

  const getCurrentUserFriendData = async () => {
    // For each friend we want to get their 'currently reading' bookshelf
    // and get information about their first 'currently reading' book
    const friendData = await Promise.all(
      currentUserFriends.map(async (friend) => {
        const friendBookshelves = await getUserBookselvesByUserId(friend.id);
        if (friendBookshelves) {
          const currentlyReadingBookshelf = friendBookshelves.filter(
            (bookshelf) => bookshelf.name === 'Currently reading'
          );
          if (currentlyReadingBookshelf[0].googleBooks.length > 0) {
            const currentlyReadingGoogleBookInfo = await getSingleBook(
              currentlyReadingBookshelf[0].googleBooks[0].googleBookId
            );
            if (currentlyReadingGoogleBookInfo) {
              return {
                name: friend.name,
                id: friend.id,
                image: friend.image,
                bookCount: friend.googleBookIds.length,
                friendCount: friend.friendIds.length,
                bookData: {
                  bookId:
                    currentlyReadingBookshelf[0].googleBooks[0].googleBookId,
                  imageLinks:
                    currentlyReadingGoogleBookInfo?.volumeInfo.imageLinks,
                  title: currentlyReadingGoogleBookInfo?.volumeInfo.title,
                },
              };
            }
          }
          return {
            name: friend.name,
            id: friend.id,
            image: friend.image,
            bookCount: friend.googleBookIds.length,
            friendCount: friend.friendIds.length,
            bookData: null,
          };
        }
        return null;
      })
    );
    return friendData;
  };

  const friendData = await getCurrentUserFriendData();

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
                  {friendData.map((friend) => {
                    if (friend) {
                      return (
                        <DesktopFriendListDisplay
                          key={friend.id}
                          name={friend.name ? friend.name : 'Username'}
                          id={friend.id}
                          image={friend.image ? friend.image : ''}
                          bookCount={friend.bookCount}
                          friendCount={friend.friendCount}
                          bookData={
                            friend.bookData ? friend.bookData : undefined
                          }
                        />
                      );
                    }
                  })}
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
