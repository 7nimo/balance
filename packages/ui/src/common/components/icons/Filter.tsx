interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgFilter({ title, titleId }: SVGRProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      aria-labelledby={titleId}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 6.5c0-1-4.477-1.5-10-1.5S2 5.5 2 6.5v1.666c0 .866.28 1.71.853 2.358a31.797 31.797 0 005.989 5.241c.256.172.425.45.453.757.257 2.828.485 4.769.608 5.746a.84.84 0 00.838.732c.169 0 .334-.05.474-.144l2.214-1.475c.37-.247.64-.612.727-1.049.125-.637.316-1.804.527-3.807.032-.303.2-.576.454-.745a31.787 31.787 0 006.01-5.256c.573-.648.853-1.492.853-2.358V6.5z"
        fill="var(--icon-main)"
      />
      <path
        d="M22 6.5c0 1-4.477 1.5-10 1.5S2 7.5 2 6.5 6.477 5 12 5s10 .5 10 1.5z"
        fill="var(--icon-accent)"
      />
    </svg>
  );
}

SvgFilter.defaultProps = {
  title: 'Filter',
  titleId: 5999,
};

export default SvgFilter;
