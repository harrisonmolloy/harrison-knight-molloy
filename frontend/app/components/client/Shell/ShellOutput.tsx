type ShellOutputPropTypes = {
  history: React.ReactElement[];
};

export function ShellOutput({ history }: ShellOutputPropTypes) {
  return history.map((element, id) => <div key={id}>{element}</div>);
}
