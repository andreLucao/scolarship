// app/page.tsx
import SearchForm from '@/components/SearchForm'
import ChatbotButton from '@/components/ChatbotButton'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 flex flex-col min-h-screen">
        <div className="mt-8">
          
        </div>
     
        <div className="flex-1 flex items-center justify-center -mt-20">
          <SearchForm />
        </div>

        {/*<ChatbotButton />*/}

        <Navbar />
      </main>
    </div>
  );
}