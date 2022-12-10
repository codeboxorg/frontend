import { NextApiRequest, NextApiResponse } from 'next'

function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ test: '/test/' })
}

export default handler
