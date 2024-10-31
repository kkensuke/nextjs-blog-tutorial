import React, { CSSProperties } from 'react';

interface CustomImageProps {
  alt?: string;
  src?: string;
  title?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ alt, src, title }) => {
  if (!src) return null;

  // Parse the width, align, and caption from the title
  const widthMatch = title ? title.match(/width=(\d+px|\d+%)/) : null;
  const width = widthMatch ? widthMatch[1] : 'auto';

  const alignMatch = title ? title.match(/align=(left|center|right)/) : null;
  const align = alignMatch ? alignMatch[1] : 'center';

  const captionMatch = title ? title.match(/caption='([^"]+)'/) : null;
  const caption = captionMatch ? captionMatch[1] : '';

  const style: CSSProperties = {
    maxWidth: '100%',
    height: 'auto',
    width,
    display: 'block',
    margin: align === 'left' ? '2rem auto 2rem 0' : align === 'right' ? '2rem 0 2rem auto' : '2rem auto',
  };

  return (
    <figure>
      <img
        src={src}
        alt={alt || ''}
        style={style}
      />
      <div style={style}>
        {caption && <figcaption style={{ textAlign: 'center'}}>{caption}</figcaption>}
      </div>
    </figure>
  );
};

export default CustomImage;