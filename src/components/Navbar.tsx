import { useState } from "react";
import { Menu, XIcon } from "lucide-react";
import { Button } from "@headlessui/react";
import { NavLink } from "react-router-dom";

const navLinks = [
  {id: "home", name: "Trang chủ", path: "/"},
  {id: "practice", name: "Ôn tập", path: "/practice"},
  {id: "contribute", name: "Đóng góp tài liệu", path: "/contribute"}
]
export const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-10 justify-between items-center">
      <NavLink to="/">
        <img src="logo.png" alt="hoclms" className="w-[80px] "/>
      </NavLink>
      <ul className="hidden sm:flex list-none justify-end items-center flex-1">
        {navLinks.map((link, index) => (
          <li key={link.id} className={`${index === navLinks.length - 1 ? "mr-0" : "mr-5"}`}>
            <NavLink to={link.path}>{link.name}</NavLink>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex justify-end items-center">
        <Button onClick={() => setToggle(t => !t)}>{toggle ? <XIcon/> : <Menu/>}</Button>
        <div
          className={`${toggle ? "flex" : "hidden"} absolute p-6 top-20 right-0 mx-4 my-2 min-w-[150px] bg-gradient-to-r from-black via-gray to-white rounded-xl`}>
          <ul className="flex flex-col list-none justify-end items-center flex-1">
            {navLinks.map((link, index) => (
              <li key={link.id} className={`${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}>
                <NavLink to={link.path}>{link.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}