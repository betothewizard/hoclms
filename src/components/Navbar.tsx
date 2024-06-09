import { useState } from "react";
import { Menu, XIcon } from "lucide-react";
import { Button } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { LINKS } from "../utils/config";

export const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-10 justify-between items-center">
      <NavLink to="/">
        <img src="logo.png" alt="hoclms" className="pt-2 w-[90px] " />
      </NavLink>
      <ul className="font-bold hidden sm:flex list-none justify-end items-center flex-1 gap-5">
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

      <div className="sm:hidden flex justify-end items-center">
        <Button onClick={() => setToggle((t) => !t)}>
          {toggle ? <XIcon /> : <Menu />}
        </Button>
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } absolute p-6 top-24 right-0 mx-4 my-2 min-w-[150px] border-2 bg-gradient-to-br from-zinc-200 to-zinc-100 rounded-xl`}
        >
          <ul className="font-bold flex flex-col list-none justify-end items-center flex-1 gap-5">
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
