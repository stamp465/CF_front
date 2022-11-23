import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className='h-screen w-screen bg-red-100 flex items-center'>
      <h1 className="text-5xl font-bold text-center w-full">
        Welcome to CF TeamBuild
      </h1>
    </div>
  )
}

