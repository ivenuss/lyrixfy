import React from 'react';
import Link, { type LinkProps } from 'next/link';
import clsx from 'clsx';
import { btnColorClassnames, btnSizeClassnames } from './Button';

type ButtonLinkProps = Partial<LinkProps> &
  React.ComponentProps<'a'> & {
    href: string;
    children: React.ReactNode;
    color?: keyof typeof btnColorClassnames;
    size?: keyof typeof btnSizeClassnames;
  };

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ href, children, color = 'primary', size = 'normal', ...props }, ref) => {
    const cn = clsx(
      'inline-flex items-center justify-center py-2 px-6 text-sm rounded-md font-medium shadow-md transition-colors duration-300 ease-in-out',
      btnSizeClassnames[size],
      btnColorClassnames[color],
      props.className
    );

    const isInternalLink =
      href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
      return (
        <Link {...props} ref={ref} href={href} className={cn}>
          {children}
        </Link>
      );
    }

    return (
      <a
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        {...props}
        className={cn}
      >
        {children}
      </a>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';
