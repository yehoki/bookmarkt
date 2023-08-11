'use client';

import addNewFriendById from '@/actions/addNewFriendById';
import { SITE_URL } from '@/utils/config';
import { set } from 'mongoose';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsCheck, BsCheckLg } from 'react-icons/bs';

interface FriendButtonProps {
  isFriends: boolean;
  // addFriend: () => void;
  userId: string;
  isRequestSent: boolean;
}

const FriendButton: React.FC<FriendButtonProps> = ({
  isFriends,
  userId,
  isRequestSent,
}) => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const [hoveringFriendsText, setHoveringFriendsText] = useState(false);

  const handleSendFriendRequest = async () => {
    setIsDisabled(true);
    const test = await fetch(`${SITE_URL}/api/users/friendRequest/${userId}`, {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
      }),
    });
    setIsDisabled(false);
    router.refresh();
  };

  const handleRemoveFriend = async () => {
    setIsDisabled(true);
    const test = await fetch(`${SITE_URL}/api/users/friends/${userId}`, {
      method: 'DELETE',
      body: JSON.stringify({
        userId: userId,
      }),
    });
    setIsDisabled(false);
    router.refresh();
  };

  const handleRemoveFriendRequest = async () => {
    setIsDisabled(true);
    const test = await fetch(`${SITE_URL}/api/users/friendRequest/${userId}`, {
      method: 'DELETE',
      body: JSON.stringify({
        userId: userId,
      }),
    });
    setIsDisabled(false);
    router.refresh();
  };

  return (
    <>
      {isFriends ? (
        <button
          disabled={isDisabled}
          onClick={handleRemoveFriend}
          className="w-fit"
          onMouseEnter={() => setHoveringFriendsText(true)}
          onMouseLeave={() => setHoveringFriendsText(false)}
        >
          <div
            className="flex gap-2 items-center w-[150px] justify-center py-2
        bg-goodreads-beige hover:bg-[#ede6d6]
        active:bg-goodreads-brown/20
        border-goodreads-brown/20 border rounded-sm
        "
          >
            {hoveringFriendsText ? (
              <>Unfriend</>
            ) : (
              <>
                <BsCheckLg size={18} />
                <div>Friends</div>
              </>
            )}
          </div>
        </button>
      ) : (
        <>
          {isRequestSent ? (
            <>
              <button
                disabled={isDisabled}
                onMouseEnter={() => setHoveringFriendsText(true)}
                onMouseLeave={() => setHoveringFriendsText(false)}
                onClick={handleRemoveFriendRequest}
                className="px-4 sm:px-8 py-2 bg-goodreads-beige hover:bg-[#ede6d6]
            active:bg-goodreads-brown/20
            border-goodreads-brown/20 border rounded-sm mr-auto "
              >
                {hoveringFriendsText
                  ? 'Cancel friend Request'
                  : 'Friend request sent'}
              </button>
            </>
          ) : (
            <button
              disabled={isDisabled}
              onClick={handleSendFriendRequest}
              className="px-4 sm:px-8 py-2 bg-goodreads-beige hover:bg-[#ede6d6]
            active:bg-goodreads-brown/20
            border-goodreads-brown/20 border rounded-sm mr-auto "
            >
              Add Friend
            </button>
          )}
        </>
      )}
    </>
  );
};

export default FriendButton;
