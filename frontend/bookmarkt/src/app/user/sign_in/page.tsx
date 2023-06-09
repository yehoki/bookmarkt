import { ModalInput } from '@/components/modals/Modal';
import UserModal from '@/components/modals/UserModal';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await getServerSession();
  if (session?.user) {
    return redirect('/');
  }

  const loginModalInputs: ModalInput[] = [
    {
      label: 'Email',
      type: 'email',
    },
    {
      label: 'Password',
      type: 'password',
    },
  ];

  return (
    <div>
      <UserModal title="Sign in to Goodreads" mode="signIn" />
    </div>
  );
};

export default Page;
