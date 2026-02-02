import { motion } from 'framer-motion';

export const Skeleton = ({ className = '', ...props }) => (
  <motion.div
    className={`bg-gradient-to-r from-sand-200 via-sand-100 to-sand-200 bg-[length:200%_100%] rounded-lg ${className}`}
    animate={{
      backgroundPosition: ['200% 0', '-200% 0'],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    }}
    {...props}
  />
);

export const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-card overflow-hidden">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  </div>
);

export const SkeletonHotelDetail = () => (
  <div className="space-y-6">
    <Skeleton className="h-96 w-full rounded-2xl" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    </div>
  </div>
);

export default Skeleton;
