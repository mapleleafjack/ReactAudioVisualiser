import React, {Component} from 'react';
import AudioVisualiser from "./AudioVisualiser";
import Audio3DVisualiser from "./Audio3DVisualiser";

class AudioAnalyser extends Component {

  constructor(props){
    super(props);
    this.state = {
      audioData: new Uint8Array(0),
      visualiser_type: true
    };
    this.tick = this.tick.bind(this);

    this.buttonClick= this.buttonClick.bind(this);
  }

  componentDidMount(){
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    // this.analyser.fftSize = 2048;
    // this.analyser.fftSize = 128;
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

  buttonClick(event){
    this.setState({visualiser_type: !this.state.visualiser_type});
  }

  render(){
    return <div style={{height:"96vh"}}>
            <button onClick={this.buttonClick} className="uk-button uk-button-default"> Switch </button>
        <br/>


      {this.state.visualiser_type ? <AudioVisualiser audioData={this.state.audioData} /> : <Audio3DVisualiser audioData={this.state.audioData} />}
    </div>;
  }
}

export default AudioAnalyser;
