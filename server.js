const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const blogRouter = require('./routes/blogs');
const Blog = require('./models/Blog');
const app = express();

//Conectar a Mooongose
const uri = 'mongodb+srv://ricardoloaiza:20020116@cluster0.yiffk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function database() {
  try {
      await mongoose.connect(uri, {
          useCreateIndex: true,
          useNewUrlParser: true,
          useFindAndModify: true,
          useUnifiedTopology: true
      });
      console.log('Database is connected');
      
  } catch (err) {
      console.error(err);
  };
};

database(); 
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
//Route para el Index
app.get('/', async (request, response) => {
  let blogs = await Blog.find().sort({ timeCreated: 'desc' });

  response.render('index', { blogs: blogs });
});

app.use(express.static('public'));
app.use('/blogs', blogRouter);

//Puerto
app.listen(5000);
