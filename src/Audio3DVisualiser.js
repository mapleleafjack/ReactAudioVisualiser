import React, {Component} from 'react';
import { Canvas } from 'react-three-fiber'

class Audio3DVisualiser extends Component {
    constructor(props){
      super(props);
      this.canvas = React.createRef();
    }

    render(){
      const { audioData } = this.props;




      return <Canvas>
        <Cube audioData={audioData}/>
      </Canvas>
    }
}

const Cube = (props) => {
  let low = (props.audioData[20] / 128.0);
  let med = (props.audioData[500] / 128.0);
  let hi = (props.audioData[500] / 128.0);

  return <mesh position={[0,0,0]} scale={[1,med,hi]}>
      <boxBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color="blue" opacity={0.5} transparent />
    </mesh>
}


export default Audio3DVisualiser;
