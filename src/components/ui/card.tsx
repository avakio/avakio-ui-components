import React from 'react';

export const Card = ({ children, className, ...props }: any) => (
  <div className={`border rounded-lg ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className, ...props }: any) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className, ...props }: any) => (
  <h3 className={`font-semibold ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className, ...props }: any) => (
  <p className={`text-sm text-gray-600 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className, ...props }: any) => (
  <div className={`p-4 pt-0 ${className}`} {...props}>
    {children}
  </div>
);
