import React, { ReactNode, FC } from "react";
import Button from "../../Button";
import { Dialog } from "./dialog";

interface ModelProps {
  title: string;
  footer?: ReactNode;
  content?: ReactNode;
  onOk: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onCancel: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onClose: () => void;
  cancelText?: string;
  okTest?: string;
  children: React.ReactNode;
  closeCb?: () => void;
  visible: boolean;
  width?: number;
}
const Model: FC<ModelProps> = (props) => {
  const {
    footer,
    onOk,
    onCancel,
    cancelText,
    okTest,
    title,
    onClose,
    children,
    content,
    closeCb,
    visible,
    width,
  } = props;
  //渲染底部按钮
  const renderFooter = () => {
    // 没有传入footer且footer是有效节点
    if (footer && !React.isValidElement(footer)) return footer;
    return (
      <div className="model_footer">
        <div className="model_footer_box">
          <Button
            className="confirm_btn"
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              onOk && onOk(e);
            }}
          >
            {okTest || "确定"}
          </Button>
          <Button
            className="concel_btn"
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              onCancel && onCancel(e);
            }}
          >
            {cancelText || "取消"}
          </Button>
        </div>
      </div>
    );
  };

  //渲染顶部
  const renderTop = () => {
    return (
      <div className="model_top">
        <p>{title}</p>
        <span className="model_top_close" onClick={() => onClose && onClose()}>
          x
        </span>
      </div>
    );
  };
  //渲染内容,根据
  const rednerContent = () => {
    return React.isValidElement(content) ? content : children ? children : null;
  };
  const renderModel = () => {
    return (
      <Dialog
        closeCb={closeCb}
        width={width}
        visible={visible}
        onClose={onClose}
      >
        {renderTop()}
        {rednerContent()}
        {renderFooter()}
      </Dialog>
    );
  };
  return renderModel();
};

export default React.memo(Model);
