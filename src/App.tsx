import { useEffect } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import NumberInput from "./components/common/NumberInput";
import useHandleCalculation from "./hooks/useHandleCalculation";
import useRenderFlow from "./hooks/useRenderFlow";

function App() {
  const {
    handleInputFunctionChange,
    handleInputValueChange,
    input,
    inputRef,
    list,
    output,
  } = useHandleCalculation();

  const { refs } = useRenderFlow({ list });

  // making the input box focused at initial render
  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="bg-[url('/images/magic-pattern.svg')] bg-cover bg-center h-screen w-screen">
      <div className="w-[1225px] mx-auto flex gap-[15px] items-center h-[60vh]">
        <NumberInput
          input={input.value}
          handleInputChange={handleInputValueChange}
          position="start"
          title="Initial value of x"
          bgColor="#E29A2D"
          borderColor="#FFC267"
          inputRef={inputRef}
          nodeRef={(el: HTMLElement) => (refs.current.inputField = el)}
        />
        <div className="w-[965px]  flex flex-wrap gap-[130px] m-auto w-[980px] h-full  justify-center items-center pt-[126px]">
          {list.map((card, index) => {
            return (
              <Card
                key={index}
                title={"Function " + card.id}
                currentFunction={card.id}
                equation={card.equation}
                nextFunction={card.next}
                handleInputChange={handleInputFunctionChange}
                outputNodeRef={(el: HTMLElement) =>
                  (refs.current.functionInput[index] = el)
                }
                inputNodeRef={(el: HTMLElement) =>
                  (refs.current.functionOutput[index] = el)
                }
              />
            );
          })}
        </div>
        <NumberInput
          input={output}
          disabled
          position="end"
          title="Final Output y"
          bgColor="#4CAF79"
          borderColor="#2DD179"
          nodeRef={(el: HTMLElement) => (refs.current.outputField = el)}
        />
        <canvas
          id="line-canvas"
          className="absolute top-0 left-0 pointer-events-none"
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </div>
    </div>
  );
}

export default App;
