import ConnectPoint from "../common/ConnectPoint";

interface Props {
  inputNodeRef: any;
  outputNodeRef: any;
}

function CardFooter({ inputNodeRef, outputNodeRef }: Props) {
  return (
    <div className="flex items-center justify-between text-[12px] text-gray-500">
      <ConnectPoint
        currentRef={outputNodeRef}
        title="input"
        titlePosition="end"
      />
      <ConnectPoint
        currentRef={inputNodeRef}
        title="output"
        titlePosition="start"
      />
    </div>
  );
}

export default CardFooter;
