import { Input } from "@/components/ui/input"
import React from 'react'
import { FormField, FormLabel, FormControl, FormMessage } from './form'
import { Control, FieldPath} from 'react-hook-form'
import { z } from 'zod'
import {authFormSchema} from '@/lib/utils'

// call shema with sign in type to get all form fields
const formShema = authFormSchema("sign-up");
interface CustomInput{
    control: Control<z.infer<typeof formShema>>,
    name: FieldPath<z.infer<typeof formShema>>,
    label: string,
    placeholder: string

}

const CustomInput = ({control, name , label, placeholder}:CustomInput) => {
  return (
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <div className="form-item">
                        <FormLabel className="form-label">
                            {label}
                        </FormLabel>
                        <div className="flex w-full flex-col">
                            <FormControl>
                                <Input 
                                    placeholder={placeholder}
                                    className="input-class"
                                    type={name==="password" 
                                        ? "password" : "text"}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="form-message mt-2"/>
                        </div>
                    </div>
                )}
            />
  )
}

export default CustomInput