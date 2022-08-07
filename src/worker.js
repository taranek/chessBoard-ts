// This is a module worker, so we can use imports (in the browser too!)
import Solution from "./domain/Solution";

const calculateSolution = (event) => {
  const { size, start, end, knight } = event;
  console.log("Hello from worker!", event);
  return Solution(size, start, end, knight);
};
//eslint-disable-next-line
addEventListener("message", (event) => {
  postMessage(calculateSolution(event.data));
});
