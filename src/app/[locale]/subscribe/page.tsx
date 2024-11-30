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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EntityConsole } from '@/lib/entity-console'
import { emailValidator, passwordValidator, stringValidator } from '@/lib/utils'
import { User } from '@/model/user'
import { useRegister } from '@/queries/register'
import {
  useCity,
  useEmail,
  useFirstName,
  useLastName,
  useLevel,
  usePassword,
  useRegisterStore,
  useSchool,
  useSetCity,
  useSetEmail,
  useSetFirstName,
  useSetLastName,
  useSetLevel,
  useSetPassword,
  useSetSchool,
} from '@/store/registerStore'

const useValidator = (
  approved: boolean,
  confirmPassword: string,
  user: User,
): string | undefined => {
  const t = useTranslations('Subscribe')

  if (!emailValidator(user.email)) {
    return t('wrongEmail')
  }

  if (!passwordValidator(user.password ?? '')) {
    return t('wrongPassword')
  }

  if (!stringValidator(user.firstName ?? '')) {
    return t('wrongFirstName')
  }

  if (!stringValidator(user.lastName ?? '')) {
    return t('wrongLastName')
  }

  if (user.password !== confirmPassword) {
    return t('wrongNotConfirmed')
  }

  if (!approved) {
    return t('wrongNotApproved')
  }

  return undefined
}

const Step1Content = ({
  confirmPassword,
  setConfirmPassword,
}: {
  confirmPassword: string
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>
}) => {
  const t = useTranslations('Subscribe')

  const email = useEmail()
  const setEmail = useSetEmail()
  const password = usePassword()
  const setPassword = useSetPassword()
  const firstname = useFirstName()
  const setFirstname = useSetFirstName()
  const lastname = useLastName()
  const setLastname = useSetLastName()

  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <span>{t('email')}</span>
          <Input
            id="email"
            placeholder="jdoe@domain.com"
            minLength={2}
            maxLength={50}
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
            minLength={2}
            maxLength={20}
            value={password}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setPassword(event.currentTarget.value)
            }
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <span>{t('confirmPassword')}</span>
          <PasswordInput
            id="confirmPassword"
            placeholder="confirmPassword"
            minLength={2}
            maxLength={20}
            value={confirmPassword}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setConfirmPassword(event.currentTarget.value)
            }
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <span>{t('firstname')}</span>
          <Input
            id="firstname"
            placeholder="John"
            minLength={2}
            maxLength={50}
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
            minLength={2}
            maxLength={50}
            value={lastname}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setLastname(event.currentTarget.value)
            }
          />
        </div>
      </div>
    </form>
  )
}

const Step2Content = () => {
  const t = useTranslations('Subscribe')

  const school = useSchool()
  const setSchool = useSetSchool()
  const level = useLevel()
  const setLevel = useSetLevel()
  const city = useCity()
  const setCity = useSetCity()

  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <span>{t('school')}</span>
          <Input
            id="school"
            minLength={2}
            maxLength={50}
            value={school}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setSchool(event.currentTarget.value)
            }
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <span>{t('level')}</span>
          <Input
            id="level"
            minLength={2}
            maxLength={50}
            value={level}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setLevel(event.currentTarget.value)
            }
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <span>{t('city')}</span>
          <Input
            id="city"
            minLength={2}
            maxLength={50}
            value={city}
            onInput={(event: React.FormEvent<HTMLInputElement>) =>
              setCity(event.currentTarget.value)
            }
          />
        </div>
      </div>
    </form>
  )
}

const SubscribeContent = () => {
  const t = useTranslations('Subscribe')

  const [approved, setApproved] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()
  const store = useRegisterStore()
  const { mutate, isLoading, isError, error } = useRegister()

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

  const validatorError = useValidator(approved, confirmPassword, store)

  return (
    <Card className="mx-auto my-20 w-[600px]">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Step1Content
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />
          </TabsContent>
          <TabsContent value="details">
            <Step2Content />
          </TabsContent>
        </Tabs>
        <div className="mt-6 flex flex-col">
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
        {(isError && error) || validatorError ? (
          <div className="my-3 text-red-600">
            {validatorError ?? `${t('failedToLogin')} : ${error?.message}`}
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="flex flex-row justify-between gap-3">
        <Button variant="outline" onClick={onOK} disabled={validatorError !== undefined}>
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
          <SubscribeContent />
        </QueryClientProvider>
      </ErrorBoundary>
    </main>
  )
}
