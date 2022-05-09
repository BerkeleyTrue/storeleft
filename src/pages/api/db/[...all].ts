import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

// pages/api/[...all].ts
export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.COUCHDB_URL) {
    throw new TypeError('expected COUCHDB_URL to be defined but found ${COUCHDB_URL}');
  }

  httpProxyMiddleware(req, res, {
    // You can use the `http-proxy` option
    target: process.env.COUCHDB_URL,
    auth: `${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}`,
    // In addition, you can use the `pathRewrite` option provided by `next-http-proxy-middleware`
    pathRewrite: [
      {
        patternStr: '^/api/db',
        replaceStr: '/',
      }
    ],
  });
};
