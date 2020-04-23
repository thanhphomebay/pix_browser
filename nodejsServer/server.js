var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');

app.use(function (req, res, next) {
   var allowedOrigins = ['http://127.0.0.1:4200', 'http://localhost:4200', 'http://192.168.1.150:4200'];
   var origin = req.headers.origin;
   if (allowedOrigins.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
   }
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.setHeader('Access-Control-Allow-Credentials', true);

   next();
});
app.get('/folder/:id', function (req, res) {
   console.log('/folder')
   var id = req.params.id;
   var filename = path.join(__dirname, 'pix', id, id + ".json")
   console.log(filename);
   fs.readFile(filename, 'utf8', function (err, data) {
      if (err) {
         res.status(404)        // HTTP status 404: NotFound
            .send('Not found: ' + filename.trim());
      }
      else {
         res.end(data);
      }
   });
})
app.get('/root', (req, res) => {
   //const fullPath = __dirname,// process.cwd() + req.path //(not __dirname)
   const dir = fs.opendirSync(__dirname + '/pix/')
   let entity
   let listing = []
   while ((entity = dir.readSync()) !== null) {
        /*if(entity.isFile()) {
            listing.push({ type: 'f', name: entity.name })
        } else*/ if (entity.isDirectory()) {
         // listing.push({ type: 'd', name: entity.name })
         listing.push(entity.name)
      }
   }
   dir.closeSync()
   res.send(listing)
})

app.get('/list/:pix', function (req, res, next) {
   console.log('/list/:pix')
   const ext = path.extname('index.html').toLocaleLowerCase();
   var fileName = decodeURIComponent(req.params.pix)
   if (ext === 'jpg' || ext === 'png') {
      var options = {
         root: path.join(__dirname, 'pix'),
         //root: __dirname,
         dotfiles: 'deny',
         headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
         }
      }

      console.log(fileName)
      res.sendFile(fileName, options, function (err) {
         if (err) {
            next(err)
         } else {
            console.log('Sent:', fileName)
         }
      })
   }
   else {
      console.log('movie')
      const pathname = path.join(__dirname, 'pix', fileName);
      console.log(pathname);
      const stat = fs.statSync(pathname)
      const fileSize = stat.size
      const range = req.headers.range
      if (range) {
         const parts = range.replace(/bytes=/, "").split("-")
         const start = parseInt(parts[0], 10)
         const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1
         const chunksize = (end - start) + 1
         const file = fs.createReadStream(pathname, { start, end })
         const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
         }
         res.writeHead(206, head);
         file.pipe(res);
      } else {
         const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
         }
         res.writeHead(200, head)
         fs.createReadStream(pathname).pipe(res)
      }
   }
});
var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
