import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const Home: NextPage = () => {
  return (
    <div className='flex flex-col justify-center h-screen min-h-screen'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-col items-center">        
        <h1 className="text-white">
          {'<<< ZORA >>>'}
        </h1>
      </main>
    </div>
  )
}

export default Home
