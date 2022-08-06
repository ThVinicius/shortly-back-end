import { nanoid } from 'nanoid'
import urlsRepositories from '../repositories/urlsRepositories.js'
import customerRepositories from '../repositories/customerRepositories.js'

export async function createUrl(req, res) {
  try {
    const { url } = req.body

    const { customerId } = res.locals

    const shortUrl = nanoid(9)

    await urlsRepositories.insert(url, shortUrl, customerId)

    return res.status(201).send({ shortUrl })
  } catch (error) {
    console.log(error)

    if (error.code === '23505') {
      return res.status(409).send(error)
    }

    return res.status(500).send(error)
  }
}

export async function getUrlById(req, res) {
  try {
    const { id } = req.params

    const { rows: url } = await urlsRepositories.getById(id)

    if (url.length === 0) return res.sendStatus(404)

    return res.status(200).send(url[0])
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function openUrl(_, res) {
  const { url } = res.locals

  return res.redirect(url)
}

export async function deleteUrl(req, res) {
  try {
    const { customerId } = res.locals

    const { id } = req.params

    await urlsRepositories.deleteOne(customerId, id)

    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function getUrlsByCustomer(_, res) {
  try {
    const { customerId } = res.locals

    const { rows: urlsById } = await customerRepositories.getLinksById(
      customerId
    )

    return res.status(200).send(urlsById[0])
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function getRanking(_, res) {
  try {
    const { rows: ranking } = await customerRepositories.getRanking()

    return res.status(200).send(ranking)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
