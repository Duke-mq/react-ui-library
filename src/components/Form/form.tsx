import Schema from "async-validator";
import React, { FC, CSSProperties, ReactNode, useState, useMemo } from "react";
import {
  FormStateCtx,
  FormDispatchCtx,
  FormStateCtxType,
  FormDispatchCtxType,
} from "./context";

export interface FormProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  onFinish?: (value: Record<string, unknown>) => void;
}

const Form: FC<FormProps> = (props) => {
  const { className, style, children, onFinish } = props;
  const [formState, setFormState] = useState<FormStateCtxType>({
    value: {},
    rules: {},
  });
  const dispatchFormState = useMemo<FormDispatchCtxType>(() => {
    return {
      setFormItemState(name, value) {
        setFormState((prevState) => {
          return {
            ...prevState,
            value: {
              ...prevState.value,
              [name]: value,
            },
          };
        });
      },
      setFormItemRule(name, value) {
        setFormState((prevState) => {
          return {
            ...prevState,
            rules: {
              ...prevState.rules,
              [name]: value,
            },
          };
        });
      },
    };
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = formState.value;
    const validator = new Schema(formState.rules);
    validator.validate(value, (errors, fields) => {
      if (errors) {
        console.error(errors);
        return;
      }
      onFinish && onFinish(value);
    });
  };

  return (
    <FormDispatchCtx.Provider value={dispatchFormState}>
      <FormStateCtx.Provider value={formState}>
        <form className={className} style={style} onSubmit={handleSubmit}>
          {children}
        </form>
      </FormStateCtx.Provider>
    </FormDispatchCtx.Provider>
  );
};

export default Form;
