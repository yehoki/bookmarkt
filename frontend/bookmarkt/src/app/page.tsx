import getCurrentUser from '@/actions/getCurrentUser';
import ConditionalNav from '@/components/ConditionalNav';
import LoginModal from '@/components/Login/LoginModal';
import Navbar from '@/components/Navbar/Navbar';

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <>
        <Navbar currentUser={currentUser} />
        <LoginModal />
      </>
    );
  }

  return (
    <>
      <Navbar currentUser={currentUser} />
    </>
  );
}
