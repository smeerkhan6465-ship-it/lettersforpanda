import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react';

interface AnimatedTextProps {
  text: string;
  delay?: number; // ms initial delay
  speed?: number; // ms per character
  className?: string;
  onComplete?: () => void;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 200,
  speed = 20,
  className = '',
  onComplete,
  as: Component = 'div',
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const hasTriggeredRef = useRef(false);

  // Keep latest onComplete ref without causing effect re-triggers
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Split text into paragraphs by newline to preserve natural formatting and line breaks
  const paragraphs = useMemo(() => {
    return text.split('\n');
  }, [text]);

  // Compute total character steps and the exact step index of the final character
  const { totalSteps, lastCharStepIndex } = useMemo(() => {
    let steps = 0;
    let lastCharIdx = -1;
    paragraphs.forEach((paragraph) => {
      if (!paragraph.trim()) return;
      const words = paragraph.split(' ');
      words.forEach((word, wIdx) => {
        const chars = Array.from(word);
        chars.forEach(() => {
          lastCharIdx = steps;
          steps++;
        });
        if (wIdx < words.length - 1) {
          steps++; // space step
        }
      });
    });
    return { totalSteps: steps, lastCharStepIndex: lastCharIdx };
  }, [paragraphs]);

  // Fire onComplete exactly once
  const triggerComplete = useCallback(() => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    onCompleteRef.current?.();
  }, []);

  // Listener for the native CSS animationend event on the very final character
  const handleFinalCharAnimationEnd = useCallback(
    (e: React.AnimationEvent) => {
      if (e.animationName === 'letterFadeIn') {
        // Smoothly wait 400ms after final character animation finishes before revealing buttons
        setTimeout(() => {
          triggerComplete();
        }, 400);
      }
    },
    [triggerComplete]
  );

  // Scheduled timer as synchronized completion trigger (and backup if animationend is missed)
  useEffect(() => {
    hasTriggeredRef.current = false;

    if (prefersReducedMotion) {
      triggerComplete();
      return;
    }

    // Delay of the final character + CSS animation duration (750ms) + 400ms smooth rest
    const lastCharStartMs = delay + Math.max(0, lastCharStepIndex) * speed;
    const totalTimeMs = lastCharStartMs + 750 + 400;

    const timer = setTimeout(() => {
      triggerComplete();
    }, totalTimeMs);

    return () => {
      clearTimeout(timer);
    };
  }, [text, delay, speed, prefersReducedMotion, lastCharStepIndex, triggerComplete]);

  if (prefersReducedMotion) {
    return (
      <Component className={className}>
        {paragraphs.map((p, pIdx) => (
          <span key={pIdx} className={pIdx > 0 ? 'block mt-4' : 'block'}>
            {p}
          </span>
        ))}
      </Component>
    );
  }

  let runningCharIndex = 0;

  return (
    <Component className={`${className} leading-[1.85]`} aria-label={text}>
      {paragraphs.map((paragraph, pIdx) => {
        if (!paragraph.trim()) {
          return <span key={pIdx} className="block h-4" aria-hidden="true" />;
        }

        // Split paragraph into words while preserving character clusters (including emojis)
        const words = paragraph.split(' ').map((word) => Array.from(word));

        return (
          <span key={pIdx} className={pIdx > 0 ? 'block mt-4' : 'block'}>
            {words.map((chars, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap">
                {chars.map((char, charIdx) => {
                  const currentStep = runningCharIndex;
                  const charDelay = delay + currentStep * speed;
                  const isFinalChar = currentStep === lastCharStepIndex;
                  runningCharIndex++;

                  return (
                    <span
                      key={charIdx}
                      className="inline-block opacity-0 animate-letter-fade"
                      style={{
                        animationDelay: `${charDelay}ms`,
                        animationFillMode: 'forwards',
                      }}
                      onAnimationEnd={isFinalChar ? handleFinalCharAnimationEnd : undefined}
                    >
                      {char}
                    </span>
                  );
                })}
                {/* Space after word if not the last word in paragraph */}
                {wordIdx < words.length - 1 && (
                  <span
                    className="inline-block opacity-0 animate-letter-fade"
                    style={{
                      animationDelay: `${delay + runningCharIndex++ * speed}ms`,
                      animationFillMode: 'forwards',
                    }}
                  >
                    &nbsp;
                  </span>
                )}
              </span>
            ))}
          </span>
        );
      })}
    </Component>
  );
};
