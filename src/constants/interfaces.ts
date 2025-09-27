// Central place for all shared interfaces and types

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  score: number;
  scoreColor: string;
  tags: string[];
  category: string;
}

export interface FilterState {
  categories: string[];
  impactTypes: string[];
  certifications: string[];
  sortBy: string;
}

export interface ProductsResponse {
  Products: {
    docs: Array<{
      id: string;
      name: string;
      price: number;
      brand: string;
      impactTags: string[];
      impactScore: number;
      image: {
        url: string;
      };
    }>;
  };
}
