import { GLSL, Node, Shaders } from "gl-react";
import { Surface } from "gl-react-dom";
import React, { Component, useCallback, useEffect, useState } from "react";

// in gl-react you need to statically define "shaders":
const shaders = Shaders.create({
  helloGL: {
    frag: GLSL`
      precision highp float;

      // uniform vec2 resolution;
      uniform float time;
      varying vec2 uv;

      #define clock time/1000.
      #define ttime floor(time / 1000.) + pow(fract(time / 1000.),sin(time*1.333/1000.)*.005)

      void main() {
      vec2 uuv = uv;
      uuv.x += tan(abs(uuv.x)*5.);
      
      float d = fract(10.*uuv.x+clock);
      d = smoothstep(0.2,0.10,d);
      
      float p = tan(uuv.x+time);
      vec3 col = mix(vec3(0.1,0.1,0.1),vec3(p*0.1+step(.1,abs(cos(time*2.))*uuv.x),p*0.9,0.1+step(1.,sin(time)*sin(time)*abs(uv.x))),d);
      
      gl_FragColor = vec4(col,d*sin(ttime+1.-floor(length(floor(uv*10.)))));
    }`,
  },
  testGL: {
    frag: GLSL`
      precision highp float;

    
      varying vec2 uv;
      
      void main() {
        gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
      }
    `,
  },
});

type GLSLCanvasProps = {
  containerClass?: string;
};

export const GLSLCanvas: React.FC<GLSLCanvasProps> = ({ containerClass }) => {
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState<number>(0);

  const getContainerSize = useCallback((container: HTMLDivElement) => {
    const rect = container.getBoundingClientRect();
    setContainerRect(rect);
  }, []);

  const containerRef = useCallback((container: HTMLDivElement | null) => {
    if (container) {
      window.addEventListener("resize", () => getContainerSize(container));
      getContainerSize(container);
    }
  }, []);

  // Setup timing uniform
  useEffect(() => {
    const loop = (time: number) => {
      requestAnimationFrame(loop);
      setTime(time);
    };
    requestAnimationFrame(loop);
  }, []);

  return (
    <>
      <div className={containerClass} ref={containerRef}>
        {containerRect && (
          <Surface width={containerRect.width} height={containerRect.height}>
            <Node
              shader={shaders.helloGL}
              uniforms={{
                time,
                // resolution: [containerRect.width, containerRect.height],
              }}
              onDraw={() => {
                if (loading) {
                  setLoading(false);
                }
              }}
            />
          </Surface>
        )}
      </div>
    </>
  );
};
