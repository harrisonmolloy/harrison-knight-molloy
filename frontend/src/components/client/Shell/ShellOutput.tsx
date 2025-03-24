import { usePanes } from "hooks/usePanes";

type ShellOutputPropTypes = {
  paneId: number;
};

export function ShellOutput({ paneId }: ShellOutputPropTypes) {
  const { panes } = usePanes();
  const { history = [] } = panes[paneId];
  return history.map((element, id) => <div key={id}>{element}</div>);
}
