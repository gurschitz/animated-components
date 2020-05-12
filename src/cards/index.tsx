import * as React from 'react';
import { useSpring, animated as a } from 'react-spring';
import { useMeasure, usePrevious } from '../hooks';
import styled from 'styled-components';

const { useState } = React;

type CardButtonType = {
  className?: string;
  isOpen: boolean;
};

function CardButton({ className, isOpen }: CardButtonType) {
  const { height, transform, pathA, pathB } = useSpring({
    height: isOpen ? 22 : 12,
    transform: isOpen ? 'rotateZ(90deg)' : 'rotateZ(0deg)',
    pathA: isOpen ? 'M1 1 L21 21' : 'M1 1 L11 11',
    pathB: isOpen ? 'M21 1 L1 21' : 'M21 1 11 11',
  });

  return (
    <a.svg
      width="22"
      style={{ height, transform }}
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <a.path
        d={pathA}
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <a.path
        d={pathB}
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </a.svg>
  );
}

const Content = styled(a.div)`
  will-change: transform, opacity, height;
  overflow: hidden;
`;

type CardType = {
  header: JSX.Element;
  className?: string;
  children?: JSX.Element;
  content?: JSX.Element;
};

export function Card({ className, children, content, header }: CardType) {
  const [isOpen, setIsOpen] = useState(false);
  const previous = usePrevious(isOpen);

  const [bind, { height: viewHeight }] = useMeasure<HTMLDivElement>();

  const { height } = useSpring({
    from: { height: 0 },
    to: { height: isOpen ? viewHeight : 0 },
  });

  const isAuto = isOpen && previous === isOpen;
  return (
    <div className={`${className} rounded-lg shadow`}>
      <div className="px-6 py-4">
        <button
          className="focus:outline-none flex justify-between items-center w-full"
          onClick={() => setIsOpen(o => !o)}
        >
          {title}

          <CardButton isOpen={isOpen} />
        </button>
      </div>
      <Content
        style={{
          height: isAuto ? 'auto' : height,
        }}
      >
        <a.div {...bind}>{content ? content : children}</a.div>
      </Content>
      {content ? children : null}
    </div>
  );
}

export default function Cards() {
  const cardA = <div className="px-6 py-4">Content of Card A</div>;
  const cardB = <div className="px-6 py-4">Content of Card B</div>;
  const cardC = <div className="px-6 py-4">Content of Card C</div>;
  return (
    <div className="h-full w-full flex justify-center items-center bg-gray-300">
      <div className="max-w-lg w-full shadow-lg">
        <Card
          className="bg-blue-600 text-white"
          header={<h1 className="text-2xl font-bold">Card A</h1>}
          content={cardA}
        >
          <Card
            header={<h1 className="text-2xl font-bold">Card B</h1>}
            className="bg-white text-gray-900"
            content={cardB}
          >
            <Card
              header={<h1 className="text-2xl font-bold">Card C</h1>}
              className="bg-yellow-300 text-gray-900"
              content={cardC}
            />
          </Card>
        </Card>
      </div>
    </div>
  );
}
