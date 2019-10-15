
const { pool } = require('./config')

const getBooks = (request, response) => {
  pool.query('SELECT * FROM books', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const addBook = (request, response) => {
  const errors = validationResult(request)

  if (!errors.isEmpty()) {
    return response.status(422).json({ errors: errors.array() })
  }

  const { author, title } = request.body

  pool.query('INSERT INTO books (author, title) VALUES ($1, $2)', [author, title], error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'Book added.' })
  })
}

const deleteBook = (request, response) => {
  if (!request.header('apiKey') || request.header('apiKey') !== process.env.API_KEY) {
    return response.status(401).json({ status: 'error', message: 'Unauthorized.' })
  }
  // ...
}

module.exports = {
  getBooks,
  addBook,
  deleteBook,
}
