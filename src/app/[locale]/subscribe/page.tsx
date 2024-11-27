'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useCallback, useState } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Spinner } from '@/components/ui/spinner'
import { EntityConsole } from '@/lib/entity-console'
import { useRegister } from '@/queries/register'
import {
  useEmail,
  useFirstName,
  useLastName,
  usePassword,
  useRegisterStore,
  useSetEmail,
  useSetFirstName,
  useSetLastName,
  useSetPassword,
} from '@/store/registerStore'

const Step1Content = () => {
  const t = useTranslations('Subscribe')

  const [approved, setApproved] = useState(false)
  const router = useRouter()
  const email = useEmail()
  const setEmail = useSetEmail()
  const password = usePassword()
  const setPassword = useSetPassword()
  const firstname = useFirstName()
  const setFirstname = useSetFirstName()
  const lastname = useLastName()
  const setLastname = useSetLastName()
  const store = useRegisterStore()
  const { mutate, isLoading } = useRegister()

  const onOK = useCallback(() => {
    mutate(store, {
      onError: (err: Error) => {
        EntityConsole.error('error = ', err)
      },
      onSuccess: () => {
        router.back()
      },
    })
  }, [mutate, router, store])

  const onCancel = useCallback(() => {
    router.back()
  }, [router])

  return (
    <Card className="mx-auto my-20 w-[600px]">
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
            <div className="flex flex-col space-y-1.5">
              <span>{t('firstname')}</span>
              <Input
                id="firstname"
                placeholder="John"
                value={firstname}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  setFirstname(event.currentTarget.value)
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <span>{t('lastname')}</span>
              <Input
                id="lastname"
                placeholder="Doe"
                value={lastname}
                onInput={(event: React.FormEvent<HTMLInputElement>) =>
                  setLastname(event.currentTarget.value)
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={approved}
                  onCheckedChange={(checked: boolean) => {
                    setApproved(checked)
                  }}
                />
                <span className="leading-none">{t('terms')}</span>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-row justify-between gap-3">
        <Button variant="outline" onClick={onOK} disabled={!approved}>
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
          <Step1Content />
        </QueryClientProvider>
      </ErrorBoundary>
    </main>
  )
}
