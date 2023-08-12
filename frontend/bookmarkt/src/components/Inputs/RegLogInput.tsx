'use client';

interface RegLogInputProps {
  type: string;
  label: string;
  placeholder?: string;
  min?: number;
}

const RegLogInput: React.FC<RegLogInputProps> = ({
  type,
  label,
  placeholder,
  min,
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <label htmlFor={label}>{label}</label>
      <input
        className="rounded-full border-[1px] border-[#a6a6a6]
         w-full
        px-[0.8rem] py-[0.4rem] bg-[#fafafa]"
        type={type}
        name={label}
        id={label}
        minLength={min ? min : 0}
        placeholder={placeholder ? placeholder : ''}
      />
    </div>
  );
};

export default RegLogInput;
