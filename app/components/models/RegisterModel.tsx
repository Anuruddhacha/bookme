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
import { signIn } from 'next-auth/react'
import useLoginModel from '@/app/hooks/useLoginModel'



const RegisterModel = () => {

    const registerModel = useRegisterModel()
    const loginModel = useLoginModel()

    const [isLoading,setIsLoading] = useState(false)

    const toggle = useCallback(()=>{
      registerModel.onClose()
      loginModel.onOpen()
    },[loginModel,registerModel])

    const {
        register,
        handleSubmit,
        formState:{
            errors, 
        }
    } = useForm<FieldValues>({
      defaultValues:{
        name:'',
        email:'',
        password:''
      }
    })

    const onSubmit:SubmitErrorHandler<FieldValues> = (data)=>{
        setIsLoading(true)
        axios.post('/api/register',data)
        .then(()=>{
            registerModel.onClose()
        }).catch((error)=>{
           toast.error("Something went wrong")
        }).finally(()=>{
            setIsLoading(false)
        })

    }

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
            <div>Already have an account?</div>
            <div onClick={toggle}
             className='
            text-neutral-800
              cursor-pointer
              text-center'>Log in</div>
            </div>
           </div>




        </div>
    )


    const bodyContent = (
        <div className="flex flex-col gap-4">
        <Heading center title='Welcome to AuraInns'
        subtitle='Create an account'/>

        <Input id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          />

       <Input id="name"
          label="Name"
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
    title='Register'
    actionlabel='Continue'
    isOpen={registerModel.isOpen}
    onClose={registerModel.onClose}
    onSubmit={handleSubmit(onSubmit)}
    disabled={isLoading}/>
  )
}

export default RegisterModel