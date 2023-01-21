import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/layout/Header'
import BannerIcons from '../components/layout/BannerIcons'

const Home: NextPage = () => {
  return (
    <div className=" min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>AirbBnb</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <Header/>
    <BannerIcons/>
    
    </div>
  )
}

export default Home
