import { memo } from "react";

interface SelectProps {
  value: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
}

function Select({ value, onChange, disabled }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="block text-[12px] font-medium text-[#252525]">
        Next function
      </label>
      <select
        value={value ?? ""}
        onChange={onChange}
        className="w-full h-[33px] px-1  border border-gray-300 rounded-[8px] text-[12px] bg-gray-100 text-gray-500 "
        disabled={disabled}
      >
        {value ? (
          <option value={value}>{value}</option>
        ) : (
          <option value="">-</option>
        )}
      </select>
    </div>
  );
}

export default memo(Select);
