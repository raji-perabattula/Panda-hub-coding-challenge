"use client";

import { BsThreeDots } from "react-icons/bs";

interface SidebarItemProps {
  color: string;         // Tailwind color for dot
  label: string;         // Text label
  isActive?: boolean;    // Whether it's the active item
  onClick: () => void;   // Click handler
}

export default function SidebarItem({
  color,
  label,
  isActive = false,
  onClick,
}: SidebarItemProps) {
  return (
    <a
      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors
        ${isActive ? "bg-[rgba(80,48,229,0.08)]" : "hover:bg-gray-100"}`}
      onClick={onClick}
    >
      <span className="flex items-center gap-5">
        <span className={`h-2 w-2 rounded-full ${color}`}></span>
        <span className="text-medium">{label}</span>
      </span>
      {isActive && <BsThreeDots />}
    </a>
  );
}
