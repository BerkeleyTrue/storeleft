import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { getConfig } from '../../lib/cosmiconfig/config';

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  return getConfig()
    .then((config) => {
      if (!config) {
        return res.status(500).json({ message: 'config' });
      }
      res.status(200).json(config);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `GetConfigError: ${err.message}`, stack: err.stack });
    });
};

export default handler;
