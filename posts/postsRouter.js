const router = require('express').Router();

const db = require('../data/db.js')

router.get('/', (req, res) => {
     const query = req.query;

     db.find(query)
     .then(item => {
          res.status(200).json(item)
     })
     .catch(error => {
          console.log(error)
          res.status(500).json({
               message: "Error retrieving post"
            })
        })
   })
   
   router.get('/:id', (req, res) => {
        db.findById(req.params.id)
        .then(post => {
             res.status(200).json(post)
        })
        .catch(error => {
             console.log(error)
             res.status(500).json({
                  message: "Error retrieving post"
          })
     })
})

router.get('/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
    .then(post => {
         res.status(200).json(post)
    })
})

router.post('/', (req, res)=> {
    db.insert(req.body)
    .then(post => {
         res.status(201).json(post)
    })
    .catch(error => {
         res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    })
})

router.post('/:id/comments', (req, res)=> {
    db.insertComment(req.body)
    .then(comment => {
         res.status(201).json(comment)
    })
})

module.exports = router;