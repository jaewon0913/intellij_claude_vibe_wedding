// 브라우저에서만 동작하는 이미지 압축 유틸.
// Vercel 서버리스 함수의 요청 본문 한도(4.5MB)보다 안전하게 여유를 두고,
// 그보다 큰 이미지는 업로드 전에 리사이즈+재압축해서 줄인다.

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // 4MB (Vercel 4.5MB 한도 대비 안전 마진)
const MAX_DIMENSION = 2000; // px, 이보다 긴 변은 이 값으로 축소
const MIN_QUALITY = 0.4;

function loadImage(file: File): Promise<{ img: HTMLImageElement; url: string }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ img, url });
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg", quality);
  });
}

/**
 * 파일이 이미지이고 MAX_UPLOAD_BYTES보다 크면 리사이즈+재압축해서
 * 더 작은 File을 반환한다. 그 외(이미지가 아니거나 이미 충분히 작음)에는 원본 그대로 반환.
 */
export async function compressImageIfNeeded(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  if (file.size <= MAX_UPLOAD_BYTES) return file;

  let objectUrl: string | null = null;

  try {
    const { img, url } = await loadImage(file);
    objectUrl = url;

    let { width, height } = img;
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      const scale = MAX_DIMENSION / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, width, height);

    let quality = 0.85;
    let blob = await canvasToBlob(canvas, quality);

    // 리사이즈만으로 충분치 않으면 품질을 단계적으로 더 낮춰가며 재시도
    while (blob && blob.size > MAX_UPLOAD_BYTES && quality > MIN_QUALITY) {
      quality -= 0.1;
      blob = await canvasToBlob(canvas, quality);
    }

    if (!blob) return file;

    const newName = file.name.replace(/\.\w+$/, "") + ".jpg";
    return new File([blob], newName, { type: "image/jpeg" });
  } catch (err) {
    console.error("이미지 압축 실패, 원본으로 업로드 시도:", err);
    return file;
  } finally {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }
}
