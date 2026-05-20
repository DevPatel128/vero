import type { SVGProps } from "react";

export function TroveMark({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-label="Trove" {...props}>
      <rect x="2" y="2" width="60" height="60" rx="2" fill="#FAF7F2" stroke="#E5E0D8" />
      <path d="M16 22h32M32 22v24" stroke="#C9A96E" strokeWidth="4" strokeLinecap="square" />
      <circle cx="32" cy="46" r="2" fill="#111" />
    </svg>
  );
}
