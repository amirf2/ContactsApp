const {Contacts, createDB} = require('./database');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());



app.get('/api/contacts', async (req, res, next) => {
        Contacts.findAll().then(contacts => {
        return res.json(contacts);
    });
});


app.post('/api/contacts', async (req, res, next) => {
    Contacts.create(req.body)
    .then(ans => {
        return res.json(ans.dataValues);   
    }).catch(err => {
        console.log(err);
        return res.json(err);
    })
});


app.get('/api/contacts/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    Contacts.findAll(({where:{id: id}})).then(contact => {
        return res.json(contact);
    });
});


app.put('/api/contacts/:id', async (req, res, next) => {
    let id = parseInt(req.params.id);
    const {name, phone, title, avatar} = req.body;
    const contact = await Contacts.findOne({where:{id: id}});
    contact.name = name;
    contact.phone = phone;
    contact.title = title;
    contact.avatar = avatar;
    await contact.save();
    return res.status(204).send();
});


app.delete('/api/contacts/:id', async (req, res, next) => {
    let id = req.params.id;
    if (!isNaN(id)){
        Contacts.destroy({
            where: {
                id: id
            }
        })
    }
    return res.status(204).send();
});


app.use((req, res) => {
    res.status(404).json({ message: 'Path not found, only the following paths are supported: GET /api/contacts, GET /api/contacts/:id' });
});


async function initDBAndServer(){
    await createDB();
    await app.listen(PORT, function() {
        console.log(`ContactApp Server listening.. Access it using address: http://localhost:${PORT}`);
    });  
}


initDBAndServer();

