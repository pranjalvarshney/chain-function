export function validateEquation(equation: string): boolean {
  // Allow only valid characters: x, +, -, *, /, ^, numbers, and whitespace
  const validEquationRegex = /^[\d+\-*/^x\s]*$/;

  return validEquationRegex.test(equation);
}
