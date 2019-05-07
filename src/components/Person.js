import * as THREE from "three";
import React, { useState, useEffect } from "react";
import { useTransition, a } from "react-spring/three";
import { useRoute } from "wouter";
import { names, deg, loaders } from "../resources/index";

export default function Person() {
  const [match, params] = useRoute("/person/:name");
  const index = match ? names.indexOf(params.name) : 0;
  const [shapes, setShapes] = useState([]);
  useEffect(() => void loaders[index].then(setShapes), [index]);

  const transitions = useTransition(shapes, item => item.shape.uuid, {
    from: { position: [-50, 0, 0], rotation: [0, -0.6, 0], opacity: 0 },
    enter: { position: [0, 0, 0], rotation: [0, 0.3, 0], opacity: 1 },
    leave: { position: [50, 0, 0], rotation: [0, 0.6, 0], opacity: 0 },
    order: ["leave", "enter", "update"],
    lazy: true,
    trail: 5,
    unique: true,
    reset: true
  });

  return (
    <a.group position={[500, -400, 0]} rotation={[0, deg(180), 0]}>
      {transitions.map(
        ({
          item: { shape, color, index },
          key,
          props: { opacity, position, rotation }
        }) => (
          <a.mesh
            key={key}
            rotation={rotation}
            position={position.interpolate((x, y, z) => [x, y, 0])}
          >
            <a.meshPhongMaterial
              attach="material"
              color={color}
              opacity={opacity}
              side={THREE.DoubleSide}
              depthWrite={false}
              transparent
            />
            <shapeBufferGeometry attach="geometry" args={[shape]} />
          </a.mesh>
        )
      )}
    </a.group>
  );
}
