import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconPosition = 'right', ...props }, ref) => {
    return (
      <div className="relative w-full">
        {iconPosition === 'left' && (
          <div className="absolute left-3 top-0">{icon}</div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-md border focus-visible:shadow focus-visible:shadow-primary/25 border-input bg-background px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BDBDBD] focus-visible:outline-none focus-visible:border-primary  disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {iconPosition === 'right' && (
          <div className="absolute right-5 top-0">{icon}</div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
