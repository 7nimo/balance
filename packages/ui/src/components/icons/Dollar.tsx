import React from 'react';

interface SVGRProps {
  title?: string;
  titleId?: string;
}

function SvgDollar ({ title, titleId }: SVGRProps): JSX.Element {
  return (
    <svg
      aria-labelledby={titleId}
      fill='none'
      height='1em'
      viewBox='0 0 24 24'
      width='1em'
      xmlns='http://www.w3.org/2000/svg'
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d='M21.644 11.755c0 5.41-4.386 9.796-9.796 9.796-5.41 0-9.796-4.386-9.796-9.796 0-5.41 4.386-9.796 9.796-9.796 5.41 0 9.796 4.386 9.796 9.796z'
        fill='var(--icon-main)'
      />
      <path
        d='M11.495 14.898c.564 0 .972-.105 1.223-.314.26-.209.391-.465.391-.768 0-.272-.099-.491-.297-.658-.199-.167-.497-.314-.894-.439l-.862-.282a10.42 10.42 0 01-1.16-.439 3.338 3.338 0 01-.877-.564 2.35 2.35 0 01-.565-.784c-.135-.303-.203-.663-.203-1.081 0-.71.22-1.301.658-1.771s1.066-.784 1.88-.94v-.57c0-.393.269-.747.661-.772a3.42 3.42 0 01.218-.007c.386 0 .663.068.83.204.178.136.267.381.267.737v.344c.668.074 1.212.236 1.63.486.418.24.627.56.627.956 0 .181-.045.348-.122.499-.19.373-.69.353-1.083.209a4.813 4.813 0 00-.347-.112 4.301 4.301 0 00-1.3-.188c-.523 0-.915.089-1.176.266-.251.168-.377.387-.377.659 0 .22.084.397.251.533.178.135.444.26.8.376l.877.266c.94.293 1.662.68 2.163 1.16.512.48.768 1.128.768 1.944 0 .72-.23 1.332-.69 1.833-.46.491-1.133.82-2.021.988v.553c0 .393-.268.747-.66.772a3.418 3.418 0 01-.218.007c-.387 0-.669-.068-.846-.204-.168-.136-.251-.381-.251-.736v-.314c-.763-.084-1.385-.266-1.865-.548-.47-.293-.706-.659-.706-1.098 0-.257.09-.48.235-.667.25-.323.72-.248 1.075-.048.15.086.315.167.493.245.428.178.92.267 1.473.267z'
        fill='var(--icon-accent)'
      />
    </svg>
  );
}

SvgDollar.defaultProps = {
  title: 'Dollar',
  titleId: 55555
};

export default SvgDollar;
