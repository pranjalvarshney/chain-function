interface RadioProps {
  title?: string;
  titlePosition?: "start" | "end";
}

function Radio({ title, titlePosition }: RadioProps) {
  return (
    <div
      className={
        "flex items-center gap-2" +
        (titlePosition === "start" ? " flex-row" : " flex-row-reverse")
      }
    >
      {title && (
        <label
          htmlFor="default-radio-1"
          className="text-[12px] font-medium text-[#585757]"
        >
          {title}
        </label>
      )}
      <input
        id="default-radio-1"
        type="radio"
        value=""
        name="default-radio"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  outline-none"
      />
    </div>
  );
}

export default Radio;
