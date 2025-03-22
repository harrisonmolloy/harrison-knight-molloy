export type PaneType = {
  type: string;
  title: string;
  isOpen: boolean;
  isActive: boolean;
  commandQueue: string[];
  history: React.ReactNode[];
};
