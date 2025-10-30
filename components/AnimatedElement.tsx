import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

type AnimationType = 'up' | 'fade';

// FIX: Converted to a generic polymorphic component to correctly handle and pass through props
// for different component types provided via the 'as' prop (e.g., 'to' for react-router-dom's Link).
// This resolves the error where props like 'to' were not recognized.
type AnimatedElementProps<C extends React.ElementType> = {
  as?: C;
  children: React.ReactNode;
  delay?: number;
  animation?: AnimationType;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<C>, 'as' | 'children' | 'delay' | 'animation' | 'className'>;


const AnimatedElement = <C extends React.ElementType = 'div'>({
  children,
  delay = 0,
  animation = 'up',
  className = '',
  as,
  ...rest
}: AnimatedElementProps<C>) => {
  const Component = as || 'div';
  const [ref, isIntersecting] = useIntersectionObserver();

  const animationClasses = {
    up: 'transform transition-all duration-700 ease-out',
    fade: 'transition-opacity duration-700 ease-out',
  };

  const initialStyles = {
    up: 'translate-y-8 opacity-0',
    fade: 'opacity-0',
  };

  const finalStyles = {
    up: 'translate-y-0 opacity-100',
    fade: 'opacity-100',
  };

  const delayClasses: { [key: number]: string } = {
    0: 'delay-0',
    1: 'delay-100',
    2: 'delay-200',
    3: 'delay-300',
    4: 'delay-500',
  };

  return (
    <Component
      ref={ref}
      className={`${animationClasses[animation]} ${delayClasses[delay] || ''} ${isIntersecting ? finalStyles[animation] : initialStyles[animation]} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default React.memo(AnimatedElement);
