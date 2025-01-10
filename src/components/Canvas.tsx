import React, { useEffect, useRef } from "react";

const CurvedLineCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Define the start and end points
    const startPoint = { x: 50, y: 150 };
    const endPoint = { x: 250, y: 50 };

    // Define the control point (determines the curve's shape)
    const controlPoint = { x: 200, y: 200 };

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the curved line
    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y); // Start point
    context.quadraticCurveTo(
      controlPoint.x,
      controlPoint.y,
      endPoint.x,
      endPoint.y
    ); // Quadratic curve
    context.strokeStyle = "blue"; // Set line color
    context.lineWidth = 8; // Set line width
    context.stroke();
    context.closePath();

    // Optionally: Draw points for better understanding
    context.fillStyle = "red";
    context.beginPath();
    context.arc(startPoint.x, startPoint.y, 5, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(endPoint.x, endPoint.y, 5, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(controlPoint.x, controlPoint.y, 5, 0, Math.PI * 2);
    context.fill();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      style={{ border: "1px solid black" }}
    />
  );
};

export default CurvedLineCanvas;
