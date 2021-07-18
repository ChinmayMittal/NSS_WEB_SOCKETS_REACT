# NSS_WEB_SOCKETS_REACT
Recruitment assignment 
## This is a simple react app with an express backend as a part of the recruitment assignment at NSS. It uses websocket and Chart.js to render live time stock prices from a third party-API 
---
### The server side code can be found at [Express Back End](server.js)

### The backend uses socket.io package and express to set-up the server. Whenever a socket client is connected a third-party API call is made to fetch the current stock prices of Google , Facebook and Microsoft and are then emitted to the react-front end
---
### The main client side code can be found at [React Front End](stocks_charts/src/App.js)

### This uses the client side package of socket.io and uses Chart.js to render the data. Whenver the server data is emitted. React Hooks are used to re-render the chart. 

--- 
### This is how the web-app looks 

![Sample](https://github.com/ChinmayMittal/NSS_WEB_SOCKETS_REACT/blob/main/Screenshot%20(748).png?raw=true)

