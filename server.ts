import { Filter } from './modelDefinition/CarOwner';
import { getfilteredParams, getItemByFilter } from './services/carOwnerService';
import express from 'express';
import mongoose, { connect } from 'mongoose';
import bodyParser from 'body-parser'

// Create a new express app instance
const app: express.Application = express();
const dbUrl = 'mongodb://emmanuel:password2020@ds123790.mlab.com:23790/codechallenge';
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use(bodyParser.json())
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });
app.get('/filters', async function (req, res) {
    try {
        const params = await getfilteredParams();
       return res.status(200).json({
            params
        })
    } catch (e) {
       return res.status(500).json({
            message: 'Internal server error'
        })
    }
});
app.post('/getOwners', async function (req, res) {
    console.log(req.body)
    if(!req.body){
       return res.status(400).json({
        message: 'please pass the required fields'
    })
}
    try {
        const resuls = await getItemByFilter(req.body)
      return  res.status(200).json(resuls)
    } catch (e) {
      return  res.status(500).json({
            message: 'Internal server error'
        })
    }
});
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error('connection failed', err);
    }
})
mongoose.connection.on('connected', () => {
    console.log('connected to database succesfully');
})
mongoose.connection.on('error', (err) => {
    console.error('error in database connection', err);
})
mongoose.connection.on('disconnected', () => {
    console.log('database disconnected');
})
app.listen(4000, function () {
    console.log('App is listening on port 4000!');

});