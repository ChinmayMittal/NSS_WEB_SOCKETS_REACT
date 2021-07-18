import React, { useEffect , useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from "./components/Chart" ; 
import socketClient  from "socket.io-client";
import {Bar} from 'react-chartjs-2' ; 
const SERVER = "ws://127.0.0.1:3000";

function App() {

  const [data , setData ] = useState({
    FB : "100.20" , 
    G : "200.50" , 
    M  : "150.50"
  }) ; 
  var socket = socketClient(SERVER ,  {
    transports: ['websocket', 'polling']
  }) ; 
    socket.on('connect', () => {
      console.log(`I'm connected with the back-end`);
  });
  useEffect(() => {
    socket.on('stock', stock_data => {
      console.log(stock_data) ; 
      setData({
        FB : stock_data.FB , 
        G : stock_data.G , 
        M : stock_data.M 
      }) ; 
    });
  });

  return (
      // <Chart name={data}/>
      <div>
        {data.FB} {data.G} {data.M}
        <Bar data = {{
          labels : ["FaceBook" , 'Google' , "Microsoft" ]  , 
                datasets : [
                    {
                        label : "Stock Prices" , 
                        data : [ parseFloat( data.FB ) ,  parseFloat( data.G ) ,parseFloat( data.M) ] , 
                        backgroundColor : [
                            "blue" , "pink" , "red"
                        ] 
                    }
                ]
        } } />
      </div>
  );
}

export default App;
