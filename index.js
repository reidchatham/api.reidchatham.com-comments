const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const { body, check } = require('express-validator')

const app = express()

// const bookdb = require('./bookQueries')
// const userdb = require('./userQueries')
const cmntdb = require('./commentQueries')

const port = 3000

const isProduction = process.env.NODE_ENV === 'production'
const origin = {
  origin: isProduction ? 'https://www.example.com' : '*',
}

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // 5 requests,
})
const postLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1,
})


app.use(compression())
app.use(helmet())
app.use(cors(origin))
app.use(limiter)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// // Books
// app.get('/books', bookdb.getBooks)
// app.post('/books',
//   [
//     check('author')
//       .not()
//       .isEmpty()
//       .isLength({ min: 5, max: 255 })
//       .trim(),
//     check('title')
//       .not()
//       .isEmpty()
//       .isLength({ min: 5, max: 255 })
//       .trim(),
//   ],
//   postLimiter,
//   bookdb.addBook
// )
// app.delete('/books', bookdb.deleteBook)

// // Users
// app.get('/users', userdb.getUsers)
// app.get('/users/:id', userdb.getUserById)
// app.post('/users', userdb.createUser)
// app.put('/users/:id', userdb.updateUser)
// app.delete('/users/:id', userdb.deleteUser)

// Comments
app.get('/comments', cmntdb.getComments)
app.get('/comments/:slug', cmntdb.getCommentsBySlug)
app.post('/comments', cmntdb.createComment)
app.put('/comments/:id', cmntdb.updateComment)
app.delete('/comments/:id', cmntdb.deleteComment)

// Start server
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
// app.listen(process.env.PORT || 3002, () => {
//   console.log(`Server listening`)
// })
