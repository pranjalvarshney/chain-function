import { memo } from "react";
import InputField from "../common/InputField";
import Select from "../common/Select";
import CardFooter from "./CardFooter";

interface CardProps {
  title: string;
  currentFunction: number;
  nextFunction?: number | null;
  equation?: string;
  handleInputChange: (e: any) => void;
  handleChangeNextFunction?: (e: any) => void;
  inputNodeRef: any;
  outputNodeRef: any;
}

function Card(props: CardProps) {
  const {
    title,
    currentFunction,
    nextFunction,
    equation,
    handleInputChange,
    handleChangeNextFunction,
    inputNodeRef,
    outputNodeRef,
  } = props;

  return (
    <div className="bg-white px-[20px] py-[16px] w-[235px] h-[251px] rounded-[15px] flex flex-col gap-2 border border-gray-200 justify-between shadow-custom">
      <div className="flex justify-flex-start flex-col gap-4 h-full">
        <div className="flex items-center justify-flex-start mb-1 gap-2">
          <button className="text-gray-500 hover:text-gray-700">
            <img src="/icons/drag-icon.svg" alt="Drag Icon" />
          </button>
          <span className="text-[#A5A5A5] font-medium text-sm">{title}</span>
        </div>
        <InputField
          value={equation ?? ""}
          inputChange={handleInputChange}
          label="Equation"
          name={String(currentFunction)}
        />
        <Select
          disabled
          value={nextFunction ? "Function " + nextFunction : "-"}
          onChange={handleChangeNextFunction ?? undefined}
        />
      </div>
      <CardFooter inputNodeRef={inputNodeRef} outputNodeRef={outputNodeRef} />
    </div>
  );
}

export default memo(Card);
