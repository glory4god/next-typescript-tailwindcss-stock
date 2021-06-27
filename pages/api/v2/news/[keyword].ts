// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { naverClientId, naverClientSecret } from '../../../../config';

type NewsQuery = {
  keyword: string;
  sort: string;
};

async function getNewsByKeyword(query: NewsQuery) {
  const response = await fetch(
    `https://openapi.naver.com/v1/search/news.json?query=${query.keyword}&display=25&sort=${query.sort}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Naver-Client-Id': naverClientId,
        'X-Naver-Client-Secret': naverClientSecret,
      },
    },
  );

  console.log(response);
}

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    const newsList = getNewsByKeyword(req.body);

    res.status(200).json({ name: 'John Doe' });
  }
}
