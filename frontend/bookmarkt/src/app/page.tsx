'use client';
import ConditionalNav from '@/components/ConditionalNav';
import LoginModal from '@/components/Login/LoginModal';
import useUserStore from '@/hooks/useUserStore';

export default function Home() {
  const userStore = useUserStore();

  return (
    <>
      <ConditionalNav />
      {!userStore.userEmail ? (
        <>
          <LoginModal />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
