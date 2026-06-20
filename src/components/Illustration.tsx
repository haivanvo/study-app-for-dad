import React from 'react';

interface IllustrationProps {
  type?: 'apple' | 'banana' | 'cat' | 'dog' | 'orange' | 'bicycle' | 'chicken' | 'cup' | 'house' | 'sun' | 'water' | 'family' | 'heart' | 'book' | 'bed' | 'chair' | 'toothbrush' | 'broom' | 'shower' | 'toilet' | 'mom' | 'daughter' | 'son' | 'daughter_in_law' | 'grandchild';
  className?: string;
  size?: number;
}

export const Illustration: React.FC<IllustrationProps> = ({
  type = 'apple',
  className = '',
  size = 180
}) => {
  const width = size;
  const height = size;

  switch (type) {
    case 'apple':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_apple">
          {/* Stem & Leaf */}
          <path d="M50,22 Q52,10 60,12" stroke="#7A531C" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M52,14 Q65,10 65,18 Q55,22 52,14" fill="#4B9C47" />
          {/* Apple Body */}
          <path
            d="M50,25 
               C62,21 82,23 85,45 
               C88,68 70,88 50,88 
               C30,88 12,68 15,45 
               C18,23 38,21 50,25 Z"
            fill="#E15243"
          />
          {/* Highlights */}
          <ellipse cx="32" cy="40" rx="6" ry="12" fill="#F4958D" transform="rotate(-15 32 40)" opacity="0.6" />
          <ellipse cx="68" cy="45" rx="3" ry="6" fill="#F4958D" opacity="0.5" />
        </svg>
      );

    case 'banana':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_banana">
          {/* Bananas Bundle */}
          <path
            d="M30,15 
               C25,18 24,25 28,30
               C32,35 48,55 46,75
               C45,82 40,88 38,90
               C42,90 52,80 54,72
               C56,52 42,32 35,22 Z"
            fill="#F6D142"
          />
          <path
            d="M48,15 
               C45,18 40,25 42,32
               C45,42 62,58 60,78
               C59,85 53,92 50,95
               C56,94 68,84 69,75
               C71,55 58,32 52,22 Z"
            fill="#FFE169"
          />
          {/* Crown */}
          <path d="M28,15 C33,12 45,12 48,15 L43,9 Z" fill="#60762E" />
          <path d="M38,90 L39,94 M50,95 L51,99" stroke="#5C4505" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'cat':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_cat">
          {/* Ears */}
          <polygon points="18,45 10,18 35,32" fill="#E89F65" />
          <polygon points="15,41 12,24 28,32" fill="#F2C1A2" />
          <polygon points="82,45 90,18 65,32" fill="#E89F65" />
          <polygon points="85,41 88,24 72,32" fill="#F2C1A2" />
          {/* Head Body */}
          <ellipse cx="50" cy="55" rx="36" ry="28" fill="#F0AF7D" />
          {/* Eyes */}
          <circle cx="36" cy="50" r="6" fill="#2E4057" />
          <circle cx="36" cy="48" r="2" fill="#FFFFFF" />
          <circle cx="64" cy="50" r="6" fill="#2E4057" />
          <circle cx="64" cy="48" r="2" fill="#FFFFFF" />
          {/* Cheeks */}
          <circle cx="28" cy="59" r="4" fill="#EF9A9A" opacity="0.6" />
          <circle cx="72" cy="59" r="4" fill="#EF9A9A" opacity="0.6" />
          {/* Nose and Mouth */}
          <polygon points="50,56 46,52 54,52" fill="#DD6E6E" />
          <path d="M50,56 Q47,62 44,60 M50,56 Q53,62 56,60" stroke="#4F3628" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Whiskers */}
          <line x1="22" y1="56" x2="6" y2="52" stroke="#4F3628" strokeWidth="2" strokeLinecap="round" />
          <line x1="22" y1="61" x2="8" y2="61" stroke="#4F3628" strokeWidth="2" strokeLinecap="round" />
          <line x1="78" y1="56" x2="94" y2="52" stroke="#4F3628" strokeWidth="2" strokeLinecap="round" />
          <line x1="78" y1="61" x2="92" y2="61" stroke="#4F3628" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'dog':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_dog">
          {/* Head */}
          <ellipse cx="50" cy="52" rx="32" ry="28" fill="#D7CCC8" />
          {/* Ears */}
          <path d="M15,40 C10,32 12,58 18,65 C22,70 26,60 22,50 Z" fill="#8D6E63" />
          <path d="M85,40 C90,32 88,58 82,65 C78,70 74,60 78,50 Z" fill="#8D6E63" />
          {/* Eye Patch */}
          <ellipse cx="38" cy="46" rx="9" ry="11" fill="#A1887F" />
          {/* Eyes */}
          <circle cx="38" cy="46" r="4" fill="#3E2723" />
          <circle cx="38" cy="44" r="1.5" fill="#FFFFFF" />
          <circle cx="62" cy="46" r="4" fill="#3E2723" />
          <circle cx="62" cy="44" r="1.5" fill="#FFFFFF" />
          {/* Snout */}
          <ellipse cx="50" cy="62" rx="14" ry="10" fill="#EFEBE9" />
          <polygon points="50,56 44,52 56,52" fill="#3E2723" />
          {/* Mouth */}
          <path d="M50,58 Q46,65 42,62 M50,58 Q54,65 58,62" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Tongue */}
          <path d="M47,63 Q50,71 53,63 Z" fill="#FF8A80" />
        </svg>
      );

    case 'orange':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_orange">
          {/* Leaf */}
          <path d="M50,22 Q58,6 74,10 Q66,24 50,22" fill="#4CAF50" />
          {/* Orange base */}
          <circle cx="50" cy="54" r="32" fill="#FF9800" />
          {/* Dimples texture */}
          <circle cx="34" cy="42" r="1" fill="#F57C00" opacity="0.6" />
          <circle cx="42" cy="68" r="1" fill="#F57C00" opacity="0.6" />
          <circle cx="68" cy="46" r="1" fill="#F57C00" opacity="0.6" />
          <circle cx="60" cy="62" r="1" fill="#F57C00" opacity="0.6" />
          <circle cx="48" cy="32" r="1" fill="#F57C00" opacity="0.6" />
          {/* Reflection */}
          <path d="M26,44 A24,24 0 0,1 56,26" fill="none" stroke="#FFB74D" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          {/* Connection */}
          <circle cx="50" cy="22" r="3" fill="#6D4C41" />
        </svg>
      );

    case 'bicycle':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_bicycle">
          {/* Wheels */}
          <circle cx="25" cy="65" r="18" fill="none" stroke="#546E7A" strokeWidth="3" />
          <circle cx="25" cy="65" r="15" fill="none" stroke="#ECEFF1" strokeWidth="1" />
          <circle cx="25" cy="65" r="3" fill="#37474F" />

          <circle cx="75" cy="65" r="18" fill="none" stroke="#546E7A" strokeWidth="3" />
          <circle cx="75" cy="65" r="15" fill="none" stroke="#ECEFF1" strokeWidth="1" />
          <circle cx="75" cy="65" r="3" fill="#37474F" />

          {/* Spokes (Simple representation) */}
          <line x1="25" y1="47" x2="25" y2="83" stroke="#90A4AE" strokeWidth="1.5" />
          <line x1="7" y1="65" x2="43" y2="65" stroke="#90A4AE" strokeWidth="1.5" />
          <line x1="75" y1="47" x2="75" y2="83" stroke="#90A4AE" strokeWidth="1.5" />
          <line x1="57" y1="65" x2="93" y2="65" stroke="#90A4AE" strokeWidth="1.5" />

          {/* Frame */}
          <polygon points="25,65 50,65 62,42 38,42" fill="none" stroke="#009688" strokeWidth="4" strokeLinejoin="round" />
          <line x1="25" y1="65" x2="38" y2="42" stroke="#009688" strokeWidth="4" />
          <line x1="50" y1="65" x2="35" y2="35" stroke="#009688" strokeWidth="4" />

          {/* Seat */}
          <line x1="30" y1="35" x2="40" y2="35" stroke="#37474F" strokeWidth="5" strokeLinecap="round" />

          {/* Handlebar */}
          <line x1="62" y1="42" x2="58" y2="28" stroke="#009688" strokeWidth="4" />
          <line x1="58" y1="28" x2="66" y2="28" stroke="#37474F" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );

    case 'chicken':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_chicken">
          {/* Legs */}
          <line x1="42" y1="70" x2="42" y2="88" stroke="#FF9800" strokeWidth="4" strokeLinecap="round" />
          <line x1="54" y1="70" x2="54" y2="88" stroke="#FF9800" strokeWidth="4" strokeLinecap="round" />
          <line x1="42" y1="88" x2="36" y2="88" stroke="#FF9800" strokeWidth="3" strokeLinecap="round" />
          <line x1="54" y1="88" x2="60" y2="88" stroke="#FF9800" strokeWidth="3" strokeLinecap="round" />

          {/* Tail */}
          <path d="M22,50 Q12,30 24,25 Q32,38 28,52" fill="#37474F" />

          {/* Body */}
          <ellipse cx="46" cy="54" rx="24" ry="20" fill="#FFEB3B" />

          {/* Neck & Head */}
          <path d="M58,54 C66,54 74,45 74,32 C74,24 64,22 62,32 Z" fill="#FFEE58" />

          {/* Wing */}
          <path d="M38,54 Q30,50 36,42 Q48,42 46,54 Z" fill="#FDD835" />

          {/* Comb (Mào gà) */}
          <path d="M64,24 C62,14 74,12 72,25" fill="#E53935" stroke="#E53935" strokeWidth="4" strokeLinecap="round" />
          <circle cx="70" cy="20" r="3.5" fill="#E53935" />
          <circle cx="65" cy="18" r="3" fill="#E53935" />

          {/* Eye */}
          <circle cx="68" cy="30" r="2.5" fill="#212121" />

          {/* Beak */}
          <polygon points="74,31 82,34 74,37" fill="#FF9800" />

          {/* Wattles (Tích gà đỏ) */}
          <path d="M72,37 Q74,44 70,44 Z" fill="#E53935" />
        </svg>
      );

    case 'cup':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_cup">
          {/* Steam */}
          <path d="M40,24 Q36,15 42,10" fill="none" stroke="#B0BEC5" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <path d="M50,22 Q46,12 52,8" fill="none" stroke="#B0BEC5" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <path d="M60,24 Q56,15 62,10" fill="none" stroke="#B0BEC5" strokeWidth="3" strokeLinecap="round" opacity="0.6" />

          {/* Saucer */}
          <ellipse cx="50" cy="80" rx="36" ry="6" fill="#B0BEC5" />

          {/* Handle */}
          <path d="M68,44 C82,44 82,66 68,66" fill="none" stroke="#00ACC1" strokeWidth="6.5" strokeLinecap="round" />

          {/* Cup Body */}
          <path d="M32,34 C32,68 34,76 50,76 C66,76 68,68 68,34 Z" fill="#00BCD4" />

          {/* Rim Decoration */}
          <path d="M32,38 L68,38" stroke="#80DEEA" strokeWidth="3" />
        </svg>
      );

    case 'house':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_house">
          {/* Chimney */}
          <rect x="68" y="22" width="10" height="20" fill="#78909C" />
          {/* Roof */}
          <polygon points="50,15 15,44 85,44" fill="#E53935" />
          <polygon points="50,15 22,40 18,44 50,18 82,44 78,40" fill="#C62828" />

          {/* Base */}
          <rect x="24" y="44" width="52" height="42" fill="#FFF9C4" />

          {/* Door */}
          <rect x="42" y="58" width="16" height="28" fill="#8D6E63" />
          <circle cx="54" cy="72" r="2" fill="#FFD54F" />

          {/* Windows */}
          <rect x="30" y="50" width="10" height="12" fill="#E3F2FD" stroke="#90A4AE" strokeWidth="2" />
          <rect x="60" y="50" width="10" height="12" fill="#E3F2FD" stroke="#90A4AE" strokeWidth="2" />
        </svg>
      );

    case 'sun':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_sun">
          {/* Rays */}
          <g stroke="#FF9800" strokeWidth="6" strokeLinecap="round">
            <line x1="50" y1="8" x2="50" y2="18" />
            <line x1="50" y1="82" x2="50" y2="92" />
            <line x1="8" y1="50" x2="18" y2="50" />
            <line x1="82" y1="50" x2="92" y2="50" />
            <line x1="20" y1="20" x2="28" y2="28" />
            <line x1="72" y1="72" x2="80" y2="80" />
            <line x1="20" y1="80" x2="28" y2="72" />
            <line x1="72" y1="28" x2="80" y2="20" />
          </g>
          {/* Shield */}
          <circle cx="50" cy="50" r="24" fill="#FFEB3B" stroke="#FF9800" strokeWidth="3" />
          {/* Glass Face for friendliness */}
          <circle cx="43" cy="46" r="3" fill="#FF5722" />
          <circle cx="57" cy="46" r="3" fill="#FF5722" />
          <path d="M42,56 Q50,66 58,56" fill="none" stroke="#FF5722" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'heart':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_heart">
          <path
            d="M50,30 
               C50,15 25,10 25,32 
               C25,58 50,80 50,80 
               C50,80 75,58 75,32 
               C75,10 50,15 50,30 Z"
            fill="#EF5350"
          />
          <path
            d="M32,24 C28,24 28,32 32,36"
            fill="none"
            stroke="#FFCDD2"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      );

    case 'family':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_family">
          {/* Background circle */}
          <circle cx="50" cy="50" r="42" fill="#E0F2F1" />

          {/* Father (Xanh) */}
          <g transform="translate(-12, 0)">
            <ellipse cx="42" cy="75" rx="14" ry="16" fill="#009688" />
            <circle cx="42" cy="44" r="8" fill="#F5C6A5" />
          </g>

          {/* Mother (Hồng) */}
          <g transform="translate(12, 2)">
            <path d="M44,75 C44,64 54,58 64,62 C64,70 60,84 56,84 Z" fill="#EC407A" />
            <circle cx="58" cy="46" r="8" fill="#F4Bca0" />
            {/* Hair */}
            <path d="M50,42 C50,34 66,34 66,42 Z" fill="#37474F" />
          </g>

          {/* Child (Vàng) */}
          <g transform="translate(0, 10)">
            <ellipse cx="50" cy="74" rx="10" ry="12" fill="#FFB300" />
            <circle cx="50" cy="52" r="6" fill="#F3BF95" />
          </g>
        </svg>
      );

    case 'book':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_book">
          {/* Back Cover */}
          <rect x="14" y="20" width="72" height="60" rx="4" fill="#0277BD" />
          {/* Pages */}
          <path d="M18,22 L18,76 C46,76 50,78 50,78 C50,78 54,76 82,76 L82,22 C54,22 50,24 50,24 C50,24 46,22 18,22 Z" fill="#ECEFF1" />
          {/* Middle fold */}
          <line x1="50" y1="24" x2="50" y2="78" stroke="#B0BEC5" strokeWidth="2.5" />
          {/* Lines representation */}
          <line x1="24" y1="34" x2="42" y2="34" stroke="#CFD8DC" strokeWidth="2.5" />
          <line x1="24" y1="44" x2="42" y2="44" stroke="#CFD8DC" strokeWidth="2.5" />
          <line x1="24" y1="54" x2="38" y2="54" stroke="#CFD8DC" strokeWidth="2.5" />

          <line x1="58" y1="34" x2="76" y2="34" stroke="#CFD8DC" strokeWidth="2.5" />
          <line x1="58" y1="44" x2="76" y2="44" stroke="#CFD8DC" strokeWidth="2.5" />
          <line x1="58" y1="54" x2="72" y2="54" stroke="#CFD8DC" strokeWidth="2.5" />

          {/* Bookmark */}
          <polygon points="50,24 54,54 50,50 46,54" fill="#E53935" />
        </svg>
      );

    case 'water':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_water">
          {/* Glass background rim */}
          <path d="M30,22 L70,22 L62,82 L38,82 Z" fill="none" stroke="#90CAF9" strokeWidth="4.5" strokeLinejoin="round" />
          {/* Water content */}
          <path d="M32.5,42 Q50,45 67.5,42 L62,80 L38,80 Z" fill="#29B6F6" opacity="0.85" />
          {/* Bubbles & Sparkle */}
          <circle cx="44" cy="56" r="3.5" fill="#E1F5FE" opacity="0.8" />
          <circle cx="56" cy="66" r="2.5" fill="#E1F5FE" opacity="0.8" />
          <circle cx="38" cy="70" r="1.5" fill="#E1F5FE" opacity="0.8" />
          {/* Glass shine */}
          <path d="M35,28 L38,68" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case 'bed':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_bed">
          {/* Headboard */}
          <rect x="12" y="24" width="8" height="54" rx="2" fill="#795548" />
          {/* Footboard */}
          <rect x="80" y="44" width="8" height="34" rx="2" fill="#795548" />
          {/* Frame/Base */}
          <rect x="18" y="52" width="64" height="14" fill="#8D6E63" />
          {/* Mattress */}
          <rect x="20" y="40" width="60" height="13" rx="1" fill="#E0F7FA" />
          {/* Pillow */}
          <rect x="24" y="32" width="14" height="9" rx="2" fill="#FFFFFF" stroke="#B2EBF2" strokeWidth="1" />
          {/* Blanket folded */}
          <path d="M42,40 L78,40 C79,40 80,41 80,42 L80,53 L42,53 C44,48 44,44 42,40 Z" fill="#26A69A" />
          {/* Bed legs */}
          <rect x="14" y="74" width="4" height="8" fill="#5D4037" />
          <rect x="82" y="74" width="4" height="8" fill="#5D4037" />
        </svg>
      );

    case 'chair':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_chair">
          {/* Shadow */}
          <ellipse cx="50" cy="85" rx="28" ry="5" fill="#E0E0E0" />
          {/* Wooden backrest bars */}
          <rect x="34" y="16" width="32" height="4" rx="1" fill="#A0522D" />
          <line x1="40" y1="20" x2="40" y2="52" stroke="#CD853F" strokeWidth="3" />
          <line x1="50" y1="20" x2="50" y2="52" stroke="#CD853F" strokeWidth="3" />
          <line x1="60" y1="20" x2="60" y2="52" stroke="#CD853F" strokeWidth="3" />
          {/* Back pillars */}
          <rect x="30" y="14" width="4" height="38" fill="#8B4513" />
          <rect x="66" y="14" width="4" height="38" fill="#8B4513" />
          {/* Cushion seat */}
          <rect x="26" y="50" width="48" height="6" rx="2.5" fill="#CD853F" />
          {/* Chair Legs */}
          <line x1="31" y1="56" x2="27" y2="84" stroke="#8B4513" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="69" y1="56" x2="73" y2="84" stroke="#8B4513" strokeWidth="5.5" strokeLinecap="round" />
          <line x1="40" y1="56" x2="43" y2="81" stroke="#A0522D" strokeWidth="4" opacity="0.9" />
          <line x1="60" y1="56" x2="57" y2="81" stroke="#A0522D" strokeWidth="4" opacity="0.9" />
        </svg>
      );

    case 'toothbrush':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_toothbrush">
          {/* Brush Handle rotated */}
          <g transform="rotate(-30 50 50)">
            <rect x="12" y="44" width="60" height="7.5" rx="3.5" fill="#26C6DA" />
            <rect x="70" y="41" width="18" height="11" rx="2" fill="#E0F7FA" />
            
            {/* Bristles */}
            <rect x="72" y="27" width="3" height="14" fill="#FFFFFF" />
            <rect x="76" y="27" width="3" height="14" fill="#FFFFFF" />
            <rect x="80" y="27" width="3" height="14" fill="#FFFFFF" />
            <rect x="84" y="27" width="3" height="14" fill="#FFFFFF" />
            <line x1="71" y1="27" x2="87" y2="27" stroke="#26C6DA" strokeWidth="2.5" />

            {/* Toothpaste glob */}
            <path d="M72,25 C72,20 80,18 84,25 Z" fill="#FF8A80" />
            <path d="M80,25 C80,22 84,21 86,25 Z" fill="#FFFFFF" />
          </g>
        </svg>
      );

    case 'broom':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_broom">
          {/* Sweep handle rotated */}
          <g transform="rotate(25 50 50)">
            {/* Wooden Handle */}
            <rect x="46" y="8" width="6" height="52" rx="2" fill="#BCAAA4" />
            {/* Broom connector */}
            <polygon points="41,60 57,60 59,70 39,70" fill="#E53935" />
            {/* Bristles */}
            <path d="M39,70 L59,70 L72,92 L26,92 Z" fill="#FFF59D" />
            {/* Straw Lines */}
            <line x1="44" y1="70" x2="34" y2="91" stroke="#FBC02D" strokeWidth="2" />
            <line x1="49" y1="70" x2="49" y2="92" stroke="#FBC02D" strokeWidth="2" />
            <line x1="54" y1="70" x2="64" y2="91" stroke="#FBC02D" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'shower':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_shower">
          {/* Shower Pipe */}
          <path d="M22,76 L22,24 Q22,14 34,14 L55,14" fill="none" stroke="#90A4AE" strokeWidth="6" strokeLinecap="round" />
          {/* Shower Head */}
          <path d="M55,11 L55,17 L66,28 L72,22 Z" fill="#78909C" />
          <ellipse cx="69" cy="25" rx="10" ry="4" fill="#CFD8DC" transform="rotate(45 69 25)" />
          {/* Water Drops */}
          <g stroke="#29B6F6" strokeWidth="3" strokeLinecap="round" opacity="0.8">
            {/* Wave 1 */}
            <line x1="68" y1="41" x2="65" y2="47" />
            <line x1="78" y1="36" x2="76" y2="42" />
            <line x1="60" y1="46" x2="57" y2="52" />
            {/* Wave 2 */}
            <line x1="63" y1="59" x2="60" y2="67" />
            <line x1="73" y1="54" x2="70" y2="62" />
            <line x1="53" y1="64" x2="50" y2="72" />
          </g>
        </svg>
      );

    case 'toilet':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_toilet">
          {/* Tank */}
          <rect x="20" y="20" width="22" height="34" rx="3" fill="#ECEFF1" stroke="#CFD8DC" strokeWidth="2" />
          {/* Flush handle */}
          <rect x="24" y="24" width="4" height="2.5" rx="0.5" fill="#B0BEC5" />
          {/* Bowl body */}
          <path d="M38,48 L76,48 C76,48 78,74 58,74 C38,74 38,48 38,48 Z" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="2" />
          {/* Lid/Seat */}
          <ellipse cx="58" cy="48" rx="19" ry="2.5" fill="#ECEFF1" stroke="#CFD8DC" strokeWidth="1.5" />
          {/* Base connector */}
          <path d="M36,72 L62,72 L58,84 L42,84 Z" fill="#ECEFF1" stroke="#CFD8DC" strokeWidth="2" />
        </svg>
      );

    case 'mom':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_mom">
          {/* Backdrop with soft heart glow */}
          <circle cx="50" cy="50" r="44" fill="#FFEbee" />
          <path d="M50,22 C44,14 36,18 36,25 Q36,36 50,44 Q64,36 64,25 C64,18 56,14 50,22 Z" fill="#FFCDD2" opacity="0.5" />
          
          {/* Shoulders */}
          <path d="M26,82 C26,70 34,60 46,58 H54 C66,60 74,70 74,82" fill="#E57373" stroke="#C62828" strokeWidth="3" />
          
          {/* Head & Neck */}
          <rect x="46" y="48" width="8" height="12" rx="1" fill="#FFCC80" />
          <circle cx="50" cy="38" r="15" fill="#FFCC80" stroke="#E65100" strokeWidth="2.5" />
          
          {/* Hair stylings - traditional elegant hair bun */}
          <circle cx="50" cy="21" r="5.5" fill="#37474F" /> {/* Hair bun */}
          <path d="M35,36 C35,22 65,22 65,36" fill="none" stroke="#37474F" strokeWidth="6" strokeLinecap="round" />
          <path d="M35,36 Q50,28 65,36" fill="#37474F" />

          {/* Glasses - elegant grandmother look */}
          <circle cx="44" cy="38" r="4.5" fill="none" stroke="#FFD54F" strokeWidth="2" />
          <circle cx="56" cy="38" r="4.5" fill="none" stroke="#FFD54F" strokeWidth="2" />
          <line x1="48.5" y1="38" x2="51.5" y2="38" stroke="#FFD54F" strokeWidth="2" />

          {/* Friendly Eyes and smile */}
          <circle cx="44" cy="38" r="1.2" fill="#212121" />
          <circle cx="56" cy="38" r="1.2" fill="#212121" />
          <path d="M46,45 Q50,49 54,45" fill="none" stroke="#C62828" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'daughter':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_daughter">
          {/* Cute girlish background circle */}
          <circle cx="50" cy="50" r="44" fill="#FCE4EC" />
          
          {/* Flower accent */}
          <circle cx="72" cy="24" r="3" fill="#F48FB1" />
          <circle cx="75" cy="21" r="2.5" fill="#FFF59D" />
          <circle cx="78" cy="24" r="3" fill="#F48FB1" />
          <circle cx="75" cy="27" r="3" fill="#F48FB1" />

          {/* Hair back */}
          <path d="M31,44 C26,50 26,72 26,76 L35,76 Z" fill="#455A64" />
          <path d="M69,44 C74,50 74,72 74,76 L65,76 Z" fill="#455A64" />

          {/* Shoulders */}
          <path d="M28,84 C28,72 36,62 48,60 H52 C64,62 72,72 72,84" fill="#F06292" stroke="#AD1457" strokeWidth="3" />
          
          {/* Head & Neck */}
          <rect x="46" y="50" width="8" height="12" fill="#FFE0B2" />
          <circle cx="50" cy="40" r="14.5" fill="#FFE0B2" stroke="#E65100" strokeWidth="2" />
          
          {/* Beautiful short hair bang and hairpins */}
          <path d="M35,38 C35,21 65,21 65,38" fill="none" stroke="#455A64" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M35,36 Q50,28 65,36" fill="#455A64" />
          {/* Hair ribbon */}
          <rect x="36" y="26" width="6" height="3" rx="1" fill="#FF8A80" transform="rotate(-15 36 26)" />

          {/* Gentle Eyes & Rosy cheeks */}
          <circle cx="44" cy="38" r="2" fill="#212121" />
          <circle cx="56" cy="38" r="2" fill="#212121" />
          
          {/* Chubby cheeks (Bé Béo) */}
          <circle cx="39" cy="43" r="3" fill="#FF8A80" opacity="0.4" />
          <circle cx="61" cy="43" r="3" fill="#FF8A80" opacity="0.4" />

          {/* Cute open smile */}
          <path d="M46,45.5 Q50,50 54,45.5" fill="none" stroke="#AD1457" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'son':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_son">
          {/* Blue Sky dynamic backdrop */}
          <circle cx="50" cy="50" r="44" fill="#E3F2FD" />
          <path d="M22,50 Q50,42 78,50" stroke="#BBDEFB" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5" />

          {/* Shoulders */}
          <path d="M25,82 C25,70 34,60 47,58 H53 C66,60 75,70 75,82" fill="#1E88E5" stroke="#1565C0" strokeWidth="3" />
          
          {/* Collar shirt detail */}
          <polygon points="43,58 50,66 57,58 50,58" fill="#FFFFFF" />

          {/* Head & Neck */}
          <rect x="46" y="48" width="8" height="12" fill="#FFD54F" opacity="0.8" />
          <circle cx="50" cy="38" r="14.5" fill="#FFE0B2" stroke="#E65100" strokeWidth="2.2" />

          {/* Handsome Short Hair */}
          <path d="M34,32 C34,18 66,18 66,32" fill="none" stroke="#263238" strokeWidth="5" strokeLinecap="round" />
          <path d="M34,31 C40,24 60,24 66,31 L68,36 L32,36 Z" fill="#263238" />

          {/* Eyes, eyebrows and smile */}
          <line x1="41" y1="32" x2="47" y2="32" stroke="#263238" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="53" y1="32" x2="59" y2="32" stroke="#263238" strokeWidth="2.2" strokeLinecap="round" />
          
          <circle cx="44" cy="37" r="2" fill="#212121" />
          <circle cx="56" cy="37" r="2" fill="#212121" />

          {/* Broad energetic smile */}
          <path d="M45,45 Q50,51 55,45" fill="none" stroke="#1565C0" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'daughter_in_law':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_daughter_in_law">
          {/* Orange/Yellow warm sunset circle */}
          <circle cx="50" cy="50" r="44" fill="#FFF8E1" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="#FFE082" strokeWidth="2.2" strokeDasharray="5,6" opacity="0.7" />

          {/* Shoulders with pretty dress */}
          <path d="M26,84 C26,72 34,62 46,60 H54 C66,62 74,72 74,84" fill="#FFB74D" stroke="#EF6C00" strokeWidth="3" />
          
          {/* Pearl Necklace */}
          <circle cx="46" cy="62" r="1.5" fill="#FFFFFF" />
          <circle cx="50" cy="63" r="1.5" fill="#FFFFFF" />
          <circle cx="54" cy="62" r="1.5" fill="#FFFFFF" />

          {/* Head & Neck */}
          <rect x="46" y="48" width="8" height="12" fill="#FFE0B2" />
          <circle cx="50" cy="38" r="14" fill="#FFE0B2" stroke="#E65100" strokeWidth="2" />

          {/* Modern wavy hair (Kim Ngân) */}
          <path d="M35,36 C35,20 65,20 65,36" fill="none" stroke="#4E342E" strokeWidth="6.5" strokeLinecap="round" />
          <path d="M35,36 L65,36 L68,48 L32,48 Z" fill="#4E342E" />
          <circle cx="34" cy="46" r="4" fill="#4E342E" />
          <circle cx="66" cy="46" r="4" fill="#4E342E" />

          {/* Gentle Eyes, Blush & soft smile */}
          <circle cx="43" cy="38" r="2.2" fill="#212121" />
          <circle cx="57" cy="38" r="2.2" fill="#212121" />
          
          <circle cx="38" cy="44" r="2.5" fill="#FF8A80" opacity="0.3" />
          <circle cx="62" cy="44" r="2.5" fill="#FF8A80" opacity="0.3" />

          <path d="M46,45 L50,48 L54,45" fill="none" stroke="#EF6C00" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'grandchild':
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className} id="svg_grandchild">
          {/* Magical starry background circle for baby (Coca) */}
          <circle cx="50" cy="50" r="44" fill="#E8F5E9" />
          
          {/* Sparkles of childhood */}
          <path d="M24,28 L26,30 L24,32 L22,30 Z" fill="#81C784" />
          <path d="M78,32 L80,34 L78,36 L76,34 Z" fill="#81C784" />
          
          {/* Shoulders in cute green bib */}
          <path d="M28,84 C28,74 36,64 48,62 H52 C64,64 72,74 72,84" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="3" />
          {/* Bib Outline illustration */}
          <path d="M42,62 C42,68 58,68 58,62" fill="none" stroke="#FFFFFF" strokeWidth="2" />

          {/* Head & Neck */}
          <rect x="46" y="52" width="8" height="10" fill="#FFE0B2" />
          <circle cx="50" cy="42" r="13.5" fill="#FFE0B2" stroke="#E65100" strokeWidth="2" />

          {/* Adorable Baby speech cap (Mũ nôi gấu dễ thương) */}
          <path d="M35,40 C35,24 65,24 65,40" fill="none" stroke="#81C784" strokeWidth="6" strokeLinecap="round" />
          <path d="M35,39 Q50,30 65,39" fill="#81C784" />
          {/* Bear ears on the cap */}
          <circle cx="36" cy="27" r="4" fill="#81C784" stroke="#2E7D32" strokeWidth="1.5" />
          <circle cx="64" cy="27" r="4" fill="#81C784" stroke="#2E7D32" strokeWidth="1.5" />

          {/* Big Sparkly Eyes */}
          <circle cx="43" cy="42" r="3" fill="#212121" />
          {/* White sparkle in eye */}
          <circle cx="44.5" cy="40.5" r="1" fill="#FFFFFF" />
          
          <circle cx="57" cy="42" r="3" fill="#212121" />
          <circle cx="58.5" cy="40.5" r="1" fill="#FFFFFF" />

          {/* Chubby rosy baby cheeks */}
          <circle cx="37" cy="46" r="3.5" fill="#FF8A80" opacity="0.5" />
          <circle cx="63" cy="46" r="3.5" fill="#FF8A80" opacity="0.5" />

          {/* Sweet laughing baby smile */}
          <path d="M46,47.5 Q50,52 54,47.5" fill="none" stroke="#2E7D32" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg width={width} height={height} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="40" fill="#90A4AE" />
        </svg>
      );
  }
};
