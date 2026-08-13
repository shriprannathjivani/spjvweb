import Image, { ImageProps } from "next/image";

const basePath =
  process.env.NODE_ENV === "production" ? "/spjvweb" : "";

export default function BaseImage(props: ImageProps) {
  const src =
    typeof props.src === "string"
      ? `${basePath}${props.src}`
      : props.src;

  return <Image {...props} src={src} />;
}