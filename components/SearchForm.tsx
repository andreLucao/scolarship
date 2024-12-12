'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface AdvancedFilters {
  priceRange: number;
  country: string;
  duration: string;
  field: string;
}

export default function SearchForm() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filters, setFilters] = useState<AdvancedFilters>({
    priceRange: 5000,
    country: '',
    duration: '',
    field: '',
  })
  const router = useRouter()

  const hasActiveFilters = () => {
    return filters.priceRange !== 5000 || 
           filters.country !== '' || 
           filters.duration !== '' || 
           filters.field !== ''
  }

  const isSearchEnabled = () => {
    return query.trim() !== '' || hasActiveFilters()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const searchParams = new URLSearchParams({
      ...(query && { q: query }),
      ...(filters.priceRange !== 5000 && { price: filters.priceRange.toString() }),
      ...(filters.country && { country: filters.country }),
      ...(filters.duration && { duration: filters.duration }),
      ...(filters.field && { field: filters.field }),
    })
    router.push(`/results?${searchParams.toString()}`)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">European Scholarship Search</h1>
        <p className="text-xl text-gray-600">
          The simpler way to finding scholarships for schools around Europe.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative mb-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for scholarships..."
            className="w-full px-6 py-4 text-lg text-gray-700 border-2 border-blue-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <motion.button
            type="submit"
            disabled={isLoading || !isSearchEnabled()}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-8 py-2 bg-blue-400 text-white rounded-full font-semibold transition-colors ${
              isLoading || !isSearchEnabled()
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-500'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Searching...</span>
              </div>
            ) : (
              'Search'
            )}
          </motion.button>
        </div>

        <motion.div 
          className="flex justify-center"
          initial={false}
        >
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
          >
            Advanced Search
            {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </motion.div>

        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-4 mt-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range: €{filters.priceRange.toLocaleString()}
                  </label>
                  <style jsx>{`
                    input[type='range'] {
                      -webkit-appearance: none;
                      width: 100%;
                      height: 8px;
                      border-radius: 5px;
                      background: ${`linear-gradient(to right, #60A5FA 0%, #60A5FA ${(filters.priceRange / 30000) * 100}%, #e5e7eb ${(filters.priceRange / 30000) * 100}%, #e5e7eb 100%)`};
                    }

                    input[type='range']::-webkit-slider-thumb {
                      -webkit-appearance: none;
                      appearance: none;
                      width: 18px;
                      height: 18px;
                      border-radius: 50%;
                      background: white;
                      border: 2px solid #60A5FA;
                      cursor: pointer;
                      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                      transition: all 0.15s ease;
                    }

                    input[type='range']::-webkit-slider-thumb:hover {
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                      transform: scale(1.1);
                    }

                    input[type='range']::-moz-range-thumb {
                      width: 18px;
                      height: 18px;
                      border-radius: 50%;
                      background: white;
                      border: 2px solid #60A5FA;
                      cursor: pointer;
                      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                      transition: all 0.15s ease;
                    }

                    input[type='range']::-moz-range-thumb:hover {
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                      transform: scale(1.1);
                    }

                    input[type='range']::-moz-range-progress {
                      background: #60A5FA;
                      height: 8px;
                      border-radius: 5px;
                    }
                  `}</style>
                  <input
                    type="range"
                    min="0"
                    max="30000"
                    step="1000"
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: parseInt(e.target.value) })}
                    className="w-full cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>€0</span>
                    <span>€30,000+</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <select
                      value={filters.country}
                      onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    >
                      <option value="">Any</option>
                      <option value="germany">Germany</option>
                      <option value="france">France</option>
                      <option value="netherlands">Netherlands</option>
                      <option value="sweden">Sweden</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <select
                      value={filters.duration}
                      onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    >
                      <option value="">Any</option>
                      <option value="1-semester">1 Semester</option>
                      <option value="1-year">1 Year</option>
                      <option value="2-years">2 Years</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                    <select
                      value={filters.field}
                      onChange={(e) => setFilters({ ...filters, field: e.target.value })}
                      className="w-full p-2 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    >
                      <option value="">Any</option>
                      <option value="engineering">Engineering</option>
                      <option value="business">Business</option>
                      <option value="science">Science</option>
                      <option value="arts">Arts</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  )
}