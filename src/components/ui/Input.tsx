import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '../Icons';

type Icons = 'mail' | 'lock' | 'link';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: Icons;
  error?: string;
}

const getIconsFromName = (iconName: Icons) => {
  switch (iconName) {
    case 'mail':
      return () => <Icons.mail />;
    case 'lock':
      return () => <Icons.lock />;
    case 'link':
      return () => <Icons.link />;
  }
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, ...props }, ref) => {
    return (
      <div className={cn('relative', className)}>
        <input
          type={type}
          className={cn(
            icon ? 'pl-9' : 'pl-3',
            'flex h-10 w-full rounded-md text-gray-900 border border-gray-300 dark:bg-slate-900 dark:text-slate-100 border-slate-700 bg-white pr-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:shadow-active focus-visible:outline-none focus-visible:border-primary-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium ',
            error ? 'border-red-500' : ''
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {getIconsFromName(icon)()}
          </div>
        )}
        {error && (
          <p className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 text-body-sm">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
