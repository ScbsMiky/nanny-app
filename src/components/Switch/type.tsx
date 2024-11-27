export type DoubleCheckProps = {
  firstLabel: string;
  secondLabel: string;
  
  value?: number;
  children?: JSX.Element | JSX.Element[ ];

  onChange?(index: number): void;
};