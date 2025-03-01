import React from 'react';

type LoadingSize = 'sm' | 'md' | 'lg';
type LoadingVariant = 'default' | 'primary' | 'secondary';

interface LoadingProps {
  /** Size of the loading indicator */
  size?: LoadingSize;
  /** Visual style variant */
  variant?: LoadingVariant;
  /** Text to display below the loading spinner */
  text?: string;
  /** Whether the loading indicator should take up the full container */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Loading component displays a spinner with optional text to indicate a loading state.
 * 
 * @example
 * ```tsx
 * // Simple usage
 * <Loading />
 * 
 * // With custom text and size
 * <Loading text="Loading posts..." size="lg" variant="primary" />
 * 
 * // As a full container
 * <Loading fullWidth />
 * ```
 */
const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'default',
  text,
  fullWidth = false,
  className = '',
}) => {
  // Size mappings
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  // Variant mappings
  const variantClasses = {
    default: 'border-slate-300 border-t-slate-600',
    primary: 'border-blue-300 border-t-blue-600',
    secondary: 'border-purple-300 border-t-purple-600',
  };

  // Container classes
  const containerClasses = fullWidth
    ? 'flex min-h-[200px] flex-col items-center justify-center w-full'
    : 'flex flex-col items-center';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${variantClasses[variant]}`}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className="mt-4 text-sm text-slate-600">
          {text}
        </p>
      )}
      <span className="sr-only">Loading</span>
    </div>
  );
};

/**
 * A full-page loading component that centers the spinner in the viewport
 */
export const FullPageLoading: React.FC<Omit<LoadingProps, 'fullWidth'>> = (props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <Loading {...props} size="lg" />
    </div>
  );
};

export default Loading;