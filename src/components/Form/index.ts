import Form from "./form";
import FormItem from "./formItem";
type FormComponentType = typeof Form & {
  Item: typeof FormItem;
};

const FormComponent = Form as FormComponentType;
FormComponent.Item = FormItem;
export default FormComponent;
