import { memo } from "react";
import ConnectPoint from "./ConnectPoint";

interface NumberInputProps {
  input: number | null;
  handleInputChange?: (e: any) => void;
  position: "start" | "end";
  title: string;
  bgColor: string;
  borderColor: string;
  disabled?: boolean;
  inputRef?: any;
  nodeRef: any;
}

function NumberInput({
  input,
  handleInputChange,
  position,
  bgColor,
  title,
  disabled,
  borderColor,
  inputRef,
  nodeRef,
}: NumberInputProps) {
  return (
    <div className={"flex flex-col gap-2 w-[115px]"}>
      <div
        className="w-full h-[22px] flex justify-center items-center rounded-[14px]  text-white text-[12px] font-bold "
        style={{ background: bgColor }}
      >
        {title}
      </div>
      <div
        className="w-full h-[50px] flex items-center gap-2 px-3  border  border-[2px] rounded-[8px]"
        style={{
          borderColor: borderColor,
          flexDirection: position === "end" ? "row" : "row-reverse",
        }}
      >
        <ConnectPoint currentRef={nodeRef} />
        <div
          className="w-[2px] h-full"
          style={{
            background: borderColor + "80",
          }}
        ></div>
        <input
          ref={inputRef}
          disabled={disabled}
          className={`w-full h-full text-[18px] font-bold focus:outline-none bg-transparent`}
          type="number"
          // placeholder={placeholder}
          value={(input ?? "").toString() ?? "-"}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default memo(NumberInput);
