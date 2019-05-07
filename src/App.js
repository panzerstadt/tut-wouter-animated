import * as THREE from "three";
import React from "react";
import { Canvas } from "react-three-fiber";
import { Link } from "wouter";
import Person from "./components/Person";
import Name from "./components/Name";
import { names } from "./resources/index";
import "./App.css";

const App = () => {
  return (
    <div class="main">
      <Name />
      <Canvas
        camera={{
          fov: 100,
          position: [0, 0, 500],
          rotation: [0, THREE.Math.degToRad(15), THREE.Math.degToRad(180)],
          near: 0.1,
          far: 20000
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.5} position={[300, 300, 4000]} />
        <Person />
      </Canvas>
      <a
        href="https://github.com/drcmda/react-three-fiber"
        class="top-left"
        children="Github"
      />
      <span class="top-right">
        {names.map(person => (
          <Link key={person} to={`/person/${person}`}>
            {person}
          </Link>
        ))}
      </span>
      <a
        href="https://www.instagram.com/tina.henschel/"
        class="bottom-left"
        children="Illustrations / Tina Henschel"
        target="_blank"
        rel="noreferrer noopener"
      />
    </div>
  );
};

export default App;
