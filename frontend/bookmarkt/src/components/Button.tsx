'use client';

interface ButtonProps {
  background?: string;
  children: React.ReactNode;
  border?: string;
}

const Button: React.FC<ButtonProps> = ({
  background = '',
  children,
  border = '',
}) => {
  return (
    <div
      className={`
      ${background === '' ? 'bg-white' : background}
      ${border === '' ? 'border-none' : border}
      flex items-center justify-center rounded-[3rem] mb-2
    `}
    >
      {children}
    </div>
  );
};

export default Button;
