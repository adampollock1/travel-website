import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-coral-500 text-white hover:bg-coral-600 shadow-md hover:shadow-lg',
  secondary: 'bg-ocean-800 text-white hover:bg-ocean-700 shadow-md hover:shadow-lg',
  outline: 'border-2 border-ocean-800 text-ocean-800 hover:bg-ocean-800 hover:text-white',
  ghost: 'text-ocean-800 hover:bg-ocean-100',
  white: 'bg-white text-ocean-800 hover:bg-sand-100 shadow-md',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  icon: 'p-3',
};

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  disabled = false,
  as = 'button',
  ...props
}, ref) => {
  const Component = motion[as] || motion.button;
  
  return (
    <Component
      ref={ref}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-xl
        transition-colors duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-5 w-5\" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
