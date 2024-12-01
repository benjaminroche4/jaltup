'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useCallback, useState } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { Stepper } from '@/components/ui/stepper'
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

const useValidator = (confirmPassword: string, user: User): string | undefined => {
  const t = useTranslations('Register')

  if (!emailValidator(user.email)) {
    return t('wrongEmail')
  }

  if (!passwordValidator(user.password ?? '')) {
    return t('wrongPassword')
  }

  if (user.password !== confirmPassword) {
    return t('wrongNotConfirmed')
  }

  if (!stringValidator(user.firstName ?? '')) {
    return t('wrongFirstName')
  }

  if (!stringValidator(user.lastName ?? '')) {
    return t('wrongLastName')
  }

  return undefined
}

const LevelSelector = ({
  level,
  setLevel,
}: {
  level: string | undefined
  setLevel: (level: string) => void
}) => (
  <Select onValueChange={setLevel} defaultValue={level}>
    <SelectTrigger className="w-[180px]">
      <SelectValue />
    </SelectTrigger>
    <SelectContent id="level">
      <SelectItem value="Sans diplôme">Sans diplôme</SelectItem>
      <SelectItem value="BEP">BEP</SelectItem>
      <SelectItem value="CAP">CAP</SelectItem>
      <SelectItem value="Bac">Bac</SelectItem>
      <SelectItem value="Bac+2">Bac+2</SelectItem>
      <SelectItem value="Bac+3">Bac+3</SelectItem>
      <SelectItem value="Bac+4">Bac+4</SelectItem>
      <SelectItem value="Bac+5">Bac+5</SelectItem>
      <SelectItem value="Bac+8">Bac+8</SelectItem>
    </SelectContent>
  </Select>
)

const Step1Content = ({
  confirmPassword,
  setConfirmPassword,
}: {
  confirmPassword: string
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>
}) => {
  const t = useTranslations('Register')
  const store = useRegisterStore()
  const email = useEmail()
  const setEmail = useSetEmail()
  const password = usePassword()
  const setPassword = useSetPassword()
  const firstname = useFirstName()
  const setFirstname = useSetFirstName()
  const lastname = useLastName()
  const setLastname = useSetLastName()
  const validatorError = useValidator(confirmPassword, store)

  return (
    <div>
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
              maxLength={30}
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
              maxLength={30}
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
      <div className="mt-4 h-12 text-red-600">{validatorError}</div>
    </div>
  )
}

const Step2Content = () => {
  const t = useTranslations('Register')

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
          <LevelSelector level={level} setLevel={setLevel} />
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

const Step3Content = ({
  approved,
  setApproved,
}: {
  approved: boolean
  setApproved: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const t = useTranslations('Register')

  return (
    <div className="flex h-16 items-center space-x-2">
      <Checkbox
        id="terms"
        checked={approved}
        onCheckedChange={(checked: boolean) => {
          setApproved(checked)
        }}
      />
      <span className="leading-none">{t('terms')}</span>
    </div>
  )
}

const SubscribeContent = () => {
  const t = useTranslations('Register')

  const [approved, setApproved] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()
  const store = useRegisterStore()
  const { mutate, isLoading, error } = useRegister()
  const validatorError = useValidator(confirmPassword, store)
  const [index, setIndex] = useState(1)

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
        <Stepper
          id={''}
          steps={[
            {
              title: t('step1'),
            },
            {
              title: t('step2'),
            },
            {
              title: t('step3'),
            },
          ]}
          current={index}
          className="my-3"
        />
        {index === 1 ? (
          <div className="mt-5 flex flex-col gap-5">
            <Step1Content
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />
            <div className="my-2 flex flex-row justify-between gap-3">
              <Button variant="outline" onClick={onCancel}>
                {t('cancel')}
              </Button>
              <Button
                disabled={validatorError !== undefined}
                onClick={() => {
                  setIndex(2)
                }}
              >
                {t('next')}
              </Button>
            </div>
          </div>
        ) : index === 2 ? (
          <div className="mt-5 flex flex-col gap-5">
            <Step2Content />
            <div className="my-2 flex flex-row justify-between gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIndex(1)
                }}
              >
                {t('prev')}
              </Button>
              <Button
                onClick={() => {
                  setIndex(3)
                }}
              >
                {t('next')}
              </Button>
            </div>
          </div>
        ) : index == 3 ? (
          <div className="mt-5 flex flex-col gap-5">
            <Step3Content approved={approved} setApproved={setApproved} />
            <div className="h-16 text-red-600">
              {error ? `${t('failedToRegister')} : ${error.message}` : undefined}
            </div>
            <div className="my-2 flex flex-row justify-between gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIndex(2)
                }}
              >
                {t('prev')}
              </Button>
              <Button onClick={onOK} disabled={!approved}>
                {isLoading ? <Spinner size="small" /> : t('submit')}
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
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
