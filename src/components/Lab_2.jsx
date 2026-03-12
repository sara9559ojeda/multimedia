import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { AdditiveBlending } from "three"

export default function Lab2({ count = 5000 }) {

  const materialRef = useRef()

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i++) {
      array[i] = (Math.random() - 0.5) * 4
    }

    return array
  }, [count])

  const sizes = useMemo(() => {
    const array = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      array[i] = Math.random()
    }

    return array
  }, [count])

  useFrame((state) => {
    materialRef.current.uniforms.uTime.value =
      state.clock.getElapsedTime()
  })

  return (
    <points>

      <bufferGeometry>

        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />

      </bufferGeometry>

      <shaderMaterial
        ref={materialRef}

        uniforms={{
          uTime: { value: 0 },
          uSize: { value: 40 }
        }}

        vertexShader={`
uniform float uTime;
uniform float uSize;

attribute float size;

varying float vHeight;

void main(){

    vec3 pos = position;

    pos.y = mod(position.y + uTime * 2.0, 4.0);

    float noise =
        sin(pos.y * 5.0 + uTime * 3.0) *
        cos(pos.x * 5.0 + uTime * 2.0);

    pos.x += noise * 0.3;
    pos.z += noise * 0.3;

    vHeight = pos.y;

    vec4 modelPosition =
        modelMatrix * vec4(pos,1.0);

    vec4 viewPosition =
        viewMatrix * modelPosition;

    gl_Position =
        projectionMatrix * viewPosition;

    gl_PointSize =
        size * uSize * (1.0 / -viewPosition.z);
}
`}

        fragmentShader={`
varying float vHeight;

void main(){

    float dist =
        distance(gl_PointCoord, vec2(0.5));

    float strength =
        1.0 - smoothstep(0.4,0.5,dist);

    vec3 bottom = vec3(1.0,0.2,0.0);
    vec3 middle = vec3(1.0,0.6,0.0);
    vec3 top = vec3(1.0,1.0,0.5);

    vec3 color =
        mix(bottom,middle,vHeight*0.3);

    color =
        mix(color,top,vHeight*0.7);

    gl_FragColor =
        vec4(color,strength);
}
`}

        transparent
        depthWrite={false}
        blending={AdditiveBlending}

      />

    </points>
  )
}
