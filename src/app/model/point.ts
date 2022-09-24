export type Point = Readonly<{
  id: string;
  title: string;
  type: string;
  location: { x: number; y: number };
}>;
