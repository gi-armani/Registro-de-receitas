const express   = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app       = express();
const pg        = require('pg');
const sql;

const config = {
    user: 'postgres',
    database: 'receitas',
    password: 'felima09',
    port: 5432                  //Default port, change it if needed
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);
app.get('/', (req, res, next) => {
   sql = pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       /*client.query('SELECT * FROM receitas', function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
       })
       console.log('foi?');*/
   })
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/get", (req, res) => {
    const query = "SELECT * FROM receitas";
    sql.query(query, (err, result) => {
        //console.log(result);
        res.send(result);
    })

})

app.post("/api/insert", (req, res) => {

    const nomeReceita = req.body.nomeReceita
    const ingredientes = req.body.ingredientes
    const instrucoes = req.body.instrucoes

    const query = "INSERT INTO receitas (nome, ingredientes, instrucoes) VALUES (?, ?, ?)"
    sql.query(query, [nomeReceita, ingredientes, instrucoes], (err, result) => {

    })
})

app.listen(4000, function () {
    //console.log('Server is running on port 4000');
    console.log('eita');
});