// src/components/products/product-grid-client.tsx
"use client";

import type { Product } from '@/constants/interfaces';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function ProductCard({ product }: { product: Product }) {
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
  );
}

export default function ProductGridClient({ products }: { products: Product[] }) {
  if (!products || !Array.isArray(products)) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
