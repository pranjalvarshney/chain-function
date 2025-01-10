import { memo } from "react";

interface InputFieldProps {
  value: string;
  inputChange: (e: any) => void;
  label: string;
  name: string;
}

function InputField({ value, inputChange, label, name }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="block text-[12px] font-medium text-[#252525]">
        {label}
      </label>
      <input
        value={value}
        onChange={inputChange}
        type="text"
        placeholder="+ , - , * , / , ^  are allowed"
        name={name}
        className="w-full h-[33px] px-3  border border-gray-300 rounded-[8px] text-[12px] focus:outline-none focus:ring focus:ring-indigo-100"
      />
    </div>
  );
}

export default memo(InputField);
