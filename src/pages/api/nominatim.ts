import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET' && req.query && req.query.q) {
    const searchTerm = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q
    const apiUrl = `https://nominatim.openstreetmap.org/?format=json&q=${encodeURIComponent(
      searchTerm,
    )}&addressdetails=1&limit=1`

    try {
      const response = await fetch(apiUrl)
      const data = await response.json()

      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      res.status(200).json(data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data from Nominatim API:', error)
      res.status(500).json({ error: 'An error occurred while fetching data from the Nominatim API.' })
    }
  } else {
    res.status(400).json({ error: 'Invalid request method or missing query parameter.' })
  }
}

export default handler
