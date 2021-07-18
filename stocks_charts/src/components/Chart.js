import React , {Component } from 'react' ; 
import {Bar} from 'react-chartjs-2' ; 

class Chart extends Component {
    constructor(props) {
        super(props) ; 
        this.state = {
            chartData : {
                labels : ["FaceBook" , 'Google' , "Microsoft" ]  , 
                datasets : [
                    {
                        label : "Stock Prices" , 
                        data : [ parseFloat( props.name.FB) ,  parseFloat( props.name.G) ,parseFloat( props.name.M) ] , 
                        backgroundColor : [
                            "blue" , "pink" , "red"
                        ] 
                    }
                ]
            }
        }
    }
    render(){
        return (
            < div class="chart">
                <Bar data = {this.state.chartData} />
            </div>
        )
    }
}

export default Chart ; 