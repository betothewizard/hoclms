import { useState } from "react";
import { Menu, XIcon } from "lucide-react";
import { Button } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { LINKS } from "../utils/config";
import logo from "/logo.png";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="flex w-full items-center justify-between py-10">
      <NavLink to="/">
        <img src={logo} alt="hoclms" className="w-[90px] pt-2" />
      </NavLink>
      <ul className="hidden flex-1 list-none items-center justify-end gap-5 font-bold sm:flex">
        <li>
          <NavLink
            style={({ isActive, isTransitioning }) => {
              return {
                color: isActive ? "#f7b136" : "",
                viewTransitionName: isTransitioning ? "slide" : "",
              };
            }}
            to="/"
          >
            Trang chủ
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive, isTransitioning }) => {
              return {
                color: isActive ? "#f7b136" : "",
                viewTransitionName: isTransitioning ? "slide" : "",
              };
            }}
            to="/practice"
          >
            Ôn tập
          </NavLink>
        </li>
        <li>
          <a href={LINKS.feedbackForm} target="_blank">
            Đóng góp
          </a>
        </li>
      </ul>

      <div className="flex items-center justify-end sm:hidden">
        <Button onClick={() => setToggle((t) => !t)}>
          {toggle ? <XIcon /> : <Menu />}
        </Button>
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } absolute right-0 top-24 mx-4 my-2 min-w-[150px] rounded-xl border-2 bg-gradient-to-br from-zinc-200 to-zinc-100 p-6`}
        >
          <ul className="flex flex-1 list-none flex-col items-center justify-end gap-5 font-bold">
            <li>
              <NavLink
                style={({ isActive, isTransitioning }) => {
                  return {
                    color: isActive ? "#f7b136" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
                to="/"
              >
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive, isTransitioning }) => {
                  return {
                    color: isActive ? "#f7b136" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
                to="/practice"
              >
                Ôn tập
              </NavLink>
            </li>
            <li>
              <a href={LINKS.feedbackForm} target="_blank">
                Đóng góp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
