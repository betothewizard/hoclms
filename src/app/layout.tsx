import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { styles } from "../styles";

const AppLayout = () => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-zinc-100">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export { AppLayout };
