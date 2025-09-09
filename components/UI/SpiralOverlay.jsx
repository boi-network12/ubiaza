// SpiralOverlay.js
import { SvgXml } from "react-native-svg";

const Spiral = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" width="1200" height="660" aria-hidden="true">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#1441B3" />
      <stop offset="0.5" stop-color="#1E4ED8" />
      <stop offset="1" stop-color="#4A7DFC" />
    </linearGradient>
    <filter id="f" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feBlend in="SourceGraphic" in2="blur" />
    </filter>
  </defs>
  <rect x="0" y="0" width="400" height="220" rx="18" fill="url(#g)"/>
  <g transform="translate(320,110) rotate(-8)">
    <g stroke="#ffffff" stroke-opacity="0.06" stroke-width="3" fill="none" stroke-linecap="round">
      <circle r="82" transform="rotate(0)"/>
      <circle r="96" transform="rotate(18)"/>
      <circle r="110" transform="rotate(36)"/>
      <circle r="124" transform="rotate(54)"/>
      <circle r="138" transform="rotate(72)"/>
    </g>
    <g stroke="#ffffff" stroke-opacity="0.05" stroke-width="2" fill="none" stroke-linecap="round" transform="translate(-50,-10)">
      <circle r="48" transform="rotate(12)"/>
      <circle r="62" transform="rotate(30)"/>
      <circle r="76" transform="rotate(48)"/>
      <circle r="90" transform="rotate(66)"/>
    </g>
    <g stroke="#ffffff" stroke-opacity="0.03" stroke-width="6" fill="none" stroke-linecap="round" transform="translate(30,20)">
      <circle r="120" />
    </g>
  </g>
  <radialGradient id="v" cx="70%" cy="35%" r="80%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.02"/>
    <stop offset="100%" stop-color="#000000" stop-opacity="0.0"/>
  </radialGradient>
  <rect x="0" y="0" width="400" height="220" rx="18" fill="url(#v)" />
</svg>
`;

export default function SpiralOverlay() {
  return <SvgXml xml={Spiral} width="100%" height="100%" />;
}
