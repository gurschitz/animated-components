import React from 'react';

type SpanTextProps = {
  children: string;
};

function SpanText({ children }: SpanTextProps) {
  return (
    <>
      {children.split('').map((c, i) => (
        <span key={i} className={c === ' ' ? `w-1` : ''}>
          {c}
        </span>
      ))}
    </>
  );
}

export default function Videotape() {
  return (
    <>
      <style>{`
        .triangle {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 80px 80px 80px 0;
          border-color: transparent #140919 transparent transparent;
        }

        .small-triangle {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 15px 20px 15px 0;
          border-color: transparent #63b3ed transparent transparent;
        }

        .bg-videotape-bottom {
          background-color: #f3f1e5;
        }

        .bg-videotape {
          background-color: #fefefe;
        }
      `}</style>
      <div
        style={{ maxWidth: 321, height: 600 }}
        className="bg-videotape shadow-lg rounded overflow-hidden mx-auto flex flex-col justify-between"
      >
        <div>
          <div
            style={{ fontSize: 37 }}
            className="pl-2 pr-3 font-bold pt-5 font-serif"
          >
            Gerald Urschitz
          </div>
          <div className="flex mb-1">
            <div className="flex-1 h-2 bg-blue-400"></div>
            <div className="flex-1 h-2 bg-green-400"></div>
            <div className="flex-1 h-2 bg-yellow-400"></div>
            <div className="flex-1 h-2 bg-orange-400"></div>
            <div className="flex-1 h-2 bg-pink-400"></div>
          </div>
          <div className="flex pr-3 items-center">
            <div className="flex-auto">
              <div className="pl-2 pr-3 uppercase text-2xl font-serif flex w-full justify-between">
                <SpanText>Frontend Engineer</SpanText>
              </div>
              <div className="text-xs pl-2 pr-3 uppercase flex justify-between">
                <SpanText>Experience with React & TypeScript</SpanText>
              </div>
            </div>
            <div className="small-triangle mb-4"></div>
          </div>

          <div className="pt-10 flex items-center">
            <div className="w-64">
              <div className="h-8 bg-blue-400"></div>
              <div className="h-8 bg-green-400"></div>
              <div className="h-8 bg-yellow-400"></div>
              <div className="h-8 bg-orange-400"></div>
              <div className="h-8 bg-pink-400"></div>

              <div className="flex mt-8">
                <div className="flex-1 h-2 bg-blue-400"></div>
                <div className="flex-1 h-2 bg-green-400"></div>
                <div className="flex-1 h-2 bg-yellow-400"></div>
                <div className="flex-1 h-2 bg-orange-400"></div>
                <div className="flex-1 h-2 bg-pink-400"></div>
              </div>

              <div className="text-right mt-5">
                <div>
                  I like to <span className="font-bold">build stuff</span>
                </div>
                <div className="pt-2">
                  I like to <span className="font-bold">be creative</span>
                </div>
              </div>
            </div>
            <div className="triangle ml-4"></div>
          </div>
        </div>

        <div className="relative flex justify-center py-1 bg-videotape-bottom">
          <div className="absolute left-0 bottom-0 p-2">
            <div
              style={{ paddingLeft: 3, paddingRight: 3 }}
              className="text-2xl font-serif border border-gray-900 leading-none"
            >
              VHS
            </div>
          </div>
          <div className="text-center">
            <div className="font-serif leading-none text-5xl">T-120</div>
            <div className="uppercase font-regular" style={{ fontSize: 6 }}>
              This is my way
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
