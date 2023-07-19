'use client';

import Image from 'next/image';
import RegLogInput from '../Inputs/RegLogInput';
import Link from 'next/link';
import { FormEvent } from 'react';
import LoginButton from '../Login/LoginButton';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export interface ModalInput {
  label: string;
  type: string;
  placeholder?: string;
}

interface ModalProps {
  mainLabel: string;
  modalInputs: ModalInput[];
  submitLabel: string;
  mode: 'signIn' | 'signUp';
  onFormSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const Modal: React.FC<ModalProps> = ({
  mainLabel,
  modalInputs,
  submitLabel,
  mode,
  onFormSubmit,
}) => {
  const router = useRouter();

  const inputs = modalInputs.map((modalInput: ModalInput) => {
    return (
      <RegLogInput
        label={modalInput.label}
        placeholder={modalInput.placeholder}
        type={modalInput.type}
        key={modalInput.label}
      />
    );
  });

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = new FormData(e.currentTarget);
      const email = form.get('Email');
      const password = form.get('Password');
      if (!email || !password) {
        throw new Error('No email or password');
      }
      const credentials = {
        email: email,
        password: password,
      };
      const callback = await signIn('credentials', {
        ...credentials,
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registerForm = new FormData(e.currentTarget);
    try {
      const name = registerForm.get('Your name');
      const email = registerForm.get('Email');
      const passOne = registerForm.get('Password');
      const passTwo = registerForm.get('Re-enter password');
      if (passOne !== passTwo) {
        throw new Error('Passwords do not match');
      }
      if (!name || !email || !passOne || !passTwo) {
        throw new Error('Details missing');
      }
      const callback = await fetch('http://127.0.0.1:3000/api/register', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          email: email,
          password: passTwo,
        }),
      });
      if (callback.ok) {
        console.log('New account made');
        router.push('/login');
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="mx-auto w-[700px] py-[14px] px-[18px] ">
      <div className="relative block w-[200px] h-[50px] mx-auto pt-4 mb-[22px]">
        <Link href={'/'}>
          <Image src={'/images/bookmarkt.svg'} alt="Bookmarkt logo" fill />
        </Link>
      </div>

      <div className="flex flex-col w-[350px] my-0 mx-auto">
        <div className="mx-auto text-4xl font-semibold font-serif mb-2">
          {mainLabel}
        </div>
        <form onSubmit={mode === 'signIn' ? handleLogin : handleRegister}>
          <div className="flex flex-col gap-2">{inputs}</div>
          <div className="w-full bg-black rounded-full text-white mt-8 hover:opacity-80">
            <button className="w-full py-2">{submitLabel}</button>
          </div>
        </form>
        {mode === 'signIn' && (
          <>
            <div className="mx-auto mt-8">New to Bookmarkt?</div>
            <div
              className="w-full bg-white rounded-full text-black my-2 
            border-[1px] border-black hover:bg-neutral-200"
            >
              <Link href={'/register'}>
                <button className="w-full py-2">Create an account</button>
              </Link>
            </div>
          </>
        )}
        {mode === 'signUp' && (
          <>
            <div className="mx-auto mt-8">
              Already have an account?{' '}
              <span className="underline">
                <Link href={'/login'}>Sign in</Link>
              </span>
            </div>
          </>
        )}

        <div className="mx-auto mt-10 text-sm font-light">2023 Bookmarkt</div>
      </div>
    </div>
  );
};

export default Modal;
