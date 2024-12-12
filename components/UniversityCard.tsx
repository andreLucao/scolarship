// components/UniversityCard.tsx
'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { University } from '@/app/types'

export function UniversityCard({ university }: { university: University }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{university.name}</h3>
          <p className="text-blue-600 font-medium">{university.country}</p>
        </div>
        <a
          href={university.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-500 transition-colors"
        >
          <ExternalLink size={20} />
        </a>
      </div>
      <p className="text-gray-600 mb-4">{university.description}</p>
      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-800 mb-2">Available Scholarships:</h4>
        {university.scholarships.map((scholarship, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3 mb-2">
            <p className="font-medium text-gray-800">{scholarship.name}</p>
            <div className="text-sm text-gray-600 mt-1">
              <p>Amount: {scholarship.amount}</p>
              <p>Deadline: {scholarship.deadline}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
