const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

const DB_URL =
  'mongodb+srv://ravi:password@123@cluster0.jdr4i.mongodb.net/node-course?retryWrites=true&w=majority'

const PORT = process.env.PORT || 3000

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`listening for requests on port ${PORT}.`)
    })
  })
  .catch((err) => console.log(err))

// expres app
const app = express()

// register view engine
app.set('view engine', 'ejs')

// Middle static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my blog',
  })
  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})

app.get('/single-blog', (req, res) => {
  Blog.findById('60353210ada20d16bc615aee')
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})

// app.use((req, res, next) => {
//     console.log('new request made:')
//     console.log('host:', req.hostname)
//     console.log('path:', req.path)
//     console.log('method:', req.method)
//     next()
// })

app.get('/', (req, res) => {
  res.redirect('blogs')
  // //   res.sendFile('./views/index.html', { root: __dirname })
  // const blogs = []
  // res.render('index', { title: 'Home', blogs })
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

// blog routes
app.use('/blogs', blogRoutes)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})
