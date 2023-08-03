const express = require('express');
const cors = require('cors');
const app = express();
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


var userData;

// Database
const dbName = process.env.DB_NAME;
const userName = process.env.USER_NAME;
const pass = process.env.PASS;
const url = "mongodb+srv://"+userName+":"+pass+"@cluster0.j3d6lug.mongodb.net/" + dbName;
async function run() {
    await mongoose.connect(url, { useNewUrlParser: true });
}

run();

const userdataSchema = {
    title: String,
    text: String
};

const Item = mongoose.model('usernote', userdataSchema);


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
})
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.get('/', async (req, res) => {
    await Item.find().then(data => {
        userData = data;
    })
    res.json(userData);
})



app.post('/add', async (req, res) => {
    const item = new Item({
        title: req.body.title,
        text: req.body.text
    });
    await item.save();
})

app.post("/delete", async (req, res) => {
    const deleteId = JSON.parse(JSON.stringify(req.body.id));
    console.log(deleteId);
    await Item.findByIdAndDelete(deleteId).then(() => {
        console.log("Data deleted");
    }).catch((err) => {
        console.log(err);
    });
})


app.listen(3001, () => {
    console.log("Server is running on port 3001");
})