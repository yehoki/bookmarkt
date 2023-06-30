'use client';
import LoginModal from '@/components/Login/LoginModal';
import useUserStore from '@/hooks/useUserStore';

export default function Home() {
  const userStore = useUserStore();
  if (!userStore.userEmail) {
    return <LoginModal />;
  }

  return <></>;
}
