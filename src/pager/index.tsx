import React, { useRef, useCallback, useContext } from 'react';
import { useSpring, animated as a, SpringValue } from 'react-spring';

type CalculateDegreeArgs = {
  direction: number;
  position: number;
  totalWidth: number;
  halfway: number;
  k: number;
};

function calculateDegree({
  position,
  totalWidth,
  direction,
  halfway,
  k,
}: CalculateDegreeArgs) {
  const x = direction > 0 ? position : totalWidth - position;
  const degree = halfway * k - Math.abs(halfway * k - x * k);
  return degree;
}

const PagerContext = React.createContext({ rotateY: new SpringValue('0deg') });

type PagerType = {
  className?: string;
  innerClassName?: string;
  children?: React.ReactNode;
};

export function Pager({ className, innerClassName, children }: PagerType) {
  const lastPositionRef = useRef(0);

  const [animation, animate] = useSpring(() => ({ rotateY: '0deg' }));
  const [containerAnimation, animateContainer] = useSpring(() => ({
    rotateY: '0deg',
  }));

  const onScroll = useCallback(event => {
    const lastPosition = lastPositionRef.current;
    const el = event.target as HTMLDivElement;
    const totalWidth = el.clientWidth;
    const position = el.scrollLeft % totalWidth;
    const direction = Math.sign(position - lastPosition);
    const halfway = el.clientWidth / 2;

    const degree = calculateDegree({
      k: 0.1,
      halfway,
      direction,
      position,
      totalWidth,
    });
    animate({ rotateY: `${degree * direction}deg` });

    const containerDegree = calculateDegree({
      k: 0.03,
      halfway,
      direction,
      position,
      totalWidth,
    });
    animateContainer({ rotateY: `${containerDegree * direction}deg` });

    lastPositionRef.current = position;
  }, []);

  return (
    <div className={className} style={{ perspective: 600 }}>
      <PagerContext.Provider value={animation}>
        <a.div
          className={innerClassName}
          onScroll={onScroll}
          style={{
            scrollSnapType: 'x mandatory',
            overflowY: 'auto',
            display: 'flex',
            perspective: 600,
            ...containerAnimation,
          }}
        >
          {children}
        </a.div>
      </PagerContext.Provider>
    </div>
  );
}

type SlideProps = {
  className?: string;
  children?: React.ReactNode;
};

function Slide({ className, children }: SlideProps) {
  const animation = useContext(PagerContext);
  return (
    <a.div className={className} style={animation}>
      {children}
    </a.div>
  );
}

Pager.Slide = Slide;

type SlideContainerProps = {
  className?: string;
  children?: React.ReactNode;
};

function SlideContainer({ className, children }: SlideContainerProps) {
  return (
    <div
      style={{ scrollSnapAlign: 'start' }}
      className={`w-full flex-shrink-0 ${className}`}
    >
      {children}
    </div>
  );
}

Pager.SlideContainer = SlideContainer;

export default function Example() {
  return (
    <div className="h-full w-full flex justify-center items-center bg-gray-200">
      <Pager
        className="w-full max-w-lg"
        innerClassName="bg-white rounded-lg h-64"
      >
        <SlideContainer className="p-8">
          <Slide className="rounded-lg p-5 h-full bg-green-600 text-white flex justify-center items-center text-5xl">
            Slide A
          </Slide>
        </SlideContainer>
        <SlideContainer className="p-8">
          <Slide className="rounded-lg p-5 h-full bg-blue-600 text-white flex justify-center items-center text-5xl">
            Slide B
          </Slide>
        </SlideContainer>
        <SlideContainer className="p-8">
          <Slide className="rounded-lg p-5 h-full bg-red-600 text-white flex justify-center items-center text-5xl">
            Slide C
          </Slide>
        </SlideContainer>
      </Pager>
    </div>
  );
}
