"use client";
import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, PerspectiveCamera, MeshReflectorMaterial, useGLTF, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { sounds } from "@/utils/sounds";

const MODEL_URL = "/ferrari.glb";
// Self-hosted, Draco-compressed model — second arg enables the Draco decoder.
// Guard with a window check so the preload fetch never runs during the server build.
if (typeof window !== "undefined") {
  useGLTF.preload(MODEL_URL, true);
}

function CarModel({ color }: { color: string }) {
  const { scene } = useGLTF(MODEL_URL, true);

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

function ModelLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-primary" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Loading model</span>
      </div>
    </Html>
  );
}

const trims = [
  { name: "GT Coupe", desc: "3.9L V8 · 620 hp", price: 240000 },
  { name: "GT Sport", desc: "Sport package · 710 hp", price: 285000 },
  { name: "GT Track", desc: "Track aero · 800 hp", price: 330000 },
];

const colors = [
  { name: "Neon Yellow", value: "#E6FF00" },
  { name: "Inferno Red", value: "#FF2D00" },
  { name: "Stealth Black", value: "#1A1A1A" },
  { name: "Liquid Silver", value: "#E0E0E0" },
];

const interiors = [
  { name: "Carbon Black", value: "#141414", price: 0 },
  { name: "Tan Nappa", value: "#b08d57", price: 4500 },
  { name: "Racing Red", value: "#7a1f1f", price: 3800 },
  { name: "Ivory White", value: "#e8e4da", price: 5200 },
];

const steps = ["Vehicle", "Paint", "Interior", "Summary"];

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function CarConfigurator() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTrim, setSelectedTrim] = useState(trims[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedInterior, setSelectedInterior] = useState(interiors[0]);
  const [confirmed, setConfirmed] = useState(false);

  const total = selectedTrim.price + selectedInterior.price;

  const nextStep = () => {
    sounds.playClick();
    if (activeStep === steps.length - 1) {
      setConfirmed(true);
      return;
    }
    setActiveStep((s) => Math.min(steps.length - 1, s + 1));
  };

  const prevStep = () => {
    sounds.playClick();
    setActiveStep((s) => Math.max(0, s - 1));
  };

  const stepAnim = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#050505] text-white">
      {/* 3D Visualizer Side */}
      <div className="w-full lg:w-2/3 h-[50vh] lg:h-screen relative">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={50} />
          <Suspense fallback={<ModelLoader />}>
            <Stage environment="city" intensity={0.5} shadows="contact" adjustCamera={false}>
              <CarModel color={selectedColor.value} />
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
          <h1 className="text-2xl font-bold uppercase tracking-widest mb-2 font-sans">Kara Configurator</h1>
          <div className="flex gap-2">
            {steps.map((step, i) => (
              <div key={step} className={`h-1 flex-1 transition-all ${i <= activeStep ? 'bg-primary' : 'bg-white/5'}`} />
            ))}
          </div>
          <p className="text-[10px] text-gray-500 uppercase mt-4 tracking-[0.2em]">Step {activeStep + 1}: {steps[activeStep]}</p>
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {/* STEP 0 — VEHICLE */}
            {activeStep === 0 && (
              <motion.div key="vehicle" {...stepAnim} className="space-y-6">
                <h3 className="text-lg font-bold uppercase tracking-wide">Choose Your Trim</h3>
                <div className="space-y-3">
                  {trims.map((t) => (
                    <button
                      key={t.name}
                      onMouseEnter={() => sounds.playHover()}
                      onClick={() => { setSelectedTrim(t); sounds.playClick(); }}
                      className={`w-full p-4 border text-left flex items-center justify-between transition-all ${selectedTrim.name === t.name ? 'border-primary bg-primary/5' : 'border-white/5 hover:border-white/20'}`}
                    >
                      <span>
                        <span className="block text-sm font-bold uppercase tracking-wide">{t.name}</span>
                        <span className="block text-[10px] uppercase tracking-widest text-gray-500 mt-1">{t.desc}</span>
                      </span>
                      <span className="text-xs font-bold text-primary">{fmt(t.price)}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 1 — PAINT */}
            {activeStep === 1 && (
              <motion.div key="paint" {...stepAnim} className="space-y-6">
                <h3 className="text-lg font-bold uppercase tracking-wide">Select Exterior Finish</h3>
                <div className="grid grid-cols-2 gap-4">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onMouseEnter={() => sounds.playHover()}
                      onClick={() => { setSelectedColor(c); sounds.playClick(); }}
                      className={`p-4 border transition-all text-left group ${selectedColor.value === c.value ? 'border-primary' : 'border-white/5 hover:border-white/20'}`}
                    >
                      <div className="w-full h-8 mb-2" style={{ backgroundColor: c.value }}></div>
                      <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 group-hover:opacity-100">{c.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2 — INTERIOR */}
            {activeStep === 2 && (
              <motion.div key="interior" {...stepAnim} className="space-y-6">
                <h3 className="text-lg font-bold uppercase tracking-wide">Select Interior</h3>
                <div className="grid grid-cols-2 gap-4">
                  {interiors.map((it) => (
                    <button
                      key={it.name}
                      onMouseEnter={() => sounds.playHover()}
                      onClick={() => { setSelectedInterior(it); sounds.playClick(); }}
                      className={`p-4 border transition-all text-left group ${selectedInterior.name === it.name ? 'border-primary' : 'border-white/5 hover:border-white/20'}`}
                    >
                      <div className="w-full h-8 mb-2 rounded-sm" style={{ backgroundColor: it.value }}></div>
                      <span className="block text-[10px] uppercase font-bold tracking-widest opacity-60 group-hover:opacity-100">{it.name}</span>
                      <span className="block text-[10px] text-primary mt-1">{it.price === 0 ? "Included" : `+ ${fmt(it.price)}`}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3 — SUMMARY */}
            {activeStep === 3 && (
              <motion.div key="summary" {...stepAnim} className="space-y-5">
                <h3 className="text-lg font-bold uppercase tracking-wide">Your Build</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500 uppercase text-[10px] tracking-widest">Trim</span>
                    <span className="font-bold">{selectedTrim.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500 uppercase text-[10px] tracking-widest">Paint</span>
                    <span className="font-bold flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: selectedColor.value }} />
                      {selectedColor.name}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500 uppercase text-[10px] tracking-widest">Interior</span>
                    <span className="font-bold flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: selectedInterior.value }} />
                      {selectedInterior.name}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 text-base">
                    <span className="uppercase text-[11px] tracking-widest font-bold">Total</span>
                    <span className="font-bold text-primary">{fmt(total)}</span>
                  </div>
                </div>

                {confirmed && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 border border-primary/40 bg-primary/5 p-4 text-center"
                  >
                    <p className="text-primary text-xs font-bold uppercase tracking-widest">Build Reserved ✓</p>
                    <p className="text-gray-400 text-[11px] mt-1">Our concierge will contact you shortly.</p>
                  </motion.div>
                )}
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
            disabled={confirmed}
            className="text-[10px] font-bold uppercase tracking-widest px-8 py-3 bg-primary text-black hover:brightness-110 transition-all font-sans disabled:opacity-40"
          >
            {activeStep === steps.length - 1 ? (confirmed ? 'Reserved' : 'Confirm Build') : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
