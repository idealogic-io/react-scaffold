export const scales = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
} as const;

export type Scales = typeof scales[keyof typeof scales];

export interface HeadingProps {
  as?: Scales;
  scale?: Scales;
}
