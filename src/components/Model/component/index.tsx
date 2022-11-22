import { Model, show, hidden } from "./model";
type showType = typeof show;
type hiddenType = typeof hidden;
type ModelComponentType = typeof Model & {
  show: showType;
  hidden: hiddenType;
};

const ModelComponent = Model as ModelComponentType;
ModelComponent.show = show;
ModelComponent.hidden = hidden;

export default ModelComponent;
