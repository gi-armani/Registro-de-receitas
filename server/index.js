const pg        = require('pg');
const express   = require('express');
const app       = express();

const config = {
    user: 'postgres',
    database: 'receitas',
    password: '',
    port: 5432                  //Default port, change it if needed
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query('SELECT * FROM GetAllStudent()', function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
       })
       console.log('foi?');
   })
});

app.listen(4000, function () {
    //console.log('Server is running on port 4000');
    console.log('eita');
});