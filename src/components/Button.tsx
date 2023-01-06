import React, {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps
} from 'react';
import clsx, { type ClassValue } from 'clsx';
import type { Icon as IconType } from 'react-feather';

export const btnSizeClassnames = {
  none: '',
  large: 'py-3.5 px-12 text-base rounded-lg',
  medium: 'py-3 px-8 text-base rounded-lg',
  normal: 'py-2 px-6 text-sm rounded-md',
  small: 'px-2 py-1 text-sm rounded-md',
  tiny: 'px-1 text-sm rounded-5'
};

export const btnColorClassnames = {
  primary:
    'text-black bg-accent hover:bg-black hover:text-accent dark:text-black dark:bg-accent dark:hover:bg-accent-dark disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:bg-gray-300 dark:disabled:bg-primary-800 dark:disabled:text-primary-300/40',
  secondary:
    'text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-white dark:bg-primary-600 dark:hover:bg-primary-700',
  transparent: 'bg-transparent'
};

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  className?: string;
  icon?: IconType;
  color?: keyof typeof btnColorClassnames;
  size?: keyof typeof btnSizeClassnames;
  iconCn?: ClassValue;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      icon: Icon = null,
      iconCn = '',
      color = 'primary',
      size = 'normal',
      disabled = false,
      loading = false,
      children,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled || loading}
      className={clsx(
        'flex items-center justify-center font-medium shadow-md transition-colors duration-300 ease-in-out',
        'disabled:cursor-not-allowed', // Disabled
        btnSizeClassnames[size],
        btnColorClassnames[color],
        className
      )}
      {...props}
    >
      {Icon && <Icon className={clsx('text-xl', iconCn)} />}
      {children && <div className={clsx({ 'px-2': Icon })}>{children}</div>}
    </button>
  )
);

Button.displayName = 'Button';
