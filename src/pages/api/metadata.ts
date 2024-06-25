// Import the required packages
import { NextApiRequest, NextApiResponse } from 'next'

import ogs from 'open-graph-scraper'
import { OpenGraphScraperOptions } from 'open-graph-scraper/dist/lib/types'

// Next.js API route
const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const options: OpenGraphScraperOptions = JSON.parse(req.body) // Get the options from the request body
  // Use the open-graph-scraper package
  ogs(options)
    .then((data) => {
      // Send the results back as the response
      return res.status(200).json({ ...data })
    })
    .catch((error: Error) => {
      // Handle any errors
      return res.status(500).json({
        error,
      })
    })
}

export default POST
