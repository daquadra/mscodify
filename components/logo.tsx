import { useId } from "react";

/** Marca da mscodify: o mesmo símbolo `</>` usado no favicon (app/icon.svg). */
export default function LogoMark({ className = "size-7" }: { className?: string }) {
  const gradientId = useId();

  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="96" fill="#0b1120" />
      <rect x="32" y="32" width="448" height="448" rx="80" fill="#0f172a" />
      <path
        d="M164 178l-70 78 70 78M348 178l70 78-70 78M230 352l52-192"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
