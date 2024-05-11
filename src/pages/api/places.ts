import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(400).json({ error: 'Invalid request method.' })
    return
  }

  // Extract lat, lng, and radius from the query parameters
  const { lat, lng, radius } = req.query

  // Validate the presence of lat, lng, and radius
  if (!lat || !lng || !radius) {
    res.status(400).json({ error: 'Missing required query parameters (lat, lng, radius).' })
    return
  }

  // Fetch the API URL and API KEY from environment variables
  const apiUrl = process.env.PLACES_API_URL || 'http://127.0.0.1:8001/places/nearby'
  const apiKey = process.env.PLACES_API_KEY

  if (!apiKey) {
    res.status(500).json({ error: 'API key is not configured.' })
    return
  }

  try {
    // Append query parameters to the apiUrl
    const url = new URL(apiUrl)
    url.searchParams.append('lat', lat as string)
    url.searchParams.append('lng', lng as string)
    url.searchParams.append('radius', radius as string)

    const response = await fetch(url.href, {
      headers: {
        'X-API-Key': apiKey, // Send API key via headers
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch')
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      throw new Error('Response format is incorrect')
    }

    // Configure CORS headers for the API response
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key')

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default handler
