"use client";
import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, PerspectiveCamera, MeshReflectorMaterial, useGLTF } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { sounds } from "@/utils/sounds";

function CarModel({ color }: { color: string }) {
  const { scene } = useGLTF("https://threejs.org/examples/models/gltf/ferrari.glb");

  useEffect(() => {
    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;

      const name = object.name.toLowerCase();
      const mats = Array.isArray(object.material) ? object.material : [object.material];
      const first = mats[0];
      const matName =
        first && "name" in first && typeof (first as THREE.Material).name === "string"
          ? (first as THREE.Material).name.toLowerCase()
          : "";

      if (
        name.includes("body") ||
        name.includes("paint") ||
        name.includes("exterior") ||
        matName.includes("body")
      ) {
        const base = Array.isArray(object.material) ? object.material[0] : object.material;
        if (!base || !("clone" in base)) return;
        const cloned = base.clone() as THREE.MeshStandardMaterial;
        cloned.color.set(color);
        cloned.roughness = 0.1;
        cloned.metalness = 0.8;
        object.material = cloned;
      }
    });
  }, [scene, color]);

  return (
    <primitive object={scene} scale={[1.8, 1.8, 1.8]} position={[0, -0.4, 0]} />
  );
}

const colors = [
  { name: "Neon Yellow", value: "#E6FF00" },
  { name: "Inferno Red", value: "#FF2D00" },
  { name: "Stealth Black", value: "#1A1A1A" },
  { name: "Liquid Silver", value: "#E0E0E0" },
];

const steps = ["Vehicle", "Paint", "Interior", "Summary"];

export default function CarConfigurator() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0].value);

  const nextStep = () => {
    sounds.playClick();
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    sounds.playClick();
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#050505] text-white">
      {/* 3D Visualizer Side */}
      <div className="w-full lg:w-2/3 h-[50vh] lg:h-screen relative">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={50} />
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5} shadows="contact" adjustCamera={false}>
              <CarModel color={selectedColor} />
            </Stage>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
              <planeGeometry args={[100, 100]} />
              <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={50}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#101010"
                metalness={0.5}
                mirror={0}
              />
            </mesh>
          </Suspense>
          <OrbitControls makeDefault enablePan={false} minDistance={4} maxDistance={10} maxPolarAngle={Math.PI / 2.1} />
        </Canvas>

        <div className="absolute top-8 left-8 z-10">
          <h2 className="text-3xl font-bold uppercase tracking-tighter italic">Preview Mode</h2>
          <p className="text-gray-500 text-xs tracking-widest uppercase">Drag to rotate • Scroll to zoom</p>
        </div>
      </div>

      {/* Configuration Controls Side */}
      <div className="w-full lg:w-1/3 bg-[#090909] border-l border-white/5 p-8 flex flex-col">
        <div className="mb-12">
          <h1 className="text-2xl font-bold uppercase tracking-widest mb-2 font-sans">KARA Configurator</h1>
          <div className="flex gap-2">
            {steps.map((step, i) => (
              <div key={step} className={`h-1 flex-1 transition-all ${i <= activeStep ? 'bg-primary' : 'bg-white/5'}`} />
            ))}
          </div>
          <p className="text-[10px] text-gray-500 uppercase mt-4 tracking-[0.2em]">Step {activeStep + 1}: {steps[activeStep]}</p>
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeStep === 1 ? (
              <motion.div
                key="paint"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-bold uppercase tracking-wide">Select Exterior Finish</h3>
                <div className="grid grid-cols-2 gap-4">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onMouseEnter={() => sounds.playHover()}
                      onClick={() => {
                        setSelectedColor(c.value);
                        sounds.playClick();
                      }}
                      className={`p-4 border transition-all text-left group ${selectedColor === c.value ? 'border-primary' : 'border-white/5 hover:border-white/20'}`}
                    >
                      <div className="w-full h-8 mb-2" style={{ backgroundColor: c.value }}></div>
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 group-hover:opacity-100">{c.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="py-12 text-center"
              >
                <p className="text-gray-500 text-sm">Configure your bespoke vehicle with precision engineering.</p>
                <div className="mt-8 p-12 border border-dashed border-white/5 rounded-xl">
                  <span className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">Additional Options Loading...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between pt-8 border-t border-white/5">
          <button
            onClick={prevStep}
            disabled={activeStep === 0}
            className="text-[10px] font-bold uppercase tracking-widest px-6 py-3 border border-white/10 hover:border-white transition-colors disabled:opacity-20"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            className="text-[10px] font-bold uppercase tracking-widest px-8 py-3 bg-primary text-black hover:brightness-110 transition-all font-sans"
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
