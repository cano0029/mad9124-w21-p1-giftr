import Gift from '../models/Gift.js'
import Person from '../models/Person.js'
import sanitizeBody from '../middleware/sanitizeBody.js'
import express from 'express'
const router = express.Router()

router.post('/', sanitizeBody, async (req, res) => {
  let newDocument = new Gift(req.sanitizedBody)
  // push to array?
  // save to parent document (Person)?
  try {
      await newDocument.save()
      res.status(201).send({ data: newDocument })
  } catch (err) {
      console.log(err)
      res.status(500).send({
          errors: [
              {
                  status: '500',
                  title: 'Server error',
                  description: 'Problem saving document to the database.',
              },
          ],
      })
  }
})

export default router