
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value !== '');
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value !== '');
    props.onChange?.(e);
  };

  const isFloating = isFocused || hasValue || props.value;

  return (
    <div className="relative">
      <input
        {...props}
        className={cn(
          "peer w-full px-4 py-4 border-2 rounded-lg bg-white transition-all duration-300 focus:outline-none text-black placeholder-transparent",
          isFocused 
            ? "border-cyan-400 shadow-cyan-200"
            : "border-gray-300 hover:border-cyan-200",
          className
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={label}
      />
      <label
        className={cn(
          "absolute left-4 px-1 transition-all duration-300 pointer-events-none bg-white",
          isFloating
            ? "-top-2.5 text-sm text-cyan-400 font-semibold"
            : "top-4 text-base text-gray-500 font-medium"
        )}
        style={{
          // Animation for floating label
          transition: 'all 0.2s cubic-bezier(.88,-0.41,.19,1.3)'
        }}
      >
        {label}
      </label>
    </div>
  );
};
