interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgSearch({ title, titleId }: SVGRProps): JSX.Element {
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
        d="M15.914 18.743a2 2 0 012.829-2.829l2.828 2.829a2 2 0 11-2.828 2.828l-2.829-2.828z"
        fill="var(--icon-accent)"
      />
      <path d="M20 11a9 9 0 11-18 0 9 9 0 0118 0z" fill="var(--icon-main)" />
      <path d="M17 11a6 6 0 11-12 0 6 6 0 0112 0z" fill="var(--icon-accent)" />
    </svg>
  );
}

SvgSearch.defaultProps = {
  title: 'Search',
  titleId: 233388,
};

export default SvgSearch;
