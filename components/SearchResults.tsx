import { University } from '@/app/types'
import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

async function getUniversities(query: string): Promise<University[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    {
      id: 1,
      name: 'Technical University of Munich',
      country: 'Germany',
      description: 'One of Europe\'s top universities for engineering and technology.',
      website: 'https://www.tum.de/en/',
      scholarships: [
        {
          name: 'TUM Scholarship for International Students',
          amount: '€850 per month',
          deadline: 'October 31st for Winter Semester'
        }
      ]
    },
    {
      id: 2,
      name: 'KU Leuven',
      country: 'Belgium',
      description: 'Belgium\'s highest-ranked university, known for research excellence.',
      website: 'https://www.kuleuven.be/english/',
      scholarships: [
        {
          name: 'Science@Leuven Scholarship',
          amount: '€10,000 per year',
          deadline: 'February 15th'
        }
      ]
    },
    {
      id: 3,
      name: 'Uppsala University',
      country: 'Sweden',
      description: 'Scandinavia\'s first university, founded in 1477.',
      website: 'https://www.uu.se/en',
      scholarships: [
        {
          name: 'Uppsala IPK Scholarship',
          amount: 'Full tuition + living expenses',
          deadline: 'January 20th'
        }
      ]
    },
    {
      id: 4,
      name: 'University of Copenhagen',
      country: 'Denmark',
      description: 'Denmark\'s largest research and education institution.',
      website: 'https://www.ku.dk/english/',
      scholarships: [
        {
          name: 'University of Copenhagen Scholarship',
          amount: 'Full tuition + €950 monthly',
          deadline: 'March 1st'
        }
      ]
    },
    {
      id: 5,
      name: 'Delft University of Technology',
      country: 'Netherlands',
      description: 'Leading technical university in the Netherlands.',
      website: 'https://www.tudelft.nl/en/',
      scholarships: [
        {
          name: 'Justus & Louise van Effen Excellence Scholarship',
          amount: '€30,000 per year',
          deadline: 'December 1st'
        }
      ]
    }
  ]
}

export default async function SearchResults({ query }: { query: string }) {
  const universities = await getUniversities(query)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Universities with available scholarships:
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {universities.map((university) => (
            <motion.div
              key={university.id}
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
          ))}
        </div>
      </div>
    </div>
  )
}