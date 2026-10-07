"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export default function SmoothFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // Check if we are hovering over an interactive element or a child of one
    if (
      target.closest('a') ||
      target.closest('button') ||
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('select') ||
      target.closest('[role="button"]') ||
      target.closest('[data-hover="true"]')
    ) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    // Hide default cursor globally when this component mounts
    document.documentElement.classList.add("hide-cursor");

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.documentElement.classList.remove("hide-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut]);

  if (typeof window === "undefined" || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Outer glow */}
      <motion.div
        className="absolute rounded-full mix-blend-screen pointer-events-none"
        style={{
          width: 60,
          height: 60,
          backgroundColor: "rgba(0, 179, 89, 0.3)",
          filter: "blur(15px)",
        }}
        animate={{
          x: position.x - 30,
          y: position.y - 30,
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 150,
          mass: 1,
        }}
      />

      {/* Trailing circle */}
      <motion.div
        className="absolute rounded-full border border-[#00b359] pointer-events-none"
        style={{
          width: 40,
          height: 40,
          borderWidth: isHovering ? "3px" : "2px",
          borderColor: isHovering ? "#00e573" : "#00b359",
        }}
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.8,
        }}
      />

      {/* Main cursor dot (reduced size) */}
      <motion.div
        className="absolute rounded-full bg-[#00b359] pointer-events-none"
        style={{
          width: 6, // Reduced size
          height: 6, // Reduced size
          boxShadow: "0 0 10px #00b359, 0 0 20px #00b359",
        }}
        animate={{
          x: position.x - 3, // Half of 6
          y: position.y - 3, // Half of 6
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 400,
          mass: 0.5,
        }}
      />
    </div>
  );
}
