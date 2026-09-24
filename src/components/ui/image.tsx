import NextImage, { type ImageProps } from "next/image";

/**
 * Site-wide Image wrapper: every image is optimized at a higher quality
 * (q=90 instead of Next's default q=75) so photos stay crisp after deploy.
 * An explicit `quality` prop still wins.
 */
export default function Image(props: ImageProps) {
  return <NextImage quality={90} {...props} />;
}
