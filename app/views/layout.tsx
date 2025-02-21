import { Outlet, useNavigation } from "react-router";
import { Navbar } from "../components/navbar";
import { styles } from "../styles";
import { BProgress } from "@bprogress/core";
import "../styles/bprogress.css";

export default function AppLayout() {
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
      <div className="backlink-wrapper">
        <script src="https://cdn.indieboosting.com/latest/script.js?id=OLWTNFE0I3"></script>
      </div>
    </div>
  );
}
