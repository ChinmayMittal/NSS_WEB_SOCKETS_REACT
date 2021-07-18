const express = require('express'); 
var axios = require('axios').default ; 
const app = express();
const server = require('http').createServer(app) ; 
var request = require('request');
const io = require('socket.io')(server , {
    transports: ['websocket', 'polling']
  });



server.listen(3000 , function(){
    console.log("listening on port 3000 ");
}) ; 
var stock_data ={
    FB : "0"  ,  // FB
    G : "0"  ,  // GOOGL 
    M : "0"  // MSFT 
}
io.on('connection' , socket => {

        console.log('web socket connection established ' ) ; 
        setInterval( function(){
          var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=FB&interval=1min&apikey=' + process.env.API_KEY;
        
          request.get({
              url: url,
              json: true,
              headers: {'User-Agent': 'request'}
            }, (err, res, data) => {
              if (err) {
                console.log('Error:', err);
              } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
              } else {
                // data is successfully parsed as a JSON object:
              //   console.log(data );
              if (!("Note" in data)) console.log(data['Time Series (1min)'][data[ 'Meta Data']['3. Last Refreshed']]['4. close']);
              if (!("Note" in data))stock_data.FB = data['Time Series (1min)'][data[ 'Meta Data']['3. Last Refreshed']]['4. close'] ;
                console.log(stock_data) ; 
                socket.emit('stock' , stock_data ) ; 
              }
          });
  
          url= "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=" + process.env.API_KEY ;        
         request.get({
              url: url,
              json: true,
              headers: {'User-Agent': 'request'}
            }, (err, res, data) => {
              if (err) {
                console.log('Error:', err);
              } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
              } else {
                // data is successfully parsed as a JSON object:
              //   console.log(data );
              if (!("Note" in data)) console.log(data['Time Series (1min)'][data[ 'Meta Data']['3. Last Refreshed']]['4. close']);
              if (!("Note" in data)) stock_data.M = data['Time Series (1min)'][data[ 'Meta Data']['3. Last Refreshed']]['4. close'] ;
                console.log(stock_data) ;
                socket.emit('stock' , stock_data ) ;  
              }
          });
  
          url= "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=GOOGL&interval=1min&apikey=" + process.env.API_KEY ; 
          request.get({
              url: url,
              json: true,
              headers: {'User-Agent': 'request'}
            }, (err, res, data) => {
              if (err) {
                console.log('Error:', err);
              } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
              } else {
                // data is successfully parsed as a JSON object:
              //   console.log(data );
              if (!("Note" in data))console.log(data['Time Series (1min)'][data[ 'Meta Data']['3. Last Refreshed']]['4. close']);
              if (!("Note" in data)) stock_data.G = data['Time Series (1min)'][data[ 'Meta Data']['3. Last Refreshed']]['4. close'] ; 
                console.log(stock_data) ;
                socket.emit('stock' , stock_data ) ; 
              }
          });
        }, 10000) ; 
 
    

    
}) ; 

