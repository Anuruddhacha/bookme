"use client"
import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar'
import MenuItem from './MenuItem'
import useRegisterModel from '@/app/hooks/useRegisterModel'
import useLoginModel from '@/app/hooks/useLoginModel'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import useRentModel from '@/app/hooks/useRentModel'
import { useRouter } from 'next/navigation'


interface UserMenuProps{
  currentUser?:SafeUser|null;
}

const UserMenu:React.FC<UserMenuProps> = ({currentUser}) => {

const registerModel = useRegisterModel()
const loginModel = useLoginModel()
const rentModel = useRentModel()


 const onRent = useCallback(()=>{
  if(!currentUser){
    return loginModel.onOpen()
  }
  rentModel.onOpen()
 },[currentUser,loginModel])



    const [isOpen,setIsOpen] = useState(false)

    const toggleMenu = useCallback(()=>{
        setIsOpen((value) => !value)
    },[])
   const router = useRouter()




  return (
    <div className='realtive'>
     <div className="flex flex-row items-center gap-3">
     
     <div
     onClick={onRent}
     className='hidden md:block text-sm font-semibold
     py-3 px-4 rounded-full hover:bg-neutral-100
     transition cursor-pointer'
     >
        Airbnb your home
     </div>

     <div
     onClick={toggleMenu}
     className='p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                rounded-full
                gap-3
                transition
                hover:shadow-md
                cursor-pointer'
     >
       <AiOutlineMenu/>
       <div className="hidden md:block">
        <Avatar src={currentUser?.image}/>
       </div>
     </div>


     </div>
     {isOpen  && (
        <div className="
        absolute
        rounded-xl
        shadow-md
        w-[40vw]
        md:w-1/4
        bg-white
        overflow-hidden
        right-0
        top-12
        text-sm
        ">
    <div className="flex flex-col cursor-pointer">
    {currentUser ?   (<>
      <MenuItem
      onClick={()=>router.push('/trips')}
      label='My trips'
      />
       <MenuItem
      onClick={()=>router.push('/favorites')}
      label='My favorites'
      />
       <MenuItem
      onClick={()=>router.push('/reservations')}
      label='My reservations'
      />
       <MenuItem
      onClick={()=>router.push('/properties')}
      label='My properties'
      />
       <MenuItem
      onClick={onRent}
      label='Airbnb my home'
      />

      <hr />
      <MenuItem
      onClick={()=>signOut()}
      label='Logout'
      />
      </>) : (<>
      <MenuItem
      onClick={loginModel.onOpen}
      label='Login'
      />
       <MenuItem
      onClick={registerModel.onOpen}
      label='Sign Up'
      />
      </>)}

    </div>


        </div>
     )}

    </div>
  )
}

export default UserMenu