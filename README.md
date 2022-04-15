# MarebolDB
An Express wrapper that lets you connect to the Replit database through the browser using WebSocket. (Only works on REPLs)
# Usage
Server:
```js
var MarebolDB = require("marebol-db");
var app = MarebolDB.start();
app.get("/", function(req, res) {
    res.write(app.marebol(__dirname + "/index.html"));
    res.end();
})
app.marebolListen(3000, function(id) {
    console.log("Listening on 3000, connect to DB using ID " + id);
});
```
Client (index.html) (note: &lt;MAREBOL_ID&gt; will be replaced by the program above, do not change this}):
```html
<!DOCTYPE HTML>
<html>
  <head>
    <script src="marebol/marebol.js"></script>
  </head>
  <body>
   <script>
     (async () => {
     var database = new MarebolDB(<MAREBOL_ID>);
     await database.set("Hello", "World!");
     console.log(await database.get("Hello"));
     // World!
     })();
   </script>
  </body>
</html>
```