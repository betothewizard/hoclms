import { Link } from "react-router-dom";
import { styles } from "../styles.tsx";

export const Hero = () => {
  return (
    <div className={`${styles.flexStart} ${styles.paddingY}`}>
      <div className={`${styles.boxWidth}`}>
          <div className={`${styles.flexStart} flex-1 flex-col sm:px-16 px-6`}>
            <div className="flex flex-row">
              <h1
                className="sm:w-full w-[250px] font-bold text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#ffd54f] to-[#ef8e1e] text-transparent bg-clip-text lg:h-[100px] md:h-[80px] sm:h-[60px] h-[100px]">Học Luật Mê Say </h1>
            </div>

            <p className="sm:mt-0 mt-5 lg:text-3xl md:text-2xl sm:text-xl sm:max-w-full max-w-[350px]">
              Ôn tập môn học <b>Nhà nước và pháp luật đại cương</b> với hơn <b>100</b> câu hỏi ôn tập
            </p>
            <Link to="/practice" className="mt-8 bg-[#f7b136] px-10 py-2 text-lg rounded-xl text-gray-50 hover:bg-[#f7b136]/90">Ôn tập</Link>
        
          </div>
        </div>
      </div>
  )
}