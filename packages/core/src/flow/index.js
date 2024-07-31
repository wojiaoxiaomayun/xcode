import LogicFlow from '@logicflow/core'
import "@logicflow/core/dist/index.css";
import { Control } from '@logicflow/extension';
import "@logicflow/extension/lib/style/index.css";
export function renderFlow(options){
  LogicFlow.use(Control);
  let lf = new LogicFlow({...options});
  lf.render(data);
  return lf;
}