import React, { Component } from 'react';
import { Card,Row,Col  } from 'antd';
import { Line } from 'react-chartjs-2';




export default class TraineeStats extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.id,
            stats:this.props.stats,
            Scorelable:[],
            Scoredata:[]
        } 
    }
    
    componentWillMount(){
        console.log(this.state.stats)
        let scoreL = [];
        let scoreD = [];
        this.state.stats.forEach(element => {
            scoreD.push(element.score)
            scoreL.push(element.testid.title)
        });

        this.setState({
            Scorelable:scoreL,
            Scoredata:scoreD,
        })      
    

    }

    render() {
        const options = {
            responsive: true,
            plugins: {
              legend: {
                position: 'top'
              },
              title: {
                display: true,
                text: 'تحليل نتائج الإختبارات السابقة',
              },
            },
          };
          const data = {
            labels: this.state.Scorelable,
            datasets: [
              {
                label: 'نتيجة الإختبار',
                data: this.state.Scoredata,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.0)',
              },
              
            ],
          };
        
        return (
            <div>
                <Line options={options} data={data} />;
            </div>
        )
    }
}
