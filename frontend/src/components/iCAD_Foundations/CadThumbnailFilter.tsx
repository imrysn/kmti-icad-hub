/** Hide the magenta CAD viewport in thumbnails, preserving red and blue annotations. */
export default function CadThumbnailFilter({ id }: { id: string }) {
  return <filter id={id} colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
    <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 -1 0 0 0" result="redExcess" />
    <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 -1 1 0 0" result="blueExcess" />
    <feComposite in="redExcess" in2="blueExcess" operator="arithmetic" k1={-30} k2={0} k3={0} k4={1} result="viewportMask" />
    <feComposite in="SourceGraphic" in2="viewportMask" operator="in" />
  </filter>;
}
