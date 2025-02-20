import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { styles } from "../styles";
import { BProgress } from "@bprogress/core";
import "../styles/bprogress.css";

BProgress.configure({});

const AppLayout = () => {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  if (isNavigating) BProgress.start();
  else BProgress.done();
  return (
    <div className="min-h-screen w-full overflow-hidden bg-zinc-100">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <Outlet />
      <ScrollRestoration />
    </div>
  );
};

export { AppLayout };
