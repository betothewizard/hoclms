import { Link } from "react-router-dom";
import { styles } from "../../styles.tsx";
import { LINKS } from "../../utils/config.ts";

const LandingPage = () => {
  return (
    <div className={`${styles.flexStart} ${styles.paddingY}`}>
      <div className={`${styles.boxWidth}`}>
        <div className={`${styles.flexStart} flex-1 flex-col px-6 sm:px-16`}>
          <div className="flex flex-row">
            <h1 className="h-[100px] max-w-[280px] bg-gradient-to-r from-[#ffd54f] to-[#ef8e1e] bg-clip-text text-5xl font-bold text-transparent sm:h-[60px] sm:max-w-full md:h-[80px] md:text-6xl lg:h-[100px] lg:text-7xl">
              Học Luật Mê Say{" "}
            </h1>
          </div>

          <p className="mt-5 sm:mt-0 sm:max-w-full sm:text-xl md:text-2xl lg:text-3xl">
            Ôn tập môn học <b>Nhà nước và pháp luật đại cương</b> với hơn{" "}
            <b>100</b> câu hỏi ôn tập
          </p>
          <div className="mt-10 flex flex-col items-center space-y-5">
            <Link
              to="/practice"
              className="rounded-xl border border-[#ef8e1e]/50 bg-[#f7b136] px-10 py-2 text-lg text-gray-50 hover:bg-[#f7b136]/90"
            >
              Ôn tập
            </Link>
            <iframe
              src={LINKS.githubButton}
              frameBorder="0"
              scrolling="0"
              width="110"
              height="30"
              title="GitHub"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LandingPage };
