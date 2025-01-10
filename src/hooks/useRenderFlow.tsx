import { useCallback, useEffect, useRef } from "react";
import { Function_I } from "./useHandleCalculation";

interface Props {
  list: Function_I[];
}

function useRenderFlow({ list }: Props) {
  const refs = useRef<{
    functionInput: HTMLElement[];
    functionOutput: HTMLElement[];
    inputField: HTMLElement | null;
    outputField: HTMLElement | null;
  }>({
    functionInput: [],
    functionOutput: [],
    inputField: null,
    outputField: null,
  });

  const renderLines = ({
    startX,
    startY,
    endX,
    endY,
  }: {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  }) => {
    const canvas = document.getElementById("line-canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Euclidean distance formula to calculate the length of the line
    const totalLength = Math.sqrt(
      Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    );

    ctx.beginPath();

    // Move to the starting position
    ctx.moveTo(startX, startY);

    // If the length of the line is less than 100px, draw a straight line
    if (totalLength < 100) {
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = `#0066FF4F`;
      ctx.lineWidth = 7;
      ctx.stroke();
      ctx.closePath();
      return;
    }

    const amplitude = 40; // Height of the wave
    const frequency = totalLength > 400 ? 1 : 1 / 2; // Frequency of the wave
    const steps = 100; // Number of steps for smoothness

    // Calculate the angle of the line
    const angle = Math.atan2(endY - startY, endX - startX);

    for (let i = 0; i <= steps; i++) {
      const t = i / steps; // Normalize t between 0 and 1

      // Calculate the position along the line
      const x = startX + t * (endX - startX);
      const y = startY + t * (endY - startY);

      // Add the sinusoidal wave perpendicular to the line
      const waveOffset = amplitude * Math.sin(frequency * t * 2 * Math.PI); // Sine wave offset
      const offsetX = waveOffset * Math.cos(angle + Math.PI / 2); // Perpendicular x offset
      const offsetY = waveOffset * Math.sin(angle + Math.PI / 2); // Perpendicular y offset

      ctx.lineTo(x + offsetX, y + offsetY);
    }

    ctx.strokeStyle = `#0066FF4F`;
    ctx.lineWidth = 7;

    ctx.stroke();
    ctx.closePath();
  };

  const renderLinesMethod = useCallback(() => {
    const canvas = document.getElementById("line-canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear existing lines before rendering
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Connect the input field to the first function's input
    if (refs.current.inputField && refs.current.functionInput[0]) {
      const inputRect = refs.current.inputField.getBoundingClientRect();
      const firstFunctionRect =
        refs.current.functionInput[0].getBoundingClientRect();

      renderLines({
        startX: inputRect.x + inputRect.width / 2,
        startY: inputRect.y + inputRect.height / 2,
        endX: firstFunctionRect.x + firstFunctionRect.width / 2,
        endY: firstFunctionRect.y + firstFunctionRect.height / 2,
      });
    }

    // Loop through each function in the chain
    list.forEach((func, index) => {
      const currentOutput = refs.current.functionOutput[index];
      const nextInput =
        func.next !== null
          ? refs.current.functionInput[func.next - 1]
          : refs.current.outputField;

      if (currentOutput && nextInput) {
        const outputRect = currentOutput.getBoundingClientRect();
        const inputRect = nextInput.getBoundingClientRect();

        renderLines({
          startX: outputRect.x + outputRect.width / 2,
          startY: outputRect.y + outputRect.height / 2,
          endX: inputRect.x + inputRect.width / 2,
          endY: inputRect.y + inputRect.height / 2,
        });
      }
    });
  }, [list]);

  // render the lines on initial render
  useEffect(() => {
    const canvas = document.getElementById("line-canvas") as HTMLCanvasElement;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderLinesMethod();
  }, []);

  // to handle  re-render the lines on window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = document.getElementById(
        "line-canvas"
      ) as HTMLCanvasElement;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      renderLinesMethod();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { refs, renderLinesMethod };
}

export default useRenderFlow;
