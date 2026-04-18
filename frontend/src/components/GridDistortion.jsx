import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const GridPlane = () => {
  const meshRef = useRef();
  const { viewport } = useThree();
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const smoothMouseRef = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(0, 0) },
    uGridSize: { value: 30.0 },
    uColor: { value: new THREE.Color('#f0f0f0') }
  }), []);

  useFrame((state) => {
    const { clock, mouse, size } = state;
    uniforms.uTime.value = clock.getElapsedTime();
    
    // Convert R3F mouse (-1 to 1) to shader coordinates (0 to 1)
    mouseRef.current.set((mouse.x + 1) / 2, (mouse.y + 1) / 2);
    
    // Smooth easing
    smoothMouseRef.current.lerp(mouseRef.current, 0.08);
    uniforms.uMouse.value.copy(smoothMouseRef.current);
    uniforms.uResolution.value.set(size.width, size.height);
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform float uGridSize;
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      float aspect = uResolution.x / uResolution.y;
      
      // Aspect correction for mouse distance
      vec2 mouse = uMouse;
      vec2 diff = (uv - mouse);
      diff.x *= aspect;
      
      float dist = length(diff);
      
      // Liquid bulge distortion
      float radius = 0.4;
      float strength = 0.5;
      float distortion = 1.0 + strength * exp(-pow(dist / radius, 2.0));
      
      vec2 distortedUv = (uv - mouse) / distortion + mouse;
      
      // Grid logic
      vec2 gridUv = distortedUv * uGridSize;
      gridUv.x *= aspect;
      
      vec2 grid = abs(fract(gridUv - 0.5) - 0.5) / fwidth(gridUv);
      float line = min(grid.x, grid.y);
      float alpha = 1.0 - smoothstep(0.0, 1.0, line);
      
      // Faint gray color
      vec3 finalColor = mix(vec3(1.0), vec3(0.85, 0.85, 0.88), alpha * 0.4);
      
      // Vignette to fade at edges
      float edgeFade = smoothstep(0.0, 0.2, uv.x) * smoothstep(1.0, 0.8, uv.x) *
                       smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.8, uv.y);
      
      gl_FragColor = vec4(finalColor, edgeFade * 0.15);
    }
  `;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};

const GridDistortion = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <GridPlane />
      </Canvas>
    </div>
  );
};

export default GridDistortion;
