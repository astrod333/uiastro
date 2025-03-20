'use client';

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/extendui/button';
import { Input } from '@/components/extendui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})

type SignInValues = z.infer<typeof signInSchema>

export default function SignIn02() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const emailValue = watch('email')
  const passwordValue = watch('password')

  const onSubmit = (data: SignInValues) => {
    toast.success(<pre>{JSON.stringify(data, null, 2)}</pre>);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      <motion.div
        layout
        animate={{
          width: isOpen ? 300 : 36,
          height: isOpen ? 480 : 36,
          borderRadius: isOpen ? 10 : 50,
        }}
        transition={{ duration: 0.15, ease: "easeInOut" }}  // Reduced from 0.2 to 0.15
        className="bg-card flex justify-center items-center overflow-hidden rounded-full border text-card-foreground shadow"
        style={{ 
          position: isOpen ? 'fixed' : 'relative',
          right: isOpen ? '20px' : 'auto',
          top: isOpen ? '80px' : '-12px',
          zIndex: isOpen ? 30 : 'auto'
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.1 }}  // Reduced from 0.15 to 0.1
              className="w-full h-full px-3 py-2"  // Removed overflow-y-auto and adjusted padding
            >
              <Card className="mx-auto bg-card shadow-none border-none">  {/* Changed from bg-transparent to bg-card */}
                <CardHeader className="pb-2 space-y-1">
                  <CardTitle className="text-lg">Login</CardTitle>
                  <CardDescription className="text-xs"> 
                    Enter your email below to login to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete='off'>
                    <div className="space-y-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register('email')}
                        value={emailValue}
                        onChange={(e) => setValue('email', e.target.value)}
                      >
                        <Input.Group>
                          <Input.Label>Email</Input.Label>
                          <Input.ClearButton onClick={() => setValue('email', '')} />
                        </Input.Group>
                      </Input>
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Input
                        id="password"
                        type={'password'}
                        placeholder="Enter your password"
                        {...register('password')}
                        value={passwordValue}
                        onChange={(e) => setValue('password', e.target.value)}
                      >
                        <Input.Group>
                          <Input.Label>Password</Input.Label>
                          <Input.ClearButton onClick={() => setValue('password', '')} />
                          <Input.PasswordToggle />
                        </Input.Group>
                      </Input>
                      {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                      )}
                      <div className="flex items-center justify-end">
                        <Link href="#" className="text-sm underline">
                          Forgot your password?
                        </Link>
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Sign In</Button>
                  </form>
                  <Button variant="outline" className="w-full mt-4">
                    Login with Google
                  </Button>
                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="#" className="underline">
                      Sign up
                    </Link>
                  </div>
                  <Button
                    className="mt-4 w-full"
                    variant="ghost"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1, delay: 0.1 }}  // Reduced both duration and delay from 0.15 to 0.1
            >
              <Button
                className='text-black bg-white shadow-none rounded-full hover:bg-white dark:hover:bg-black dark:bg-black dark:text-white'
                size={'icon'}
                onClick={() => setIsOpen(true)}
              >
                <User />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}