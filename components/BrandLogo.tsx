"use client";

import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: number;
  variant?: "badge" | "transparent";
}

const LOGO_PATH =
  "M420 27C413 43 374 134 333 230C292 326 252 418 244 434C236 450 230 467 230 472C230 477 242 480 256 478L283 475L329 368L375 260H423H470L480 234C486 220 490 207 490 204C490 202 470 200 446 200H401L418 160L435 120H492H549L560 101C565 90 570 77 570 71C570 64 547 60 515 60H459L475 30L491 0H462H433L420 27ZM231 82C219 114 148 274 145 278C143 280 122 269 97 253L51 225L111 190L170 156V127V99L158 106C151 110 112 133 72 158L0 202V225V248L67 291C105 314 157 346 184 362L233 391L241 378C255 356 251 344 225 330L200 316L206 297C209 287 226 249 242 213L273 148L290 187L308 225L324 188L340 152L319 106L299 60H269H240L231 82ZM510 175V200L545 217C564 226 580 236 580 239C580 242 553 261 520 280L460 315V343V371L483 359C495 352 536 327 573 303L641 259L638 237L635 215L580 183C550 165 522 150 518 150C514 150 510 161 510 175ZM378 317L363 353L379 392L395 430H428C445 430 460 426 460 421C460 411 400 280 395 280C393 280 386 296 378 317ZM95 386C87 406 80 424 80 426C80 428 95 430 113 430H147L158 406L169 382L145 366C132 357 118 350 115 350C113 350 103 366 95 386Z";

export default function BrandLogo({
  className = "",
  size = 36,
  variant = "badge",
}: BrandLogoProps) {
  if (variant === "transparent") {
    return (
      <svg
        viewBox="0 0 641 479"
        width={size}
        height={(size * 479) / 641}
        className={`inline-block text-brutal-black dark:text-white transition-colors duration-200 ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path d={LOGO_PATH} />
      </svg>
    );
  }

  // Neo-Brutalist Badge Variant:
  // Light mode: Clean white badge with black border, black shadow, and crisp black logo path
  // Dark mode: Dark zinc-900 badge with white border, yellow shadow, and crisp white logo path
  // Hover: Neo-brutalist translate micro-interaction with yellow background
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center rounded-lg bg-white dark:bg-zinc-900 border-2 border-brutal-black dark:border-white shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#FFE600] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none group-hover:bg-brutal-yellow dark:group-hover:bg-brutal-yellow transition-all duration-200 overflow-hidden flex-shrink-0 ${className}`}
    >
      <svg
        viewBox="0 0 641 479"
        className="w-[78%] h-[78%] text-brutal-black dark:text-white group-hover:text-brutal-black dark:group-hover:text-brutal-black transition-colors duration-200"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path d={LOGO_PATH} />
      </svg>
    </div>
  );
}
