import React from 'react';

import { cn } from "@/lib/utils"

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white rounded-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export default Card;



// import React from 'react';

// export const Card = ({ children, className = '', ...props }) => {
//   return (
//     <div 
//       className={`bg-white rounded-lg shadow-md ${className}`}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// };

// export const CardContent = ({ children, className = '', ...props }) => {
//   return (
//     <div 
//       className={`p-4 ${className}`}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// };

// export default Card;