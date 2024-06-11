import {
  Description,
  Dialog,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import { CircleAlert } from "lucide-react";

interface DialogProps {
  showWarning: boolean,
  setShowWarning: React.Dispatch<React.SetStateAction<boolean>>
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
            <DialogPanel className="max-w-lg space-y-4 border-2 border-yellow-200/70 rounded-xl bg-white p-12 flex flex-col items-center">
              <CircleAlert size={50}></CircleAlert>
              <Description className="text-lg">
                Bạn cần làm tất cả các câu để nộp bài
              </Description>
              <button
                className="mt-5 bg-[#f7b136] px-6 py-2 text-md rounded-xl text-gray-50 hover:bg-[#f7b136]/90"
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
