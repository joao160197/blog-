
import Prismic from 'prismic-javascript';

// import Prismic from '@prismicio/client'

export function getPrismicClient(req:unknown) {
 

  const prismicClient = Prismic.client('https://jpinformatica.cdn.prismic.io/api/v2', {
    req,
  });

  return prismicClient;
}