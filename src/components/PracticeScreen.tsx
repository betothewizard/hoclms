import { Button } from "@headlessui/react";
interface PracticeScreenProps {
  isShowQuestions: (showQuestions: boolean) => void;

}

export const PracticeScreen = (props: PracticeScreenProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-700">Học LuậtMêSay</h1>
      <p className="text-2xl mb-20">Phá đảo môn học <b>Nhà nước và pháp luật đại cương</b> với hơn <b>100</b> câu hỏi ôn tập</p>
      <Button className="bg-orange-500 px-5 py-2 text-3xl rounded-2xl text-white font-bold data-[hover]:bg-orange-500/90" onClick={()=>{props.isShowQuestions(true)}}>Làm bài tập</Button>
    </div>
  )
}