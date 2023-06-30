'use client';

import Link from 'next/link';
import { IconType } from 'react-icons';

interface LoginButtonProps {
  icon?: IconType;
  provider: string;
  bg: string;
  border: string;
  iconFill?: string;
  text?: string;
  email?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  icon: Icon,
  provider,
  bg,
  border,
  iconFill,
  text,
  email,
}) => {
  return (
    <Link href={'/'} className="w-full">
      <button
        className={`
      flex items-center justify-center gap-1
      w-full rounded-[3px] text-center py-3
      hover:opacity-70
      ${bg} ${border} ${text}
  `}
      >
        {!email ? (
          <>
            {Icon && <Icon color={iconFill} size={24} />}
            Continue with {provider}
          </>
        ) : (
          <>Sign up with email</>
        )}
      </button>
    </Link>
  );
};

export default LoginButton;
