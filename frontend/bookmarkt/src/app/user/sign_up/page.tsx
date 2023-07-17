import { ModalInput } from '@/components/modals/Modal';
import UserModal from '@/components/modals/UserModal';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await getServerSession();
  if (session?.user) {
    return redirect('/');
  }

  return (
    <div className="h-[100dvh] bg-slate-200">
      <UserModal
        title="Sign up for Bookmarkt"
        subtitle="Sign up to see what your friends are reading, get book
            recommendations, and join the world's largest community of readers."
        mode="signUp"
      />
    </div>
  );
};

export default Page;
