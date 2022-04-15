const fs = require("fs");
const {
    execSync
} = require("child_process");
const Database = require("@replit/database")
const db = new Database()

var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

module.exports = {
    start: function() {
        app.ws('/api', function(ws, req) {
            ws.on('message', function(msg) {
                var jn = msg.split(" ").slice(1);
                if (msg.startsWith("/set")) {
                    db.set(jn[0], jn[1]).then(() => {
                        ws.send(JSON.stringify({
                            success: true
                        }));
                    });
                } else if (msg.startsWith("/get")) {
                    db.get(jn[0]).then(value => {
                        ws.send(value);
                    });
                } else if (msg.startsWith("/delete")) {
                    db.delete(jn[0]).then(() => {
                        ws.send(JSON.stringify({
                            success: true
                        }));
                    });
                } else if (msg.startsWith("/listall")) {
                    db.list().then(keys => {
                        var json = {};
                        keys.forEach(async function(e, i) {
                            var v = await db.get(e);
                            json[e] = v;
                            if (i == keys.length - 1) {
                                ws.send(JSON.stringify(json));
                            }
                        })
                    });
                }
            });
        });
        app.get("/marebol/marebol.js", function(req, res) {
            res.write(atob("Ly8gTWFyZWJvbERCIC0gYnJvd3NlciBBUEkKY2xhc3MgTWFyZWJvbERCIHsKICAgIGNvbnN0cnVjdG9yKGlkKSB7CiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbG9jYXRpb24ucHJvdG9jb2wgPT0gImh0dHBzIiA/ICJ3cyIgOiAid3NzIiArICI6Ly8iICsgaWQgKyAiLmlkLnJlcGwuY28vYXBpIgogICAgfQogICAgZ2V0KHZhbCkgewogICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7CiAgICAgICAgICAgIHZhciBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHRoaXMuY29ubmVjdGlvbik7CiAgICAgICAgICAgIHNvY2tldC5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7CiAgICAgICAgICAgICAgICByZXNvbHZlKGUuZGF0YSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgc29ja2V0Lm9ub3BlbiA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgICAgICAgc29ja2V0LnNlbmQoIi9nZXQgIiArIHZhbCk7CiAgICAgICAgICAgIH0KICAgICAgICB9KQogICAgfQogICAgc2V0KHZhbDEsIHZhbDIpIHsKICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gewogICAgICAgICAgICB2YXIgc29ja2V0ID0gbmV3IFdlYlNvY2tldCh0aGlzLmNvbm5lY3Rpb24pOwogICAgICAgICAgICBzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24oZSkgewogICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKGUuZGF0YSkpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHNvY2tldC5vbm9wZW4gPSBmdW5jdGlvbigpIHsKICAgICAgICAgICAgICAgIHNvY2tldC5zZW5kKCIvc2V0ICIgKyB2YWwxICsgIiAiICsgdmFsMik7CiAgICAgICAgICAgIH0KICAgICAgICB9KQogICAgfQogICAgZGVsZXRlKHZhbCkgewogICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7CiAgICAgICAgICAgIHZhciBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHRoaXMuY29ubmVjdGlvbik7CiAgICAgICAgICAgIHNvY2tldC5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7CiAgICAgICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoZS5kYXRhKSk7CiAgICAgICAgICAgIH0KICAgICAgICAgICAgc29ja2V0Lm9ub3BlbiA9IGZ1bmN0aW9uKCkgewogICAgICAgICAgICAgICAgc29ja2V0LnNlbmQoIi9kZWxldGUgIiArIHZhbCk7CiAgICAgICAgICAgIH0KICAgICAgICB9KQogICAgfQogICAgbGlzdGFsbCgpIHsKICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4gewogICAgICAgICAgICB2YXIgc29ja2V0ID0gbmV3IFdlYlNvY2tldCh0aGlzLmNvbm5lY3Rpb24pOwogICAgICAgICAgICBzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24oZSkgewogICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKGUuZGF0YSkpOwogICAgICAgICAgICB9CiAgICAgICAgICAgIHNvY2tldC5vbm9wZW4gPSBmdW5jdGlvbigpIHsKICAgICAgICAgICAgICAgIHNvY2tldC5zZW5kKCIvbGlzdGFsbCIpOwogICAgICAgICAgICB9CiAgICAgICAgfSkKICAgIH0KfQ=="));
            res.end();
        });
        var id = execSync("echo $REPL_ID").toString();
        app.marebolListen = function(port, cb) {
            app.listen(port);
            cb(id);
        }
        app.marebol = function(path) {
            return fs.readFileSync(path).toString().replaceAll("<MAREBOL_ID>", "\"" + id.slice(0, -1) + "\"");
        }
        return app;
    }
}