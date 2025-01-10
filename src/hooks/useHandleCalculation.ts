import { useRef, useState } from "react";
import { validateEquation } from "../utils/helper";

export interface Function_I {
  id: number;
  equation: string;
  next: number | null;
}

const functions: Function_I[] = [
  { id: 1, equation: "x^2", next: 2 },
  { id: 2, equation: "2x+4", next: 4 },
  { id: 3, equation: "x^2+20", next: null },
  { id: 4, equation: "x-2", next: 5 },
  { id: 5, equation: "x/2", next: 3 },
];

function useHandleCalculation() {
  const [input, setInput] = useState<{
    value: number | null;
    next: number | null;
  }>({ value: null, next: 1 });

  const inputRef = useRef<HTMLInputElement>(null);

  const [output, setOutput] = useState<number | null>(null);

  const [list, setList] = useState<Function_I[]>(functions);

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    setInput((prevInput) => ({
      ...prevInput,
      value: inputValue,
    }));
    handleCalculate(list, { value: inputValue, next: input.next });
  };

  const calculateEquation = (equation: string, x: number): number => {
    let result = 0;
    try {
      // Replace "^" with "**" for exponentiation
      equation = equation.replace("^", "**");

      // Replace "x" with "*x" if it is not at the start
      equation = equation
        .replace(/(\d)x/g, "$1*x")
        .replace(/x(\d)/g, "x*$1")
        .replace(/x/g, `(${x})`);

      // console.log(equation);
      result = eval(equation);
    } catch (error) {
      console.error(error);
    }
    return result;
  };

  const handleCalculate = (
    list: Function_I[],
    initialInput: {
      value: number | null;
      next: number | null;
    }
  ) => {
    let currentInput = initialInput.value;
    let currentFunctionId = initialInput.next;

    // Iterate over functions based on the 'next' property
    while (currentInput && currentFunctionId !== null) {
      const currentFunction = list.find((f) => f.id === currentFunctionId);
      if (currentFunction && currentInput !== null) {
        currentInput = calculateEquation(
          currentFunction.equation,
          currentInput
        );

        currentFunctionId = currentFunction.next;
      }
    }

    setOutput(currentInput); // Set the final output
  };

  const handleInputFunctionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setList((prevList) => {
      const updatedList = prevList.map((item) =>
        item.id === Number(name) && validateEquation(value)
          ? {
              ...item,
              equation: value,
            }
          : item
      );
      handleCalculate(updatedList, { value: input.value, next: input.next });
      return updatedList;
    });
  };

  return {
    input,
    output,
    list,
    inputRef,
    handleInputValueChange,
    handleInputFunctionChange,
  };
}

export default useHandleCalculation;
