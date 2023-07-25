import getCurrentUser from '@/actions/getCurrentUser';
import { ModalInput } from '@/components/modals/Modal';
import UserModal from '@/components/modals/UserModal';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    return redirect('/');
  }

  return (
    <div>
      <UserModal title="Sign in to Goodreads" mode="signIn" />
    </div>
  );
};

export default Page;
