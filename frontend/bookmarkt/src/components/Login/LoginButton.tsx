'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons';

interface LoginButtonProps {
  icon?: IconType;
  provider: 'credentials' | 'github' | 'google';
  bg: string;
  border: string;
  iconFill?: string;
  text?: string;
  email?: boolean;
  width?: string;
  mode?: 'signIn' | 'signUp';
}

const LoginButton: React.FC<LoginButtonProps> = ({
  icon: Icon,
  provider,
  bg,
  border,
  iconFill,
  text,
  email,
  width = 'w-full',
  mode,
}) => {
  const router = useRouter();
  const emailText =
    mode === 'signIn' ? 'Sign in with email' : 'Sign up with email';

  const handleLogin = async () => {
    if (mode === 'signUp') {
      return router.push('/register');
    }
    if (provider === 'credentials') {
      return router.push('/login');
    } else {
      await signIn(provider);
    }
  };
  return (
    <div className="w-[300px]" onClick={handleLogin}>
      <button
        className={`
      flex items-center justify-center gap-1
      ${width} rounded-[3px] text-center py-3
      hover:opacity-70
      ${bg} ${border} ${text}
  `}
      >
        {!email ? (
          <>
            {Icon && <Icon color={iconFill} size={24} />}
            Continue with <span className="capitalize">{provider}</span>
          </>
        ) : (
          <>{emailText}</>
        )}
      </button>
    </div>
  );
};

export default LoginButton;
