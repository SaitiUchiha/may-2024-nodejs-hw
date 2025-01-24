export type ImageConfigType = {
  size: number;
  type: string[];
};

export const AvatarConfig: ImageConfigType = {
  size: 1024 * 1024 * 2,
  type: ["image/png", "image/jpg"],
};
