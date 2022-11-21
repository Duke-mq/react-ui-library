import React, { useMemo, useEffect, useState, FC } from "react";
import ReactDOM from "react-dom";
/** 对话框组件 */
/* 控制弹窗隐藏以及动画效果 */
export interface DialogProps {
  width?: number;
  visible?: boolean;
  closeCb?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
}

const controlShow = (
  f1: React.Dispatch<React.SetStateAction<boolean>>,
  f2: React.Dispatch<React.SetStateAction<boolean>>,
  value: boolean,
  timer: number
) => {
  f1(value);
  return window.setTimeout(() => {
    f2(value);
  }, timer);
};
export const Dialog: FC<DialogProps> = (props) => {
  const { width, visible, closeCb, onClose } = props;
  /* 控制 modelShow 动画效果 */
  const [modelShow, setModelShow] = useState(visible || false);
  const [modelShowAync, setModelShowAync] = useState(visible || false);
  const renderChildren = useMemo(() => {
    /* 把元素渲染到组件之外的 document.body 上  */
    return ReactDOM.createPortal(
      <div style={{ display: modelShow ? "block" : "none" }}>
        <div
          className="model_container"
          style={{ opacity: modelShowAync ? 1 : 0 }}
        >
          <div className="model_wrap">
            <div style={{ width: width + "px" }}> {props.children} </div>
          </div>
        </div>
        <div
          className="model_container mast"
          onClick={() => onClose && onClose()}
          style={{ opacity: modelShowAync ? 0.6 : 0 }}
        />
      </div>,
      document.body
    );
  }, [modelShowAync, modelShow]);
  useEffect(() => {
    let timer: number;
    if (visible) {
      timer = controlShow(setModelShow, setModelShowAync, visible, 30);
    } else {
      timer = controlShow(
        setModelShowAync,
        setModelShow,
        visible || false,
        1000
      );
    }
    return function () {
      timer && clearTimeout(timer);
    };
  }, [visible]);
  useEffect(() => {
    !modelShow && typeof closeCb === "function" && closeCb();
  }, [modelShow]);
  return renderChildren;
};

export default Dialog;
