import React, { AnchorHTMLAttributes, FC, HtmlHTMLAttributes } from "react";
import classNames from "classnames";

export type ButtonSize = "lg" | "sm";
export type ButtonType = "primary" | "default" | "danger" | "link";
interface BaseButtonProps {
  className?: string;
  /**设置 Button 的禁用 */
  disabled?: boolean;
  /**设置 Button 的尺寸 */
  size?: ButtonSize;
  /**设置 Button 的类型 */
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}
//使用交叉类型，把原生按钮的props和自定义props结合，原生a标签的props与自定义props结合

type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
//我们要把原生元素的props变成全部可选的，这样有些必选就不会报错,用到typescript的高级用法Partial
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
const Button: FC<ButtonProps> = (props) => {
  const { className, disabled, size, btnType, children, href, ...restProps } =
    props;
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });

  if (btnType === "link" && href) {
    return (
      <a className={classes} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
