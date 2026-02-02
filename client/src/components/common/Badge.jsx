const variants = {
  primary: 'bg-coral-500 text-white',
  secondary: 'bg-ocean-800 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-amber-500 text-white',
  info: 'bg-blue-500 text-white',
  outline: 'border border-ocean-300 text-ocean-700 bg-white',
  subtle: 'bg-sand-200 text-ocean-700',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  return (
    <span
      className={`
        inline-flex items-center justify-center font-medium rounded-full
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
