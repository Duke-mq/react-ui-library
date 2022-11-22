import React, { useMemo, useState } from "react";
import Button from "../Button";
import Model from "./component/index";

const ModelComponent = () => {
  /**定义Modal是否显示 */
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible((v) => !v);
  };

  //如果子组件用了PureComponent或者React.meno的话,声明的函数必须缓存,不然会失去作用

  const [handleClose, handleOk, handleCancel] = useMemo(() => {
    const Ok = () => {
      setVisible(false);
      console.log("点击确定按钮");
    };
    const Close = () => {
      setVisible(false);
      console.log("关闭弹窗");
    };
    const Cancel = () => {
      setVisible(false);
      console.log("点击取消按钮");
    };
    return [Close, Ok, Cancel];
  }, []);
  return (
    <>
      <Model
        onCancel={handleCancel}
        onClose={handleClose}
        onOk={handleOk}
        title={"弹窗测试组件"}
        visible={visible}
        width={300}
      >
        <div className="feel">测试弹窗</div>
      </Model>

      <Button onClick={handleClick}>展开弹窗</Button>
    </>
  );
};

const ModelShowComponent = () => {
  const handleClick = () => {
    Model.show({
      content: <p>静态属性调用测试</p>,
      title: "《React进阶实践指南》",
      width: 300,
      onOk: () => console.log("点击确定"),
      onCancel: () => console.log("点击取消"),
      onClose: () => Model.hidden(),
    });
  };
  return (
    <div>
      <Button onClick={() => handleClick()}>静态方式调用,显示modal</Button>
    </div>
  );
};

export { ModelComponent, ModelShowComponent };
