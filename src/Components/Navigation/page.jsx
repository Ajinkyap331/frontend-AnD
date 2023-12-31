import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

export const Navigator = () => {
  const navigate = useNavigate();
  const [currentURL, setCurrentURL] = React.useState(
    window.location.href.split("/")[3]
  );
  function getItem(label, key, children, type) {
    return {
      key,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("Menu", "sub1", [
      getItem("Add Companies", "companies"),
      getItem("Add SubComponant", "subComponant"),
      getItem("Add Component", "component"),
      getItem("Add Offer", "offer"),
      getItem("Add Project", "project"),
      getItem("Add Revision", "revision"),
    ]),
  ];

  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div className="w-[25vw]">
      <p className="text-2xl p-3 font-semibold">ERP</p>
      <Menu
        mode="inline"
        className="p-4"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={(e) => navigate(`/${e.key}`)}
        items={items}
      />
    </div>
  );
};
