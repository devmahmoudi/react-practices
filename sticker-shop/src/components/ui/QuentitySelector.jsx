export const QuentitySelector = ({value, onIncrement, onDecrement}) => {
    return (
        <div className="inline-flex items-center border border-gray-300 rounded-md overflow-hidden">
        <button
          onClick={onDecrement}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          -
        </button>
        <span className="px-4 py-1 text-center w-12">{value}</span>
        <button
          onClick={onIncrement}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          +
        </button>
      </div>
    )
}