import React, { FC, ReactNode, createContext, useState } from "react";
import classNames from "classnames";

// 多种情况类型的一般用联合类型
type MenuMode = "horizontal" | "vertical";
type selecteCallback = (index: number) => void;
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: selecteCallback;
  children: ReactNode;
}

interface MenuContextType {
  index: number;
  onSelect?: selecteCallback;
}
export const MenuContext = createContext<MenuContextType>({ index: 0 });

const Menu: FC<MenuProps> = (props) => {
  const { className, defaultIndex, mode, onSelect, style, children } = props;
  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames("menu", className, {
    "menu-horizontal": mode === "horizontal",
    "menu-vertical": mode === "vertical",
  });

  const handleClick = (index: number) => {
    setActive(index);
    onSelect && onSelect(index);
  };
  const passedContext: MenuContextType = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
};

export default Menu;
