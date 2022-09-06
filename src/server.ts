import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import routes from './routes/index';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.use(routes);

// Fill req.body with POST query params, body-parser is not required anymore
app.use(express.json());

//a built-in middleware function in Express...>>to recognize the incoming Request Object as strings or arrays
app.use(express.urlencoded({ extended: true }));


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;
//import express from 'express';
//import routes from './routes/index';

//const app = express();
//Set a port
//const port = 3000;

//app.use(routes);
//Set your application to listen on your port and output a message to the console with app.listen
//app.listen(port, () => {
 // console.log(`server started at localhost:${port}`);
//});

//database.ts
// database variable if env === test , v = POSTGRES_TEST_DB , else , v=POSTGRES_DB
//const database = (ENV === 'test') ? POSTGRES_TEST_DB : POSTGRES_DB;
//console.log('Database used: ' + database);

// const client = new Pool({
//   host: POSTGRES_HOST,
//   database: database,
//   user: POSTGRES_USER,
//   password: POSTGRES_PASSWORD
// });

