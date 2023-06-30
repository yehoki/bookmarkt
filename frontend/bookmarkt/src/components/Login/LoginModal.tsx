'use client';

import Image from 'next/image';
import LoginButton from './LoginButton';
import { BsApple } from 'react-icons/bs';
import { AiFillFacebook, AiOutlineAmazon } from 'react-icons/ai';

const LoginModal = () => {
  return (
    <div className="py-40 md:py-24 mx-auto max-w-[425px]">
      <div className="relative block w-[425px] h-[300px]">
        <Image src={'/images/SummerReading.png'} alt="Book" fill />
      </div>
      <div className="">
        <div className="px-3">
          <div className="text-2xl font-semibold text-center pt-8 pb-2">
            Meet your next favourite book.
          </div>
          <div className="text-center leading-tight">
            Find and read more books you`ll love. Join Bookmarkt, and be part of
            a great reading community.
          </div>
        </div>
        <div className="flex flex-col justify-evenly items-center gap-4 pt-6">
          <LoginButton
            icon={AiFillFacebook}
            provider="Facebook"
            bg="bg-[#3b5998]"
            border="border-[#3b5998] border-[1px]"
            text="text-white"
            iconFill="white"
          />
          <LoginButton
            icon={AiOutlineAmazon}
            provider="Amazon"
            bg="bg-[#f5d47a]"
            border="border-[1px] border-[#B38B22]"
          />
          <LoginButton
            icon={BsApple}
            provider="Apple"
            bg="bg-white"
            border="border-[1px] border-black"
          />
          <LoginButton
            provider="Email"
            bg="bg-[#F4F1EA]"
            text="text-[#333333]"
            border="border-[1px] border-[#D6D0C4]"
          />

          <div>Already a member? Sign In</div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
