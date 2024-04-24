import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(400).json({ error: 'Invalid request method.' })
    return
  }

  const apiUrl = process.env.PLACES_API_URL || 'http://127.0.0.1:8000/places'

  try {
    const response = await fetch(apiUrl)
    if (!response.ok) throw new Error('Failed to fetch')

    const data = await response.json()
    if (!Array.isArray(data)) throw new Error('Response format is incorrect')

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.status(200).json(data)
  } catch (error) {
    res.status(200).json([]) // Return an empty array on any error
  }
}

export default handler
