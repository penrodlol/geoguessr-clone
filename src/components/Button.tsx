import { ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, role, className, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      role={role ?? 'button'}
      className={`rounded-md border-4 px-14 py-[0.9rem] font-extrabold
                  fluid-lg hover:bg-[rgba(var(--colors-brand-2),0.05)]
                  focus-visible:bg-[rgba(var(--colors-brand-2),0.05)]  ${className}`}
    >
      {children}
    </button>
  ),
);

Button.displayName = 'Button';
