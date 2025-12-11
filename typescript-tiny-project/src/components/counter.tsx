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
        <button className="" onClick={() => props.setCount((prev) => prev + 1)}>
          Increment
        </button>
        <button className="" onClick={() => props.setCount((prev) => prev - 1)}>
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
