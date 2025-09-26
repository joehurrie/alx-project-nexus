// src/components/products/product-grid.tsx
import Link from 'next/link'
import Image from 'next/image'
import { gql } from '@apollo/client'
import { client } from '@/lib/apolloClient'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, BarChart2, Zap, Leaf, Recycle, Wind } from 'lucide-react'

const featuredBrands = [
  {
    name: 'M-KOPA Solar',
    description: 'Renewable energy access',
    tag: 'Affordable solar for off-grid communities',
    icon: <Zap className="text-green-600 text-xl" />,
    color: 'green',
  },
  {
    name: 'EcoPost',
    description: 'Recycled plastic infrastructure',
    tag: 'Turns waste into fencing and building materials',
    icon: <Recycle className="text-blue-600 text-xl" />,
    color: 'blue',
  },
  {
    name: 'GreenThing',
    description: 'Sustainable fashion',
    tag: 'Upcycled textiles and ethical labor practices',
    icon: <Leaf className="text-purple-600 text-xl" />,
    color: 'purple',
  },
  {
    name: 'Orchid Valley',
    description: 'Organic farming & packaging',
    tag: 'Zero-waste packaging and regenerative farming',
    icon: <Wind className="text-yellow-600 text-xl" />,
    color: 'yellow',
  },
]

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
        image {
          url
        }
      }
    }
  }
`
>>>>>>> Stashed changes

function ProductCard({ product }: { product: any }) {
  return (
    <div className="product-card bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 relative">

      <Link href={`/products/${product.id}`} className="block">
        <div className="relative">
          <Image
            src={product.image || '/fallback.jpg'}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-48 object-cover"
          />
          <div className="quick-view-overlay absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <Button variant="secondary">Quick View</Button>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge className={`impact-score-${product.scoreColor}`}>{product.score}</Badge>
        </div>
        <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="tag-chip">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-800">{product.price}</span>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <BarChart2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function BrandCard({ brand }: { brand: typeof featuredBrands[0] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className={`w-12 h-12 rounded-full bg-${brand.color}-100 flex items-center justify-center`}>
            {brand.icon}
          </div>
          <h3 className="font-bold">{brand.name}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">{brand.description}</p>
        <Badge variant="secondary" className={`bg-${brand.color}-50 text-${brand.color}-800`}>
          {brand.tag}
        </Badge>
      </div>
    </div>
  )
}

export default async function ProductGrid() {
  const { data } = await client.query({ query: GET_PRODUCTS })

  const products = data?.Products?.docs.map((p: any) => ({
    id: p.id,
    name: p.name,
    brand: p.brand || 'Unknown Brand',
    price: `KSh ${p.price}`,
    image: p.image?.url ? `https://ecowise-backend.vercel.app${p.image.url}` : '/fallback.jpg',

    score: p.impactScore ?? 'N/A',
    scoreColor: p.impactScore >= 8.5 ? 'high' : p.impactScore >= 7 ? 'medium' : 'low',
    tags: p.impactTags || [],
  }))

  return (
    <div className="flex-grow">
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Ethical Brands</h2>
        <p className="text-gray-600 mb-6">
          Discover brands making exceptional contributions to environmental sustainability and social impact.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBrands.map((brand) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Verified Products</h2>
            <p className="text-gray-600">Fetched dynamically from Payload CMS</p>
          </div>
          <Link href="#" className="text-green-600 font-medium text-sm">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {products.map((p) => (
    <ProductCard key={p.id} product={p} />
  ))}
</div>

      </section>
    </div>
  )
}
