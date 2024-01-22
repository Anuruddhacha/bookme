"use client"
import React, { useCallback, useState } from 'react'
import axios from 'axios'
import useRegisterModel from '@/app/hooks/useRegisterModel'
import { FieldValues, SubmitErrorHandler, useForm } from 'react-hook-form'
import Model from './Model'
import Heading from '../Heading'
import Input from '../inputs/Input'
import toast from 'react-hot-toast'
import Button from '../Button'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import useLoginModel from '@/app/hooks/useLoginModel'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'



const LoginModel = () => {

    const registerModel = useRegisterModel()
    const loginModel = useLoginModel()
    const router = useRouter()


    const [isLoading,setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState:{
            errors, 
        }
    } = useForm<FieldValues>({
      defaultValues:{
        email:'',
        password:''
      }
    })

    const onSubmit:SubmitErrorHandler<FieldValues> = (data)=>{
        setIsLoading(true)
        
        signIn('credentials',{
          ...data,
          redirect:false
        }).then((callback)=>{
          setIsLoading(false)

          if(callback?.ok){
            toast.success('Logged in')
             router.refresh()
             loginModel.onClose()
          }
          if(callback?.error){
            toast.error(callback.error)
          }
        })

    }


  const toggle = useCallback(()=>{
    loginModel.onClose()
    registerModel.onOpen()
  },[loginModel,registerModel])



    const footerContent = (
       <div className="flex flex-col gap-4 mt-3">
          <hr />
         
           <Button
           outline
           label='Contonue with Google'
           icon={FcGoogle}
           onClick={()=>signIn('google')}
           />

          <Button
           outline
           label='Contonue with Github'
           icon={AiFillGithub}
           onClick={()=>signIn('github')}
           />

           <div className="text-neutral-500
           text-center
           mt-4
           font-light
           ">
            <div className="flex justify-center flex-row items-center gap-2">
            <div>Dont have an account?</div>
            <div onClick={toggle}
             className='
            text-neutral-800
              cursor-pointer
              text-center'>Sign Up</div>
            </div>
           </div>




        </div>
    )


    const bodyContent = (
        <div className="flex flex-col gap-4">
        <Heading center title='Welcome back'
        subtitle='Login to your account'/>

        <Input id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          />


        <Input id="password"
          label="Password"
          type='password'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          />



        </div>
    )





  return (
    <Model
    body={bodyContent}
    footer={footerContent}
    title='Login'
    actionlabel='Continue'
    isOpen={loginModel.isOpen}
    onClose={loginModel .onClose}
    onSubmit={handleSubmit(onSubmit)}
    disabled={isLoading}/>
  )
}

export default LoginModel