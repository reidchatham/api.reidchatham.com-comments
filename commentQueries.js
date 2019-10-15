
const { pool } = require('./config')

const getComments = (request, response) => {
  pool.query('SELECT * FROM comments ORDER BY date DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCommentsBySlug = (request, response) => {
  const slug = request.params.slug

  pool.query(
    'SELECT * FROM comments WHERE slug = $1 ORDER BY date DESC',
    [slug],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    }
  )
}

const createComment = (request, response) => {
  const { name, slug, text } = request.body
  const parentCommentId = parseInt(request.body.parentCommentId)

  pool.query(
    'INSERT INTO comments (name, slug, text, parent_comment_id) VALUES ($1, $2, $3, $4)',
    [name, slug, text, parentCommentId],
    error => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'New comment added.' })
    }
  )
}

const updateComment = (request, response) => {
  const { name, slug, text } = request.body
  const id = parseInt(request.params.id)
  const parentCommentId = parseInt(request.body.parentCommentId)

  pool.query(
    'UPDATE comments SET name = $1, slug = $2, text = $3, parent_comment_id = $4 WHERE id = $5',
    [name, slug, text, parentCommentId, id],
    error => {
      if (error) {
        throw error
      }
      response.status(200).json({ status: 'success', message: `Comment modified with ID: ${id}` })
    }
  )
}

const deleteComment = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM comments WHERE id = $1', [id], error => {
    if (error) {
      throw error
    }
    response.status(200).json({ status: 'success', message: `Comment deleted with ID: ${id}` })
  })
}


module.exports = {
  getComments,
  getCommentsBySlug,
  createComment,
  updateComment,
  deleteComment,
}
