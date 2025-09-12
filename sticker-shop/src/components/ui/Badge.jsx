import { twMerge } from "tailwind-merge";

const Badge = ({children, className}) => {
    const defaultClassnames = "bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-lg dark:bg-gray-700 dark:text-blue-400 border border-blue-400"

    return <span className={twMerge(defaultClassnames, className)}>{children}</span>
}

export default Badge;