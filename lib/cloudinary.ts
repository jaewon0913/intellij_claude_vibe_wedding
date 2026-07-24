// Cloudinary URL 빌더 헬퍼
// 사용 예: getCloudinaryUrl("wedding/hero_main", { width: 1080 })

interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "crop" | "scale";
  // "auto"로 두면 Cloudinary가 얼굴/피사체를 인식해서 크롭 시 잘리지 않게 함.
  // width와 height를 둘 다 지정해 실제로 크롭이 일어날 때만 의미가 있음.
  gravity?: "auto" | "face" | "faces" | "center";
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function getCloudinaryUrl(
  publicId: string,
  options: CloudinaryOptions = {}
): string {
  const { width, height, crop = "fill", gravity } = options;

  const transformations = ["f_auto", "q_auto"];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push(`c_${crop}`);
  if (gravity && width && height && crop === "fill") {
    transformations.push(`g_${gravity}`);
  }

  const cloudName = CLOUD_NAME || "demo";

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations.join(
    ","
  )}/${publicId}`;
}

// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME이 아직 설정되지 않았는지 여부
// (개발 중 안내 문구 표시 등에 활용)
export const isCloudinaryConfigured = Boolean(CLOUD_NAME);

interface CloudinaryVideoOptions {
  width?: number;
  crop?: "fill" | "fit" | "crop" | "scale";
  format?: "mp4" | "webm";
}

// 비디오는 이미지와 delivery 경로(/video/upload/)가 다르고,
// URL 끝에 반드시 확장자가 붙어야 함 (예: ....mp4)
export function getCloudinaryVideoUrl(
  publicId: string,
  options: CloudinaryVideoOptions = {}
): string {
  const { width, crop = "fill", format = "mp4" } = options;

  const transformations = ["q_auto"];
  if (width) {
    transformations.push(`w_${width}`, `c_${crop}`);
  }

  const cloudName = CLOUD_NAME || "demo";

  return `https://res.cloudinary.com/${cloudName}/video/upload/${transformations.join(
    ","
  )}/${publicId}.${format}`;
}

// 오디오(BGM)도 Cloudinary에서는 비디오 파이프라인(/video/upload/)으로 처리됨
export function getCloudinaryAudioUrl(
  publicId: string,
  format: "mp3" | "m4a" = "mp3"
): string {
  const cloudName = CLOUD_NAME || "demo";
  return `https://res.cloudinary.com/${cloudName}/video/upload/q_auto/${publicId}.${format}`;
}
