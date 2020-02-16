const mongoose = require('mongoose');
const myApp = require('./myApp');
const port = 3001;
const json = require('./data/db');

mongoose.Promise = global.Promise;



mongoose.connect('mongodb://localhost:27017/test_com_8')
    .then(() => {
        console.log('Connected successfully ...');
        // Define Schema
        const userScheme = mongoose.Schema({
            name: String,
            password: String,
        });
        // Schema Comments
        const commentsSchema = mongoose.Schema({
            userName: String,
            email: String,
            comment: String
        });
        // Schema Articles
        const articlesSchema = mongoose.Schema({
            tittle: String,
            date: Date,
            copete: String,
            image: String,
            description: String
        });
        // Pasa Schema a model
        const User = mongoose.model('User', userScheme);
        const Comment = mongoose.model('Comment', commentsSchema);
        const Article = mongoose.model('Article', articlesSchema);
        // Nueva instancia del documento
        json.comments.forEach(data => {
            const newComment = new Comment({
                userName: data.userName,
                email: data.email,
                comment: data.comment
            });
                newComment.save(() => {
                console.log('Comment was added');
            });
        });
        json.articles.forEach(data => {
            const newArticle = new Article({
                tittle: data.tittle,
                date: data.date,
                copete: data.copete,
                image: data.image,
                description: data.description
            });
            newArticle.save(() => {
                console.log('Article was added');
            });
        });
        json.users.forEach(data => {
            const matiasUser = new User({
                name: data.userName,
                password: data.password
            });
            matiasUser.save(() => {
                console.log('User was added');
            });
        });
        // Guardo en la base de datos
        myApp.listen(port, () => {
            console.log(`Server running on http://localhost:${port}...`);
        });
    })
    .catch(error => console.log(error));
