"use client";

import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: number;
  variant?: "badge" | "transparent";
}

export default function BrandLogo({
  className = "",
  size = 36,
  variant = "badge",
}: BrandLogoProps) {
  if (variant === "transparent") {
    return (
      <svg
        viewBox="0 0 79 55"
        width={size}
        height={(size * 55) / 79}
        className={`inline-block transition-transform duration-200 ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(0,55) scale(0.1,-0.1)" fill="currentColor" stroke="none">
          <path d="M500 523 c-7 -16 -46 -107 -87 -203 -41 -96 -81 -188 -89 -204 -8 -16 -14 -33 -14 -38 0 -5 12 -8 26 -6 l27 3 46 107 46 108 48 0 47 0 10 26 c6 14 10 27 10 30 0 2 -20 4 -44 4 l-45 0 17 40 17 40 57 0 57 0 11 19 c5 11 10 24 10 30 0 7 -23 11 -55 11 l-56 0 16 30 16 30 -29 0 -29 0 -13 -27z M311 468 c-12 -32 -83 -192 -86 -196 -2 -2 -23 9 -48 25 l-46 28 60 35 59 34 0 29 0 28 -12 -7 c-7 -4 -46 -27 -86 -52 l-72 -44 0 -23 0 -23 67 -43 c38 -23 90 -55 117 -71 l49 -29 8 13 c14 22 10 34 -16 48 l-25 14 6 19 c3 10 20 48 36 84 l31 65 17 -39 18 -38 16 37 16 36 -21 46 -20 46 -30 0 -29 0 -9 -22z M590 375 l0 -25 35 -17 c19 -9 35 -19 35 -22 0 -3 -27 -22 -60 -41 l-60 -35 0 -28 0 -28 23 12 c12 7 53 32 90 56 l68 44 -3 22 -3 22 -55 32 c-30 18 -58 33 -62 33 -4 0 -8 -11 -8 -25z M458 233 l-15 -36 16 -39 16 -38 33 0 c17 0 32 4 32 9 0 10 -60 141 -65 141 -2 0 -9 -16 -17 -37z M175 164 c-8 -20 -15 -38 -15 -40 0 -2 15 -4 33 -4 l34 0 11 24 11 24 -24 16 c-13 9 -27 16 -30 16 -2 0 -12 -16 -20 -36z" />
        </g>
      </svg>
    );
  }

  // Neo-Brutalist Badge Variant
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center rounded-lg bg-zinc-900 border-2 border-brutal-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#FFE600] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all duration-150 overflow-hidden flex-shrink-0 ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-[82%] h-[82%]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(10.5, 22.5)">
          <g transform="translate(0,55) scale(0.1,-0.1)" fill="#ffffff" stroke="none">
            <path d="M500 523 c-7 -16 -46 -107 -87 -203 -41 -96 -81 -188 -89 -204 -8 -16 -14 -33 -14 -38 0 -5 12 -8 26 -6 l27 3 46 107 46 108 48 0 47 0 10 26 c6 14 10 27 10 30 0 2 -20 4 -44 4 l-45 0 17 40 17 40 57 0 57 0 11 19 c5 11 10 24 10 30 0 7 -23 11 -55 11 l-56 0 16 30 16 30 -29 0 -29 0 -13 -27z M311 468 c-12 -32 -83 -192 -86 -196 -2 -2 -23 9 -48 25 l-46 28 60 35 59 34 0 29 0 28 -12 -7 c-7 -4 -46 -27 -86 -52 l-72 -44 0 -23 0 -23 67 -43 c38 -23 90 -55 117 -71 l49 -29 8 13 c14 22 10 34 -16 48 l-25 14 6 19 c3 10 20 48 36 84 l31 65 17 -39 18 -38 16 37 16 36 -21 46 -20 46 -30 0 -29 0 -9 -22z M590 375 l0 -25 35 -17 c19 -9 35 -19 35 -22 0 -3 -27 -22 -60 -41 l-60 -35 0 -28 0 -28 23 12 c12 7 53 32 90 56 l68 44 -3 22 -3 22 -55 32 c-30 18 -58 33 -62 33 -4 0 -8 -11 -8 -25z M458 233 l-15 -36 16 -39 16 -38 33 0 c17 0 32 4 32 9 0 10 -60 141 -65 141 -2 0 -9 -16 -17 -37z M175 164 c-8 -20 -15 -38 -15 -40 0 -2 15 -4 33 -4 l34 0 11 24 11 24 -24 16 c-13 9 -27 16 -30 16 -2 0 -12 -16 -20 -36z" />
          </g>
        </g>
      </svg>
    </div>
  );
}
