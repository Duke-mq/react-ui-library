import React, {
  FC,
  useContext,
  FunctionComponentElement,
  useState,
} from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";

export interface SubMenuProps {
  index?: number;
  title: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const SubMenu: FC<SubMenuProps> = (props) => {
  const { index, title, className, style, children } = props;
  const context = useContext(MenuContext);
  const [menuOpen, setOpen] = useState(false);
  const subMenuClasses = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "menu-opened": index && menuOpen,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(menuOpen);
  };
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return childElement;
      } else {
        console.error("Waring:SubMenu has a child which is not a MenuItem");
      }
    });
    return <ul className="menu-submenu">{childrenComponent}</ul>;
  };

  return (
    <ul key={index} className={subMenuClasses} onClick={handleClick}>
      <div className="submenu-title">{title}</div>
      {renderChildren()}
    </ul>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
