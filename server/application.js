const express = require('express')
const next = require('next');

const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
   .then(() => {
       const server = express();
       const showsRouter = require('./routes/shows')
       /// registe modular routes as middlewares
       server.use('/api', showsRouter);

       /// fallback on nextjs
       server.get("*", (req, res) => {
           return handle(req, res);
       });

       server.listen(PORT, err => {
           if(err) throw err;
           console.log(`> Ready on ${PORT}`);
       });
   })
   .catch(except => {
       console.error(except.stack);
       process.exit(1);
   });