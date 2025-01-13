import clsx from "clsx";

/* eslint-disable react/prop-types */
export function Alert({ message, type }) {
  return (
    <div
      className={clsx(
        "p-4 rounded",
        type === "success" && "bg-green-100 text-green-500",
        type === "error" && "bg-red-100 text-red-500",
        type === "warning" && "bg-yellow-100 text-yellow-500",
      )}
    >
      {message}
    </div>
  );
}
export default Alert;
