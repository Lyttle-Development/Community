import {
  SwitchTransition,
  Transition as TRGTransition,
} from 'react-transition-group';
import { gsap } from 'gsap';
import React from 'react';
import { useRouter } from 'next/router';

export interface TransitionProps {
  children: React.ReactNode;
}

// const TIMEOUT = 2000;
const TIMEOUT = 250;
const gsapDuration = TIMEOUT / 1000;

export function Transition({ children }: TransitionProps) {
  const router = useRouter();

  return (
    <SwitchTransition>
      <TRGTransition
        key={router.pathname}
        timeout={TIMEOUT}
        onEnter={(node: HTMLElement) => {
          gsap.set(node, { autoAlpha: 0 });
          gsap.to(node, {
            autoAlpha: 1,
            duration: gsapDuration * 3,
            delay: gsapDuration * 2,
          });
        }}
        onExit={(node: HTMLElement) => {
          gsap.to(node, { autoAlpha: 0, duration: gsapDuration });
        }}
      >
        {children}
      </TRGTransition>
    </SwitchTransition>
  );
}
