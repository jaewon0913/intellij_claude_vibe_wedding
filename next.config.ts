import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // C:\Users\hwangjaewon 에 있는 package-lock.json과 헷갈리지 않도록
  // 이 프로젝트 디렉토리를 workspace root로 명시
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
