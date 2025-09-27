import ProductsPageClient from './page-client';
import { client } from '@/lib/apolloClient';
import { gql } from '@apollo/client';
import type { ProductsResponse, Product } from '@/constants/interfaces';

const GET_PRODUCTS = gql`
  query GetProducts {
    Products(limit: 20) {
      docs {
        id
        name
        price
        brand
        impactTags
        impactScore
        image { url }
        category
      }
    }
  }
`;

export default async function ProductsPage() {
  const { data } = await client.query<ProductsResponse>({ query: GET_PRODUCTS });
  const products: Product[] = (data?.Products?.docs || []).map((p: any) => ({
    id: p.id,
    name: p.name,
    brand: p.brand || 'Unknown Brand',
    price: `KSh ${p.price}`,
    image: p.image?.url ? `https://ecowise-backend.vercel.app${p.image.url}` : '/fallback.jpg',
    score: typeof p.impactScore === 'number' ? p.impactScore : 0,
    scoreColor: p.impactScore >= 8.5 ? 'high' : p.impactScore >= 7 ? 'medium' : 'low',
    tags: Array.isArray(p.impactTags) ? p.impactTags : [],
    category: typeof p.category === 'string' ? p.category : '',
  }));
  return <ProductsPageClient initialProducts={products} />;
}
