const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

// Body-Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database Connection
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(indexPath);
});

app.get('/services', (req, res) => {
    const servicesPath = path.join(__dirname, 'views', 'services.html');
    res.sendFile(servicesPath);
});

app.get('/belly', (req, res) => {
    const bellyPath = path.join(__dirname, 'views', 'services.html');
    res.sendFile(bellyPath);
});

app.get('/bolly', (req, res) => {
    const bollyPath = path.join(__dirname, 'views', 'services.html');
    res.sendFile(bollyPath);
});

app.get('/hiphop', (req, res) => {
    const hiphopPath = path.join(__dirname, 'views', 'services.html');
    res.sendFile(hiphopPath);
});


app.get('/contact', (req, res) => {
    const contactPath = path.join(__dirname, 'views', 'contact.html');
    res.sendFile(contactPath);
});


app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("Item was not saved to the database")
    });
});

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
