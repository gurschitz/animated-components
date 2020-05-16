import React, {
  useRef,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
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

const ScrollContext = React.createContext(0);

type CardType = {
  children?: React.ReactNode;
  className?: string;
};

function Card({ children, className }: CardType) {
  const scrollPosition = useContext(ScrollContext);
  const ref = useRef<HTMLDivElement>(null);
  const [animation, animate] = useSpring(() => ({
    opacity: 1,
    ratio: 1,
    totalRatio: 1,
    zIndex: 20,
  }));

  useEffect(() => {
    const offsetTop = ref.current?.offsetTop;
    const clientHeight = ref.current?.clientHeight;
    if (offsetTop && clientHeight && scrollPosition > 0) {
      const cardMinPos = Math.max(offsetTop - 50, 0);
      const cardMaxPos = clientHeight + cardMinPos;
      const cardHeight = cardMaxPos - cardMinPos;

      let ratio = 1;

      const distance = cardMaxPos - scrollPosition;
      if (distance < cardHeight) {
        ratio = Math.min(Math.max(distance / cardHeight, 0), cardMaxPos);
      }

      const zIndex = ratio < 1 ? 10 : 20;
      animate({
        opacity: ratio,
        zIndex,
        ratio,
      });
    } else {
      animate({
        opacity: 1,
        zIndex: 10,
        ratio: 1,
      });
    }
  }, [scrollPosition]);

  return (
    <a.div
      ref={ref}
      style={{
        position: 'relative',
        translateY: animation.ratio.interpolate({
          range: [1, 0],
          output: [0, 200],
        }),
        scale: animation.ratio.interpolate({
          range: [1, 0],
          output: [1, 0],
        }),
        ...animation,
      }}
      className={className}
    >
      {children}
    </a.div>
  );
}

export default function Example() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const onScroll = useCallback(event => {
    const container = event.target as HTMLDivElement;
    console.log(container.scrollTop);
    setScrollPosition(container.scrollTop);
  }, []);

  return (
    <ScrollContext.Provider value={scrollPosition}>
      <div className="h-full w-full flex justify-center items-center bg-gray-200">
        <div
          style={{ height: 400 }}
          onScroll={onScroll}
          className="relative border p-4 overflow-scroll space-y-5"
        >
          <Card className="shadow-lg bg-white p-4 rounded-lg text-dark w-64">
            <div>card</div>
            <div>card</div>
            <div>card</div>
            <div>card</div>
            <div>card</div>
          </Card>
          <Card className="shadow-lg bg-red-500 p-4 rounded-lg text-white w-64">
            <div>card</div>
            <div>card</div>
            <div>card</div>
            <div>card</div>
            <div>card</div>
          </Card>
          <Card className="shadow-lg bg-yellow-500 p-4 rounded-lg text-gray-900 w-64">
            <div>card</div>
            <div>card</div>
            <div>card</div>
            <div>card</div>
            <div>card</div>
          </Card>
          <Card className="shadow-lg bg-red-500 p-4 rounded-lg text-white w-64">
            <div>card</div>
            <div>card</div>
            <div>card</div>
            <div>card</div>
            <div>card</div>
          </Card>
          <Card className="shadow-lg bg-yellow-500 p-4 rounded-lg text-gray-900 w-64">
            <div>card</div>
            <div>card</div>
            <div>card</div>
            <div>card</div>
            <div>card</div>
          </Card>
          <Card className="shadow-lg bg-green-500 p-4 rounded-lg text-white w-64">
            <div>card</div>
            <div>card</div>
            <div>card</div>
            <div>card</div>
            <div>card</div>
          </Card>
        </div>
      </div>
    </ScrollContext.Provider>
  );
}
