import React, {Component} from 'react';
import AudioVisualiser from "./AudioVisualiser";

class AudioAnalyser extends Component {

  constructor(props){
    super(props);
    this.state = {audioData: new Uint8Array(0)};
    this.tick = this.tick.bind(this);
  }

  componentDidMount(){
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);

    //start animation
    this.rafId = requestAnimationFrame(this.tick)
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  tick(){
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({audioData: this.dataArray});

    //one more time!
    this.rafId = requestAnimationFrame(this.tick);
  }

  render(){
    return <AudioVisualiser audioData={this.state.audioData} />;
  }
}

export default AudioAnalyser;
