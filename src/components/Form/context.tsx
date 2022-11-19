import { RuleItem } from "async-validator";
import { isNil } from "lodash-es";
import { createContext, useContext } from "react";

interface FormStateCtxType {
  value: Record<string, unknown>;
  rules: Record<string, RuleItem[]>;
}

interface FormDispatchCtxType {
  setFormItemState: (name: string, value: unknown) => void;
  setFormItemRule: (name: string, value: RuleItem[]) => void;
}

const FormStateCtx = createContext<FormStateCtxType | null>(null);

const FormDispatchCtx = createContext<FormDispatchCtxType | null>(null);

const useFormState = () => {
  const ctx = useContext(FormStateCtx);
  if (isNil(ctx)) {
    throw Error("Error: FormItem is included in Form");
  }
  return ctx;
};
const useFormDispatch = () => {
  const ctx = useContext(FormDispatchCtx);
  if (isNil(ctx)) {
    throw Error("Error: FormItem is included in Form");
  }
  return ctx;
};

export { FormStateCtx, FormDispatchCtx, useFormDispatch, useFormState };

export type { FormStateCtxType, FormDispatchCtxType };
