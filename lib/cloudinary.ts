// Cloudinary URL 빌더 헬퍼
// 사용 예: getCloudinaryUrl("wedding/hero_main", { width: 1080 })

interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "crop" | "scale";
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryOptions = {}
): string {
  const { width, height, crop = "fill" } = options;

  const transformations = ["f_auto", "q_auto"];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push(`c_${crop}`);

  const cloudName = CLOUD_NAME || "demo";

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations.join(
    ","
  )}/${publicId}`;
}

// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME이 아직 설정되지 않았는지 여부
// (개발 중 안내 문구 표시 등에 활용)
export const isCloudinaryConfigured = Boolean(CLOUD_NAME);
