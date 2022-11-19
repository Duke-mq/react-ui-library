import React, { FC, CSSProperties, ReactElement, useEffect } from "react";
import { useFormDispatch, useFormState } from "./context";
import type { RuleItem } from "async-validator";
import { isNil } from "lodash-es";

export interface FormitemProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactElement;
  name: string;
  rules?: RuleItem[];
}

const FormItem: FC<FormitemProps> = (props) => {
  const { className, style, children, name, rules } = props;
  const formState = useFormState();
  const formDispatch = useFormDispatch();
  useEffect(() => {
    !isNil(rules) && formDispatch.setFormItemRule(name, rules);
  }, [formDispatch, name, rules]);
  if (React.Children.count(children) > 1 || !React.isValidElement(children)) {
    throw Error("Error: children count must be less than one");
  }

  const ChildrenNode = React.cloneElement(children as ReactElement, {
    value: formState?.value?.[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e?.target?.value;
      formDispatch.setFormItemState(name, value);
    },
  });

  return (
    <div className={className} style={style}>
      {ChildrenNode}
    </div>
  );
};

export default FormItem;
