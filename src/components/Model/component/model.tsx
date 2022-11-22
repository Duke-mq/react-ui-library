import React, { ReactNode, FC, useState, useEffect } from "react";
import ReactDOM from "react-dom";
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
  children?: React.ReactNode;
  closeCb?: () => void;
  visible?: boolean;
  width?: number;
}

interface managerProps {
  mounted?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>> | null;
  // hidden: () => void;
  destory: () => void;
}

const Model: FC<ModelProps> = React.memo((props) => {
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
});
// const modelSysbol = Symbol("$$__model__Container_hidden");
let ModalContainer: HTMLDivElement | null = null;
/**通过静态属性创建/隐藏弹窗 */
const show = (config: ModelProps) => {
  if (ModalContainer) {
    return;
  }
  const props = { ...config, visible: true };
  const container = (ModalContainer = document.createElement("div"));
  const manager: managerProps = {
    setShow: null,
    mounted: false,
    hidden() {
      const { setShow } = manager;
      setShow && setShow(false);
    },

    destory() {
      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
      ModalContainer = null;
    },
  };

  const ModelApp = (props: ModelProps) => {
    const [show, setShow] = useState(false);
    manager.setShow = setShow;
    const { visible, ...trueProps } = props;
    useEffect(() => {
      /* 加载完成，设置状态 */
      manager.mounted = true;
      setShow(true);
    }, []);
    return (
      <Model
        {...trueProps}
        closeCb={() => manager.mounted && manager.destory()}
        visible={show}
      />
    );
  };
  /* 插入到body中 */
  document.body.appendChild(container);
  /* 渲染React元素 */
  ReactDOM.render(<ModelApp {...props} />, container);
  return manager;
};
const hidden = () => {};

export { Model, show, hidden };
