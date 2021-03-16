import React, {Component} from 'react';
import { Canvas } from 'react-three-fiber'
import { OrbitControls, Stars } from 'drei'

class Audio3DVisualiser extends Component {
    constructor(props){
      super(props);
    }

    render(){
      const { audioData } = this.props;

      let low = (audioData[20] / 128.0);
      let med = (audioData[500] / 128.0);
      let hi = (audioData[1000] / 128.0);

      return <Canvas style={{background:"black"}}>
          <OrbitControls />
          <Stars />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} angle={0.3} />
          <mesh position={[-2,0,0]} scale={[1, low, 1]}>
            <boxBufferGeometry attach="geometry" />
            <meshBasicMaterial attach="material" color="red" opacity={1} transparent />
          </mesh>
          <mesh position={[0,0,0]} scale={[1, med, 1]}>
            <boxBufferGeometry attach="geometry" />
            <meshBasicMaterial attach="material" color="orange" opacity={1} transparent />
          </mesh>
          <mesh position={[2,0,0]} scale={[1, hi, 1]}>
            <boxBufferGeometry attach="geometry" />
            <meshBasicMaterial attach="material" color="blue" opacity={1} transparent />
          </mesh>
      </Canvas>
    }
}


export default Audio3DVisualiser;
