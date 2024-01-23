import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModel from './components/models/RegisterModel'
import ToasterProvider from './components/providers/ToasterProvider'
import LoginModel from './components/models/LoginModel'
import getCurrentUser from './actions/getCurrentUser'
import RentModel from './components/models/RentModel'
import SearchModel from './components/models/SearchModel'

const font = Nunito({
 subsets:["latin"],
})


export const metadata: Metadata = {
  title: 'AuraInns',
  description: 'AuraInns',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()


  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <SearchModel/>
          <RentModel/>
          <LoginModel/>
          <RegisterModel/>
        <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
        </body>
    </html>
  )
}
