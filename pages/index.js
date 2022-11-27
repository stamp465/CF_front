import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='h-screen w-screen bg-red-100 flex flex-col justify-center items-center gap-8'>
      <h1 className="text-5xl font-bold text-center ">
        Welcome to CF TeamBuild
      </h1>
      <div className='flex flex-row justify-center'>
        <p>
          <h3 className='text-center text-xl font-bold'>V 1.0</h3>
          <ul className="list-disc list-inside">
            <li>Have useful function</li>
            <li>Now for window mode</li>
            <li>Not responsive</li>
          </ul>
        </p>
      </div>

      <Link href="/dashboard">
        <button className="btn btn-outline font-bold text-xl border-4">Dashboard V 1.0 →</button>
      </Link>
    </div>
  )
}

