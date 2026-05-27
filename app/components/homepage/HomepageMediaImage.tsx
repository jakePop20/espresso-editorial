import {Image} from '@shopify/hydrogen';
import type {HomepageImage} from '~/lib/homepage/types';

type HomepageMediaImageProps = {
  alt?: string;
  className?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  image: HomepageImage | null;
  loading?: 'eager' | 'lazy';
  placeholderClassName?: string;
  sizes?: string;
};

export function HomepageMediaImage({
  alt,
  className,
  fetchPriority,
  image,
  loading = 'lazy',
  placeholderClassName,
  sizes,
}: HomepageMediaImageProps) {
  if (!image) {
    return (
      <div
        aria-hidden
        className={placeholderClassName ?? `${className ?? ''} bg-surface-container`.trim()}
      />
    );
  }

  return (
    <Image
      alt={alt ?? image.altText ?? 'WIP'}
      className={className}
      data={image}
      fetchPriority={fetchPriority}
      loading={loading}
      sizes={sizes}
    />
  );
}
