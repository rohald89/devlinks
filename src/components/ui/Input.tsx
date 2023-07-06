import * as React from 'react';

import { cn } from '@/lib/utils';
import { Icons } from '../Icons';

type Icons = 'mail' | 'lock' | 'link';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: Icons;
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
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            icon ? 'pl-9' : 'pl-3',
            'flex h-10 w-full rounded-md border border-input bg-background pr-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {getIconsFromName(icon)()}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
