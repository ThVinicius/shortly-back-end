import urlsRepositories from '../repositories/urlsRepositories.js'

export default async function checkUrlByCustomer(req, res, next) {
  const { id } = req.params

  const { customerId } = res.locals

  try {
    const { rows: url } = await urlsRepositories.getById(id)

    if (url.length === 0) return res.sendStatus(404)

    if (url[0].customerId !== customerId) return res.sendStatus(401)

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
