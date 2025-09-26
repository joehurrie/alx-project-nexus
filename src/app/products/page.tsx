import { FilterPanel } from '@/components/products/filter-panel';
import  ProductGrid  from '@/components/products/product-grid';
import { SearchBar } from '@/components/products/search-bar';

export default function ProductsPage() {
  return (
    <div className="-m-8">
      <div className="bg-primary p-8 text-primary-foreground mb-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold font-headline mb-2">
            Explore Sustainable Products
          </h1>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl">
            Search, filter, and compare thousands of eco-friendly products to
            find the best options for you and the planet.
          </p>
          <SearchBar />
        </div>
      </div>
      <div className="container mx-auto">
        <FilterPanel />
        <ProductGrid />
      </div>
    </div>
  );
}
