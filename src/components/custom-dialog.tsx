import {
  Description,
  Dialog,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import { CircleAlert } from "lucide-react";

interface DialogProps {
  showWarning: boolean;
  setShowWarning: React.Dispatch<React.SetStateAction<boolean>>;
  currentQuestionsLength: number;
}
export const CustomDialog = (props: DialogProps) => {
  return (
    <>
      <Transition
        show={props.showWarning}
        enter="duration-1000 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-400 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          open={props.showWarning}
          onClose={() => props.setShowWarning(false)}
          className="relative"
        >
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="flex max-w-md flex-col items-center space-y-4 rounded-xl border-2 border-black bg-white p-10">
              <CircleAlert size={50}></CircleAlert>
              <Description className="text-center text-lg">
                Bạn cần làm đủ {props.currentQuestionsLength} câu trên trang này
                để kiểm tra kết quả
              </Description>
              <button
                className="text-md mt-5 rounded-xl border border-[#ef8e1e]/50 bg-[#f7b136] px-6 py-2 text-gray-50 hover:bg-[#f7b136]/90"
                onClick={() => props.setShowWarning(false)}
              >
                Tiếp tục làm
              </button>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
