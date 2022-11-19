import React, {
  FC,
  ReactNode,
  createContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

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

  const handleClick = useCallback(
    (index: number) => {
      setActive(index);
      onSelect && onSelect(index);
    },
    [onSelect]
  );

  const passedContext: MenuContextType = useMemo(
    () => ({
      index: currentActive ? currentActive : 0,
      onSelect: handleClick,
    }),
    [currentActive, handleClick]
  );

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement?.type;
      // ??? Menu里面只能传MenuItem 组件或者SubMenu组件 这样做好像没有太大的必要
      if (displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index,
        });
      } else {
        console.error(
          "Waring: Menu has a child which is not a MenuItem Component "
        );
      }
    });
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
};

export default Menu;
