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
            lastname: String,
            email: String
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
        const matiasUser = new User({
            _id: mongoose.Types.ObjectId(),
            name: 'Matías',
            lastname: 'Aybar',
            email: 'matiasaybar89@gmail.com',
        });
        const newArticle = new Article({
            _id: mongoose.Types.ObjectId(), 
            tittle: 'SCondenaron a una banda por el robo millonario a una empresa Avícola.',
            date: Date(),
            copete: 'Cinco hombres fueron condenados por el delito de robo agravado a una empresa avícola',
            image: 'https://us.cdn.eltribuno.com/012020/1578607950961.jpg?x=0&y=1&width=996&height=569&rotate=0&scaleX=1&scaleY=1&ow=999&oh=570&&cw=480&ch=300',
            description: 'César Efraín Limón (28) y Cristian Omar Martínez (21) recibieron una condena de tres años de prisión'
        })
        // Guardo en la base de datos
        matiasUser.save(() => {
            console.log('User was added');
        });
        
        newArticle.save(() => {
            console.log('Article was added');
        });
        myApp.listen(port, () => {
            console.log(`Server running on http://localhost:${port}...`);
        });
    })
    .catch(error => console.log(error));
