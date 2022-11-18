import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./button";

test("out first react test case", () => {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const wrapper = render(<Button>Nice</Button>);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const element = wrapper.queryByText("Nice");
  expect(element).toBeTruthy();
  // 判断组件是否在文档中
  expect(element).toBeInTheDocument();
});
//  提供 mock functions，捕获函数是否被调用,通过jest.fn()
//  提供fireEvent,对前端交互事件进行模拟
const defaultProps = {
  onClick: jest.fn(),
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: "class",
};

describe("test Button component", () => {
  it("should render the correct default button", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const element = wrapper.getByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn btn-default");
    //用fireEvent去触发点击,再验证回调事件是否被调用
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("should render the correct component based on different props", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Button {...testProps}>Nice</Button>);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const element = wrapper.getByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn-primary btn-lg class");
  });

  it("should render a link when btnType equals link and href is provided", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(
      <Button btnType="link" href="www.baidu.cn">
        Link
      </Button>
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const element = wrapper.getByText("Link");
    //注意elementl里面的tagName都是大写
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
  });

  it("should render disabled button when disabled set to true", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const wrapper = render(<Button {...disabledProps}>Nice</Button>);
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const element = wrapper.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
