interface Props {
  title?: string;
  titlePosition?: "start" | "end";
  currentRef: any;
}

function ConnectPoint({ title, titlePosition, currentRef }: Props) {
  return (
    <div
      className={
        "flex items-center gap-2" +
        (titlePosition === "start" ? " flex-row" : " flex-row-reverse")
      }
    >
      {title && (
        <div className="text-[12px] font-medium text-[#585757]">{title}</div>
      )}
      <div className="w-[15px] h-[15px] bg-white border-[#DBDBDB] border-[2px] rounded-full flex items-center justify-center">
        <div
          ref={currentRef}
          className="w-[7px] h-[7px] bg-[#66A3FF] rounded-full"
        ></div>
      </div>
    </div>
  );
}

export default ConnectPoint;
