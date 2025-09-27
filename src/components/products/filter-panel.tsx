'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import {
  toggleCategory,
  toggleImpactType,
  toggleCertification,
  setSortBy,
  resetFilters,
} from '@/store/slices/filterSlice'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function FilterPanel({ impactTypes, onApply }: { impactTypes: string[]; onApply: () => void }) {
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();
  const categories = ['Food', 'Fashion', 'Home', 'Tech'];
  const certifications = ['KEBS', 'ISO', 'Fairtrade', 'Organic'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <Accordion type="multiple" className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        {/* Category */}
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 p-2 bg-white border rounded-md shadow-lg">
              {categories.map((cat) => (
                <Label key={cat} className="flex items-center space-x-2 font-normal">
                  <Checkbox
                    checked={filters.categories.includes(cat)}
                    onCheckedChange={() => dispatch(toggleCategory(cat))}
                    id={`cat-${cat.toLowerCase()}`}
                  />
                  <span>{cat}</span>
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Impact Type (from API) */}
        <AccordionItem value="impact">
          <AccordionTrigger>Impact Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 p-2 bg-white border rounded-md shadow-lg">
              {impactTypes.map((impact) => (
                <Label key={impact} className="flex items-center space-x-2 font-normal">
                  <Checkbox
                    checked={filters.impactTypes.includes(impact)}
                    onCheckedChange={() => dispatch(toggleImpactType(impact))}
                    id={`impact-${impact.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                  <span>{impact}</span>
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Certifications */}
        <AccordionItem value="certifications">
          <AccordionTrigger>Certifications</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 p-2 bg-white border rounded-md shadow-lg">
              {certifications.map((cert) => (
                <Label key={cert} className="flex items-center space-x-2 font-normal">
                  <Checkbox
                    checked={filters.certifications.includes(cert)}
                    onCheckedChange={() => dispatch(toggleCertification(cert))}
                    id={`cert-${cert.toLowerCase()}`}
                  />
                  <span>{cert}</span>
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Sort By */}
        <AccordionItem value="sort">
          <AccordionTrigger>Sort by</AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={filters.sortBy}
              onValueChange={(value) => dispatch(setSortBy(value))}
              className="space-y-2 p-2 bg-white border rounded-md shadow-lg"
            >
              <Label className="flex items-center space-x-2 font-normal">
                <RadioGroupItem value="impact-desc" id="sort-impact-desc" />
                <span>Impact Score: High to Low</span>
              </Label>
              <Label className="flex items-center space-x-2 font-normal">
                <RadioGroupItem value="impact-asc" id="sort-impact-asc" />
                <span>Impact Score: Low to High</span>
              </Label>
              <Label className="flex items-center space-x-2 font-normal">
                <RadioGroupItem value="popularity" id="sort-popularity" />
                <span>Popularity</span>
              </Label>
              <Label className="flex items-center space-x-2 font-normal">
                <RadioGroupItem value="price-asc" id="sort-price-asc" />
                <span>Price: Low to High</span>
              </Label>
              <Label className="flex items-center space-x-2 font-normal">
                <RadioGroupItem value="price-desc" id="sort-price-desc" />
                <span>Price: High to Low</span>
              </Label>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end space-x-2">
        <Button variant="outline" onClick={() => dispatch(resetFilters())}>
          Reset All
        </Button>
        <Button className="bg-green-600 text-white hover:bg-green-700" onClick={onApply}>
          Apply Filter
        </Button>
      </div>
    </div>
  );
}
