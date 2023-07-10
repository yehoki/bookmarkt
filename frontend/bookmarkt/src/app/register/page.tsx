import RegisterForm from '@/components/Register/RegisterForm';
import Modal, { ModalInput } from '@/components/modals/Modal';

export default function Page() {
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
