import React from 'react';
import Line from 'react-chartjs-2';

class AudioChart extends React.Component {
  constructor(props){
    super(props);
  }

  render(){

    const state = {
      labels: ['January', 'February', 'March',
               'April', 'May'],
      datasets: [
        {
          label: 'Rainfall',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: this.props.audioData
        }
      ]
    }

    return <div>
    <Line
    height={400}
    width={500}
    data={state}
    /> </div>
  }
}

export default AudioChart
