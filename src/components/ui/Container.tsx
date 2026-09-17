import { type ReactNode } from "react";

const sizeClasses = {
  default: "max-w-7xl",
  wide: "max-w-[1400px]",
  narrow: "max-w-3xl",
} as const;

type ContainerProps = {
  children: ReactNode;
  size?: keyof typeof sizeClasses;
  className?: string;
};

export default function Container({ children, size = "default", className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}
