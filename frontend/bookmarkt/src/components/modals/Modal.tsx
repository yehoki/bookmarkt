'use client';

import Image from 'next/image';
import RegLogInput from '../Inputs/RegLogInput';
import Link from 'next/link';

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
}

const Modal: React.FC<ModalProps> = ({
  mainLabel,
  modalInputs,
  submitLabel,
  mode,
}) => {
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
        <form onSubmit={(e) => e.preventDefault()}>
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
              <Link href={'/user/sign_up'}>
                <button className="w-full py-2">Sign Up</button>
              </Link>
            </div>
          </>
        )}
        {mode === 'signUp' && (
          <>
            <div className="mx-auto mt-8">
              Already have an account?{' '}
              <span className="underline">
                <Link href={'/user/sign_in'}>Sign in</Link>
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
