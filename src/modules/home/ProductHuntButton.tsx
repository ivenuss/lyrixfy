import React from 'react';
import { useTheme } from 'next-themes';

interface ProductHuntButtonProps {
  className?: string;
}

export const ProductHuntButton: React.FC<ProductHuntButtonProps> = ({
  className = ''
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <section
      id="features"
      className="mx-auto mb-8 flex max-w-screen-xs scroll-mt-20 flex-col items-center justify-center px-4"
    >
      <a
        target="_blank"
        rel="noreferrer"
        className="block"
        href="https://www.producthunt.com/posts/lyrixfy?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-lyrixfy"
      >
        <img
          width={250}
          height={54}
          className={className}
          alt="Lyrixfy - Screenshot&#0032;your&#0032;favorite&#0032;lyrics&#0032;from&#0032;any&#0032;song | Product Hunt"
          src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=365369&theme=${
            resolvedTheme === 'dark' ? 'dark' : 'neutral'
          }`}
        />
      </a>
    </section>
  );
};
