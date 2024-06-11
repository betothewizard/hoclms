import { styles } from "../styles.tsx";
import { NavLink } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className={`${styles.paddingX} flex min-h-72`}>
      <div className={`${styles.boxWidth} flex flex-col gap-5 flex-grow justify-center items-center`}>
        <h1 className="text-4xl font-bold">404 - Không tìm thấy trang</h1>
        <NavLink to="/" className="underline text-yellow-500 font-bold">Trở lại trang chủ</NavLink>
      </div>
    </div>
  )
}