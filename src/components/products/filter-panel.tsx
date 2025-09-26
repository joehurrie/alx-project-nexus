'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function FilterPanel() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      {/* Filter Accordions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
        {/* Category */}
        <Accordion type="single" collapsible>
          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 p-2 bg-white border rounded-md shadow-lg">
                {['Food', 'Fashion', 'Home', 'Tech'].map((cat) => (
                  <Label key={cat} className="flex items-center space-x-2 font-normal">
                    <Checkbox id={`cat-${cat.toLowerCase()}`} /> <span>{cat}</span>
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Impact Type */}
        <Accordion type="single" collapsible>
          <AccordionItem value="impact">
            <AccordionTrigger>Impact Type</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 p-2 bg-white border rounded-md shadow-lg">
                {['Low CO₂', 'Plastic-Free', 'Locally Produced'].map((impact) => (
                  <Label key={impact} className="flex items-center space-x-2 font-normal">
                    <Checkbox id={`impact-${impact.toLowerCase().replace(/\s+/g, '-')}`} /> <span>{impact}</span>
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Certifications */}
        <Accordion type="single" collapsible>
          <AccordionItem value="certifications">
            <AccordionTrigger>Certifications</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 p-2 bg-white border rounded-md shadow-lg">
                {['KEBS', 'ISO', 'Fairtrade', 'Organic'].map((cert) => (
                  <Label key={cert} className="flex items-center space-x-2 font-normal">
                    <Checkbox id={`cert-${cert.toLowerCase()}`} /> <span>{cert}</span>
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Sort By */}
        <Accordion type="single" collapsible>
          <AccordionItem value="sort">
            <AccordionTrigger>Sort by</AccordionTrigger>
            <AccordionContent>
              <RadioGroup defaultValue="impact-desc" className="space-y-2 p-2 bg-white border rounded-md shadow-lg">
                <Label className="flex items-center space-x-2 font-normal">
                  <RadioGroupItem value="impact-desc" id="sort-impact-desc" /> <span>Highest Impact</span>
                </Label>
                <Label className="flex items-center space-x-2 font-normal">
                  <RadioGroupItem value="impact-asc" id="sort-impact-asc" /> <span>Lowest Impact</span>
                </Label>
                <Label className="flex items-center space-x-2 font-normal">
                  <RadioGroupItem value="price-asc" id="sort-price-asc" /> <span>Price: Low to High</span>
                </Label>
                <Label className="flex items-center space-x-2 font-normal">
                  <RadioGroupItem value="price-desc" id="sort-price-desc" /> <span>Price: High to Low</span>
                </Label>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end space-x-2">
        <Button variant="outline">Reset All</Button>
        <Button className="bg-green-600 text-white hover:bg-green-700">Apply Filters</Button>
      </div>
    </div>
  );
}
