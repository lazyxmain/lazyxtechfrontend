import { type ReactNode } from 'react';
import { Magnetic } from './motion';

export function PrimaryButton({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  return (
    <Magnetic>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-lime-electric px-7 py-3.5 font-display text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] disabled:opacity-60 ${className}`}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </button>
    </Magnetic>
  );
}

export function GhostButton({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Magnetic>
      <button
        type="button"
        onClick={onClick}
        className={`group relative inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-display text-sm font-medium text-chalk transition-colors duration-300 hover:border-lime-electric/60 hover:text-lime-electric ${className}`}
      >
        {children}
      </button>
    </Magnetic>
  );
}
