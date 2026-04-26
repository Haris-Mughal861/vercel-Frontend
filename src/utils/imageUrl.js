import { IMAGE_BASE_URL } from "./constants";

const isAbsoluteUrl = (value) =>
  typeof value === "string" && /^(https?:)?\/\//i.test(value);

export const resolveImageUrl = (imagePath) => {
  if (!imagePath) return "";
  return isAbsoluteUrl(imagePath) ? imagePath : `${IMAGE_BASE_URL}${imagePath}`;
};

