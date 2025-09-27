'use client'

import { useState } from 'react'
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'

export function FilterPanel() {
  const filters = useSelector((state: RootState) => state.filters)
  const dispatch = useDispatch()

  const [isApplied, setIsApplied] = useState(false)
  const [openSections, setOpenSections] = useState<string[]>([])

  const categories = ['Food', 'Fashion', 'Home', 'Tech']
  const impactTypes = ['Low CO₂', 'Plastic-Free', 'Locally Produced']
  const certifications = ['KEBS', 'ISO', 'Fairtrade', 'Organic']

  const handleApply = () => {
    setIsApplied(true)
  }

  const handleReset = () => {
    dispatch(resetFilters())
    setIsApplied(false)
    setOpenSections([]) // Collapse all accordions
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
        {/* Search Input */}
        <div className="md:col-span-2">
          <Input
            type="text"
            placeholder="Search brands..."
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm mb-2"
          />
        </div>

        {/* Category Accordion */}
        <Accordion
          type="single"
          collapsible
          value={openSections.includes('category') ? 'category' : ''}
          onValueChange={(val) =>
            setOpenSections((prev) =>
              val ? [...prev.filter((v) => v !== 'category'), val] : prev.filter((v) => v !== 'category')
            )
          }
        >
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
        </Accordion>

        {/* Impact Type Accordion */}
        <Accordion
          type="single"
          collapsible
          value={openSections.includes('impact') ? 'impact' : ''}
          onValueChange={(val) =>
            setOpenSections((prev) =>
              val ? [...prev.filter((v) => v !== 'impact'), val] : prev.filter((v) => v !== 'impact')
            )
          }
        >
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
        </Accordion>

        {/* Certifications Accordion */}
        <Accordion
          type="single"
          collapsible
          value={openSections.includes('certifications') ? 'certifications' : ''}
          onValueChange={(val) =>
            setOpenSections((prev) =>
              val ? [...prev.filter((v) => v !== 'certifications'), val] : prev.filter((v) => v !== 'certifications')
            )
          }
        >
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
        </Accordion>

        {/* Sort By Accordion */}
        <Accordion
          type="single"
          collapsible
          value={openSections.includes('sort') ? 'sort' : ''}
          onValueChange={(val) =>
            setOpenSections((prev) =>
              val ? [...prev.filter((v) => v !== 'sort'), val] : prev.filter((v) => v !== 'sort')
            )
          }
        >
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
                  <span>Highest Impact</span>
                </Label>
                <Label className="flex items-center space-x-2 font-normal">
                  <RadioGroupItem value="impact-asc" id="sort-impact-asc" />
                  <span>Lowest Impact</span>
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
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end space-x-2">
        <Button variant="outline" onClick={handleReset}>
          Reset All
        </Button>
        <Button
          className={
            isApplied
              ? 'border border-green-600 text-green-600 bg-white hover:bg-green-50'
              : 'bg-green-600 text-white hover:bg-green-700'
          }
          onClick={handleApply}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  )
}
