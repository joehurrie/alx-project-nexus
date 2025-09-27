"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setSortBy, resetFilters, toggleCategory, toggleCertification, toggleImpactType } from "@/store/slices/filterSlice";
import { FilterPanel } from "@/components/products/filter-panel";
import { Zap, Recycle, Leaf, Wind } from 'lucide-react';
// Featured brands data
const featuredBrands = [
  {
    name: 'M-KOPA Solar',
    description: 'Renewable energy access',
    tag: 'Affordable solar for off-grid communities',
    icon: <Zap className="text-green-600 text-xl" />, color: 'green',
  },
  {
    name: 'EcoPost',
    description: 'Recycled plastic infrastructure',
    tag: 'Turns waste into fencing and building materials',
    icon: <Recycle className="text-blue-600 text-xl" />, color: 'blue',
  },
  {
    name: 'GreenThing',
    description: 'Sustainable fashion',
    tag: 'Upcycled textiles and ethical labor practices',
    icon: <Leaf className="text-purple-600 text-xl" />, color: 'purple',
  },
  {
    name: 'Orchid Valley',
    description: 'Organic farming & packaging',
    tag: 'Zero-waste packaging and regenerative farming',
    icon: <Wind className="text-yellow-600 text-xl" />, color: 'yellow',
  },
];

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
        <span className={`inline-block px-2 py-1 rounded bg-${brand.color}-50 text-${brand.color}-800 text-xs font-semibold`}>{brand.tag}</span>
      </div>
    </div>
  );
}
import ProductGridClient from "@/components/products/product-grid-client";
import { SearchBar } from "@/components/products/search-bar";
import { Product } from "@/constants/interfaces";

// Dummy fetch function to simulate SSR fetch (replace with real API call if needed)
async function fetchProducts(): Promise<Product[]> {
  // This should be replaced with a real fetch or passed as prop from server
  return [];
}

export default function ProductsPageClient({ initialProducts }: { initialProducts: Product[] }) {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();
  const [products] = useState<Product[]>(initialProducts);
  const [appliedFilters, setAppliedFilters] = useState(filters);

  // Get all unique impact types from products
  const allImpactTypes = Array.from(new Set(products.flatMap((p) => p.tags)));


  // Show all products by default, only filter/sort after Apply Filter
  let shownProducts = products;
  const filtersApplied =
    appliedFilters.categories.length > 0 ||
    appliedFilters.impactTypes.length > 0 ||
    appliedFilters.certifications.length > 0 ||
    appliedFilters.sortBy !== '';
  if (filtersApplied) {
    shownProducts = products
      .filter((p) => {
        const matchesCategory = !appliedFilters.categories.length || appliedFilters.categories.includes(p.category);
        const matchesImpact = !appliedFilters.impactTypes.length || appliedFilters.impactTypes.some((tag) => p.tags.includes(tag));
        const matchesCert = !appliedFilters.certifications.length || appliedFilters.certifications.some((cert) => p.tags.includes(cert));
        return matchesCategory && matchesImpact && matchesCert;
      })
      .sort((a, b) => {
        switch (appliedFilters.sortBy) {
          case "impact-desc":
            return b.score - a.score;
          case "impact-asc":
            return a.score - b.score;
          case "popularity":
            // Placeholder: sort by popularity metric if available, else fallback to impact score
            return b.score - a.score;
          case "price-asc":
            return parseFloat(a.price.replace("KSh ", "")) - parseFloat(b.price.replace("KSh ", ""));
          case "price-desc":
            return parseFloat(b.price.replace("KSh ", "")) - parseFloat(a.price.replace("KSh ", ""));
          default:
            return b.score - a.score; // Default: high to low impact
        }
      });
  }

  // Handler for Apply Filter button
  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  return (
    <div className="-m-8">
      <div className="bg-primary p-8 text-primary-foreground mb-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold font-headline mb-2">Explore Sustainable Products</h1>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl">
            Search, filter, and compare thousands of eco-friendly products to find the best options for you and the planet.
          </p>
          <SearchBar />
        </div>
      </div>
      <div className="container mx-auto">
        <FilterPanel impactTypes={allImpactTypes} onApply={handleApplyFilters} />
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
        <ProductGridClient products={shownProducts} />
      </div>
    </div>
  );
}
