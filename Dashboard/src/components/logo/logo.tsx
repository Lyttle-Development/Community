export interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 154 67"
      className={className}
    >
      <g id="Group_110" transform="translate(-28 -36)">
        <circle
          id="Ellipse_1"
          cx="10.5"
          cy="10.5"
          r="10.5"
          transform="translate(28 50)"
          fill="#6e00ff"
        />
        <circle
          id="Ellipse_2"
          cx="6.5"
          cy="6.5"
          r="6.5"
          transform="translate(51 46)"
          fill="#ff7a49"
        />
        <circle
          id="Ellipse_5"
          cx="5"
          cy="5"
          r="5"
          transform="translate(38 36)"
          fill="#feb900"
        />
        <text
          id="Community_by_lyttle_development"
          transform="translate(38 79)"
          fill="#fafafa"
          fontSize="24"
          fontFamily="UrbaneRounded-Medium, Urbane Rounded"
          fontWeight="500"
        >
          <tspan x="0" y="0" fontFamily="Varela Round">
            Community
          </tspan>
          <tspan
            fill="#858585"
            fontSize="12"
            fontFamily="Varela Round"
            fontWeight="400"
          >
            <tspan x="0" y="15">
              by lyttle development
            </tspan>
          </tspan>
        </text>
      </g>
    </svg>
  );
}
