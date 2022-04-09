import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SidebarStyle.scss";

const menuItemList = [
  {
    title: "Dash Board",
    path: "/",
    icon: "fa-solid fa-gauge icon",
    iconRight: "fa-regular fa-angle-down iconRight",
    submenu: [],
  },
  {
    title: "Seller",
    path: "/seller",
    icon: "fa-regular fa-file-user icon",
    iconRight: "fa-regular fa-angle-down iconRight",
    submenu: [
      { title: "Account List", path: "/seller/list" },
      { title: "Create Accounts", path: "/seller/create" },
    ],
  },
  {
    title: "Product",
    path: "/product",
    icon: "fa-regular fa-file-user icon",
    iconRight: "fa-regular fa-angle-down iconRight",
    submenu: [],
  },
  {
    title: "...",
    path: "/...",
    icon: "fa-regular fa-file-user icon",
    iconRight: "fa-regular fa-angle-down iconRight",
    submenu: [{ title: "...", path: "/...", icon: "" }],
  },
];

const Sidebar = () => {
  const [dropdownMenu, setDropdownMenu] = useState<string>("");
  const handleDropdownSubmenu = (itemDropdown: string) => {
    setDropdownMenu(itemDropdown === dropdownMenu ? "" : itemDropdown);
  };
  return (
    <div className="sidebar-admin h-100">
      <div className="sidebar-admin__header"></div>
      <div className="sidebar-admin__body">
        <ul className="menu">
          {menuItemList.map((item) => (
            <li key={item.title}>
              <NavLink to={item.path} className={`menu-item`}>
                <i className={`${item.icon} `}></i>
                <span>{item.title}</span>
                <i
                  className={`${item.iconRight}`}
                  onClick={() => handleDropdownSubmenu(item.title)}
                ></i>
              </NavLink>
              {dropdownMenu === item.title && item.submenu.length > 0 && (
                <ul className="submenu">
                  {item.submenu.map((item) => (
                    <li key={item.title}>
                      <NavLink to={item.path}>{item.title}</NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
