import React, {Component} from 'react';
import AudioVisualiser from "./AudioVisualiser";
import Audio3DVisualiser from "./Audio3DVisualiser";
import AudioChart from "./AudioChart";

class AudioAnalyser extends Component {

  constructor(props){
    super(props);
    this.state = {
      audioData: new Uint8Array(0),
      visualiser_type: "rt_line"
    };
    this.tick = this.tick.bind(this);

    this.visualisationChange= this.visualisationChange.bind(this);
  }

  componentDidMount(){
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();


    //gain node
    // this.gainNode = audioContext.createGain();


    //analyser node
    this.analyser = this.audioContext.createAnalyser();
    // this.analyser.fftSize = 2048;
    // this.analyser.fftSize = 128;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);


    // this.gainNode.connect(this.audioContext.destination);

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

    // this.gainNode.gain.setValueAtTime(2, this.audioContext.currentTime);


    //one more time!
    this.rafId = requestAnimationFrame(this.tick);
  }

  visualisationChange(event){
    this.setState({visualiser_type: event.target.value});
  }

  render(){
    return <div onChange={this.visualisationChange} style={{height:"96vh"}}>
            <select className="uk-select uk-width-1-3" name="visType" id="visType">
              <option value="rt_line">Line (Realtime)</option>
              <option value="rt_3d">3D (Realtime)</option>
              <option value="graph_2d">Graph (Analyse)</option>
            </select>
          <br/>
      {

        (this.state.visualiser_type === "rt_line") && <AudioVisualiser audioData={this.state.audioData} />
        ||
        (this.state.visualiser_type === "rt_3d") && <Audio3DVisualiser audioData={this.state.audioData} />
        ||
        // (this.state.visualiser_type === "graph_2d") && <AudioChart audioData={this.state.audioData} />
        (this.state.visualiser_type === "graph_2d") && <div> work in progress</div>

    }
    </div>;
  }
}

export default AudioAnalyser;
