const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/**/*.{jpeg,png}",
);

export async function getImagePath(
  image: string | undefined,
): Promise<string | undefined> {
  if (!image || !images[image]) {
    return undefined;
  }
  return (await images[image]!()).default.src;
}
