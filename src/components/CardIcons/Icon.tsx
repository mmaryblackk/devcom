import React from "react";

type IconProps = {
  children: React.ReactNode;
  className?: string;
};

export const Icon: React.FC<IconProps> = ({ children }) => (
  <div className="w-18">{children}</div>
);
