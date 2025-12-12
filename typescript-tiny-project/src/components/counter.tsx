import type { CounterComponentProps } from "../types";

/**
 * Counter component
 * @param props CounterComponentProps
 */
const Counter = (props: CounterComponentProps) => {
  return (
    <div>
      <strong>{props.children}</strong>
      <div className="mt-3">
        <button className="" onClick={() => props.setCount((prev) => prev > 1 ? prev - 1 : prev)}>
          Decrement
        </button>
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => props.setCount(() => 1)} 
        >
          Reset
        </button>
        <button className="" onClick={() => props.setCount((prev) => prev + 1)}>
          Increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
