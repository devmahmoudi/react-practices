import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Button from "./Button";

const ConfirmAlert = ({
  onConfirm,
  title = "حذف",
  message = "آیا مطمئن هستید ?",
}) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="custom-ui font-primary bg-white shadow-md shadow-gray-400 min-w-[400px] p-5 rounded-lg">
          <h1 className="text-lg text-palette-primary">{title}</h1>
          <p className="my-4">{message}</p>
          <div className="w-full flex justify-end align-bottom">
            <Button
             className="py-1 bg-red-500 hover:bg-red-600"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              بله
            </Button>
            <Button className="py-1 bg-yellow-500 hover:bg-yellow-600" onClick={onClose}>خیر</Button>
          </div>
        </div>
      );
    },
  });
};

export const confirm = ConfirmAlert;
