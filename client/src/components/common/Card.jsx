import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Card = forwardRef(({
  children,
  className = '',
  hover = true,
  padding = 'md',
  ...props
}, ref) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      ref={ref}
      className={`
        bg-white rounded-2xl shadow-card overflow-hidden
        ${hover ? 'hover:shadow-card-hover transition-shadow duration-300' : ''}
        ${paddingClasses[padding]}
        ${className}
      `}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

export default Card;
