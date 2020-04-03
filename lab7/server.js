const http = require("http"),
  url = require("url"),
  fs = require("fs"),
  io = require("socket.io"),
  mongoose = require('mongoose'),
  Restaurant = require('./models/Restaurant'),
  Order = require('./models/Order');


const db_url = 'mongodb://localhost:27017/restrauntDemo?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
mongoose.connect(db_url, { useNewUrlParser: true })
  .then(() => { console.log('Database is connected') })
  .catch((error) => { console.log(error) })

const server = http.createServer(function (req, res) {
  var path = url.parse(req.url).pathname;
  switch (path) {
    case "/":
      fs.readFile(__dirname + "/index.html", function (err, data) {
        if (err) return send404(res);
        res.writeHead(200, {
          "Content-Type": path == "json.js" ? "text/javascript" : "text/html"
        });
        res.write(data, "utf8");
        res.end();
      });
      break;

    default:
      send404(res);
  }
});
const send404 = function (res) {
  res.writeHead(404);
  res.write("404");
  res.end();
};

const PORT = 8080;
server.listen(PORT, () => console.log(`server started on localhost:${PORT}`));


// socket.io, I choose you
const ioServer = io.listen(server);

// socket.io setup and manager
ioServer.on("connection", function (socket) {
  // now we have a client object!
  console.log("Connection accepted.");

  // event listeners
  socket.on("message", function (message) {
    console.log(`Recieved message: ${message} - from client`);
    socket.emit("msgreceived");
  });

  socket.on("disconnect", function () {
    console.log("Disconnected...");
  });

  socket.on("get-restaurants", () => {
    console.log("server - get-restarants called");

    Restaurant.find((error, document) => {
      if (error) console.log(`Error occured on Restaurant.find(; ${error})`);
      else {
        console.log(`data returned ${document}`)

        const data = document.map(x => x.name);
        console.log(data)
        socket.emit("restaurants-data", data);

      }
    })
  });

  //challenge
  socket.on("challenge", () => {
    console.log("server - get-restarants called");

    Restaurant.find({$and: [{city: "Queens"}, {cuisine: "Delicatessen"}]},
    {city:1, cuisine:1},
      (error, document) => {
      if (error) console.log(`Error occured on Restaurant.find(; ${error})`);
      else {
        console.log(`data returned ${document}`)

        const data = document.map((x) => x);
        console.log(data)
        socket.emit("challenge-data", JSON.stringify(document));

      }
    })
  });


  //getOrders
  socket.on("get-orders", () => {
    console.log("GeT Orders");

    Order.find((error, document) => {
      if (error) console.log(`Error occured on Order.find(; ${error})`);
      else {
        console.log(`Order returned ${document}`)
        socket.emit("orders-data", JSON.stringify(document));

      }
    })
  });

  //place an order
  socket.on('addOrder', ()=> {
    async function saveOrder(){
      const order = new Order({
        orderId: '3',
        item: 'Pizza',
        customer_name: 'Lisbon'
      });
  
      const result = await order.save();
      console.log(result);
      socket.emit('placedOrder', JSON.stringify(result));
    }

    saveOrder();
  })
  
  

});
