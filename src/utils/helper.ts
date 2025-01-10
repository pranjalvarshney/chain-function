export function validateEquation(equation: string) {
  const validEquationRegex = /^[\d+\-*/^()x\s]*$/;

  return validEquationRegex.test(equation);
}
