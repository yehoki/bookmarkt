import getCurrentUser from '@/actions/getCurrentUser';
import Modal, { ModalInput } from '@/components/modals/Modal';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const loginModalInputs: ModalInput[] = [
    {
      label: 'Your name',
      type: 'text',
      placeholder: 'First and last name',
    },
    {
      label: 'Email',
      type: 'email',
    },
    {
      label: 'Password',
      type: 'password',
      placeholder: 'At least 6 characters',
    },
    {
      label: 'Re-enter password',
      type: 'password',
    },
  ];
  const currentUser = await getCurrentUser();
  if (currentUser) {
    return redirect('/');
  }

  return (
    <>
      <Modal
        mainLabel="Create account"
        modalInputs={loginModalInputs}
        mode="signUp"
        submitLabel="Create account"
      />
    </>
  );
}
