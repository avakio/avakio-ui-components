import React from 'react';

export const Select = ({ children, ...props }: any) => (
  <select {...props}>{children}</select>
);

export const SelectTrigger = ({ children, ...props }: any) => (
  <button {...props}>{children}</button>
);

export const SelectValue = ({ placeholder, ...props }: any) => (
  <span {...props}>{placeholder}</span>
);

export const SelectContent = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
);

export const SelectItem = ({ children, value, ...props }: any) => (
  <option value={value} {...props}>{children}</option>
);
