import type { MetadataRoute } from "next";

// 개인 청첩장이므로 검색엔진에 노출되지 않도록 전면 차단
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
