import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Suspense } from "react";
import Room from "./components/Room";

function App() {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight intensity={1} position={[10, 10, 10]} />
          <Room />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
