import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to GramChain</h1>
      <div className="flex justify-center gap-8">
        <Link href="/investor" className="btn btn-primary">
          I'm an Investor
        </Link>
        <Link href="/entrepreneur" className="btn btn-secondary">
          I'm an Entrepreneur
        </Link>
      </div>
    </main>
  )
}