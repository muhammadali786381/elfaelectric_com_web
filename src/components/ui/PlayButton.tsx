"use client";

import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface PlayButtonProps {
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export default function PlayButton({ onClick, className, icon }: PlayButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={(e) => {
        if (onClick) {
          e.stopPropagation();
          onClick();
        }
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative flex h-16 w-16 items-center justify-center rounded-full",
        "bg-white/20 backdrop-blur-sm",
        "transition-all duration-300 hover:scale-110 hover:bg-white/30",
        className
      )}
    >
      <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full">
        {icon || <FaPlay className="h-6 w-6 fill-white text-white ml-1" />}
      </div>
    </motion.button>
  );
}
