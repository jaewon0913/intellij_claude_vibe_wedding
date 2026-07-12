// 공통 Toast 컴포넌트: "주소 복사" 등 짧은 액션 피드백에 재사용

interface ToastProps {
  message: string;
  visible: boolean;
}

export default function Toast({ message, visible }: ToastProps) {
  return (
    <div
      aria-live="polite"
      className={`fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper shadow-lg transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
