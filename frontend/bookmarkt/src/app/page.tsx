import getCurrentUser from '@/actions/getCurrentUser';
import ConditionalNav from '@/components/ConditionalNav';
import LoginModal from '@/components/Login/LoginModal';

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <>
        <ConditionalNav />
        <LoginModal />
      </>
    );
  }
  return (
    <>
      <ConditionalNav />
    </>
  );
}
