'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Spinner } from '@/components/ui/spinner'
import { setSession } from '@/lib/auth-service'
import { EntityConsole } from '@/lib/entity-console'
import { useLogin } from '@/queries/login'

const LoginContent = () => {
  const t = useTranslations('Login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setSisabled] = useState(true)
  const { mutate, isLoading, isError, error } = useLogin()
  const router = useRouter()

  useEffect(() => {
    setSisabled(email.length === 0 || password.length === 0)
  }, [email.length, password.length])

  const onOK = useCallback(() => {
    mutate(
      {
        email,
        password,
      },
      {
        onError: (err: Error) => {
          EntityConsole.error('error = ', err)
        },
        onSuccess: (data) => {
          setSession(data)
          router.replace('/')
        },
      },
    )
  }, [mutate, email, password, router])

  const onCancel = useCallback(() => {
    router.back()
  }, [router])

  return (
    <Card className="mx-auto my-20 w-[350px]">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <span>{t('email')}</span>
              <Input
                id="email"
                placeholder="jdoe@domain.com"
                value={email}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  setEmail(event.currentTarget.value)
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <span>{t('password')}</span>
              <PasswordInput
                id="password"
                placeholder="password"
                value={password}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  setPassword(event.currentTarget.value)
                }
              />
            </div>
          </div>
        </form>
        {isError && error ? (
          <div className="my-3 text-red-600">
            {t('failedToLogin')} : {error.message}
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onOK} disabled={disabled}>
          {isLoading ? <Spinner size="small" /> : t('submit')}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          {t('cancel')}
        </Button>
      </CardFooter>
    </Card>
  )
}

// eslint-disable-next-line import/no-default-export
export default function Page() {
  const queryClient = new QueryClient()

  return (
    <main>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <LoginContent />
        </QueryClientProvider>
      </ErrorBoundary>
    </main>
  )
}
