export type SearchBarProps = {
  onSubmit: (value: string) => void;
  onBack: () => void;
  onForward: () => void;
};

export type UseSessionStorageProps<T> = {
  key: string;
  initialValue: T;
};

export type NoticeProps = {
  title: string;
  contents: {
    content: string;
  }[];
};

export type CustomTransitionProps = {
  fn: () => void;
  ms: number;
  node: HTMLElement | null;
};
