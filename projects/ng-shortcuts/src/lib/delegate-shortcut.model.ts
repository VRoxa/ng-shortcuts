
export interface DelegateShortcut<TComponent> {
  keys: string[];
  handle: (component: TComponent) => void;
}