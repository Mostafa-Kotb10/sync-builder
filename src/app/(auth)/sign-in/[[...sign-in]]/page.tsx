import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <main className='h-screen flex items-center justify-center p-3'>
        <SignIn />
    </main>
  )
}

export default page;