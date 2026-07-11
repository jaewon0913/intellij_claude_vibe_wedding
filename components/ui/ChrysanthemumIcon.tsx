// 故人(고인)을 나타낼 때 이름 옆에 붙이는 작은 국화 아이콘
// 브런치 톤에 맞춰 화려하지 않게, 옅은 회백색 톤으로 절제해서 표현

export default function ChrysanthemumIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`inline-block h-[14px] w-[14px] align-middle ${className}`}
    >
      {/* 꽃잎 6장 */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (360 / 6) * i;
        return (
          <ellipse
            key={i}
            cx="12"
            cy="6.5"
            rx="2.2"
            ry="4.2"
            fill="#F5F3EF"
            stroke="#C9C2B6"
            strokeWidth="0.5"
            transform={`rotate(${angle} 12 12)`}
          />
        );
      })}
      {/* 중심 */}
      <circle cx="12" cy="12" r="2" fill="#B7AF9F" />
    </svg>
  );
}
