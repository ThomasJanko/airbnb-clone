import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BannerIcons from '../components/BannerIcons'
import Places from '../components/places/Places'

const Home: NextPage = () => {
  return (
    <div className=" min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>AirbBnb</title>
        <link rel="icon" href="/assets/airBnbLogo.png" />
      </Head>

    <Header/>
    <BannerIcons/>
    <Places/>
    <Footer/>
    
    
    </div>
  )
}

export default Home
