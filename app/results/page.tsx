// app/results/page.tsx
import { Suspense } from 'react'
import { University } from '@/app/types'
import { UniversityCard } from '@/components/UniversityCard'
import Loading from './loading'

async function getUniversities(): Promise<University[]> {
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

interface SearchResultsProps {
  searchParams: { q: string }
}

export default async function SearchResults({ searchParams }: SearchResultsProps) {
  const universities = await getUniversities(searchParams.q)

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Search Results
            </h2>
            <p className="text-gray-600">
              Found {universities.length} universities with available scholarships
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {universities.map((university) => (
              <UniversityCard key={university.id} university={university} />
            ))}
          </div>

          {universities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No universities found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  )
}