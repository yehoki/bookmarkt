'use client';

import Image from 'next/image';
import Link from 'next/link';
import LoginButton from '../Login/LoginButton';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

interface UserModalInterface {
  title: string;
  subtitle?: string;
  mode: 'signIn' | 'signUp';
}

const UserModal: React.FC<UserModalInterface> = ({ title, subtitle, mode }) => {
  return (
    <div className="flex md:flex-row flex-col gap-10">
      <div className="relative block w-[200px] h-[50px] pt-4 md:mb-[22px] mx-auto md:mr-0 md:ml-2 mt-2">
        <Link href={'/'}>
          <Image src={'/images/bookmarkt.svg'} alt="Bookmarkt logo" fill />
        </Link>
      </div>
      <div
        className="bg-white border-[1px] border-[#d0d0c8] shadow-sm
    w-[600px] mx-auto px-[10px] pt-7 pb-[34px]
    text-center mt-4 rounded-sm
    "
      >
        <div className="flex flex-col justify-center gap-1">
          <div className="text-2xl font-bold text-goodreads-brown">{title}</div>
          <div className="mx-auto mb-[25px] text-center">{subtitle}</div>
          <div className="flex flex-col items-center justify-center gap-3">
            <LoginButton
              icon={BsGithub}
              provider="github"
              text="text-white"
              bg="bg-black"
              border="border-[1px] black"
            />
            <LoginButton
              icon={FcGoogle}
              provider="google"
              bg="bg-white"
              border="border-[1px]"
            />
            <LoginButton
              provider="credentials"
              email
              bg="bg-goodreads-brown"
              text="text-white"
              border="border-[1px] border-goodreads-brown"
              mode={mode}
            />
          </div>
          <div className="text-xs mt-[40px]">
            {mode === 'signIn' ? (
              <>
                Not a member?{' '}
                <Link href={'/user/sign_up'}>
                  <span className="underline decoration-solid decoration-black">
                    Sign up
                  </span>
                </Link>
              </>
            ) : (
              <>
                Already a member?{' '}
                <Link href={'/user/sign_in'} className="">
                  <span className="underline decoration-solid decoration-black">
                    Sign in
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
