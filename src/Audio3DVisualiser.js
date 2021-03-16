import React, {Component} from 'react';
import { Canvas } from 'react-three-fiber'

class Audio3DVisualiser extends Component {
    constructor(props){
      super(props);
      this.canvas = React.createRef();
    }

    render(){
      const { audioData } = this.props;


      let low = (audioData[20] / 128.0);
      let med = (audioData[500] / 128.0);
      let hi = (audioData[1000] / 128.0);



      // let low_array = audioData.slice(0, 300);
      // let medium_array = audioData.slice(300, 700);
      // let high_array = audioData.slice(700, 1024);
      //
      // let low = low_array.reduce((a, b) => a + b, 0);
      // let avg_avg = ((low / low_array.length) || 0) / 128;
      //
      // let med = medium_array.reduce((a, b) => a + b, 0);
      // let med_avg = ((med / medium_array.length) || 0) / 128;
      //
      // let hi = high_array.reduce((a, b) => a + b, 0);
      // let hi_avg = ((hi / high_array.length) || 0) / 128;

      return <Canvas>
          <mesh position={[-2,0,0]} scale={[1, low, 1]}>
            <boxBufferGeometry attach="geometry" />
            <meshBasicMaterial attach="material" color="red" opacity={0.5} transparent />
          </mesh>
          <mesh position={[0,0,0]} scale={[1, med, 1]}>
            <boxBufferGeometry attach="geometry" />
            <meshBasicMaterial attach="material" color="orange" opacity={0.5} transparent />
          </mesh>
          <mesh position={[2,0,0]} scale={[1, hi, 1]}>
            <boxBufferGeometry attach="geometry" />
            <meshBasicMaterial attach="material" color="blue" opacity={0.5} transparent />
          </mesh>
      </Canvas>
    }
}


export default Audio3DVisualiser;
