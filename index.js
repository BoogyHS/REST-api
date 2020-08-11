global.__basedir = __dirname;
require('dotenv').config()
const dbConnector = require('./config/db');
const mongoose = require('mongoose');
const apiRouter = require('./router');
const cors = require('cors');
const config = require('./config/config')

dbConnector()
    .then(() => {
        const config = require('./config/config');

        const app = require('express')();
        require('./config/express')(app);

        app.use(cors({
            origin: config.origin,
            credentials: true
          }));

          const sessionConfig = {
            cookie : {
              sameSite: 'none', // THIS is the config you are looing for.
            }
          };
          
          if (process.env.NODE_ENV === 'production') {
            sessionConfig.cookie.secure = true; // serve secure cookies
          }
          

        app.use('/api', apiRouter);
        
        // app.use(function (err, req, res, next) {
        //     res.render('500.hbs', { errorMessage: 'Something went wrong' });
        //     console.log(err.message);
        // });

        app.listen(config.port, console.log(`Listening on port ${config.port}!`));
    })
    .catch(console.error);