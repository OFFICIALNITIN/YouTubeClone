import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import shorts from "./shorts.png";
import "./leftSidebar.css";
import { NavLink } from "react-router-dom";

function LeftSidebar() {
  return (
    <div className="container_leftSidebar">
      <NavLink to={"/"} className="icon_sidebar_div">
        <AiOutlineHome size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon">Home</div>
      </NavLink>
      <NavLink to={"/"} className="icon_sidebar_div">
        <MdOutlineExplore size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon">Explore</div>
      </NavLink>
      <NavLink to={""} className="icon_sidebar_div">
        <img src={shorts} width={22} alt="shorts" className="icon_sidebar" />
        <div className="text_sidebar_icon">Explore</div>
      </NavLink>
      <NavLink to={""} className="icon_sidebar_div">
        <MdOutlineSubscriptions size={22} className="icon_sidebar" />
        <div style={{ fontSize: "11px" }} className="text_sidebar_icon">
          Subscriptions
        </div>
      </NavLink>
      <NavLink to={"/library"} className="icon_sidebar_div">
        <MdOutlineVideoLibrary size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon">Library</div>
      </NavLink>
    </div>
  );
}

export default LeftSidebar;
