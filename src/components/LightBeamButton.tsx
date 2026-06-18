import React from 'react';
import { Link } from 'react-router-dom';
import './styles/LightBeamButton.css';

export interface LightBeamButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  gradientColors?: [string, string, string];
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
}

export function LightBeamButton({ 
  children, 
  className = "", 
  onClick,
  gradientColors = ["#8b5cf6", "#06b6d4", "#8b5cf6"],
  href,
  to,
  target,
  rel,
  ...props 
}: LightBeamButtonProps) {
  const gradientString = `conic-gradient(from var(--gradient-angle), transparent 0%, ${gradientColors[0]} 40%, ${gradientColors[1]} 50%, transparent 60%, transparent 100%)`;

  const commonProps = {
    className: `light-beam-button ${className}`,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick: onClick as any,
  };

  const buttonId = React.useId().replace(/:/g, "");

  const content = (
    <>
      <style>
        {`
          .light-beam-border-${buttonId} {
            --gradient-angle: 0deg;
            background: ${gradientString};
          }
        `}
      </style>
      <span className="light-beam-content">{children}</span>
      <div 
        className={`light-beam-border light-beam-border-${buttonId}`}
      />
      <div className="light-beam-inner" />
      <div className="light-beam-shine" />
    </>
  );

  if (to) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <Link to={to} {...commonProps} {...(props as any)}>{content}</Link>;
  }
  if (href) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <a href={href} target={target} rel={rel} {...commonProps} {...(props as any)}>{content}</a>;
  }
  return (
    <button {...commonProps} {...props}>
      {content}
    </button>
  );
}

export default LightBeamButton;
