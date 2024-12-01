'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useCallback, useState } from 'react'
import { Step1Content } from '@/app/[locale]/inscription/step1'
import { Step2Content } from '@/app/[locale]/inscription/step2'
import { Step3Content } from '@/app/[locale]/inscription/step3'
import { useValidator } from '@/app/[locale]/inscription/validator'
import { ErrorBoundary } from '@/components/error-boundary'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { Stepper } from '@/components/ui/stepper'
import { EntityConsole } from '@/lib/entity-console'
import { useRegister } from '@/queries/register'
import { useRegisterStore } from '@/store/registerStore'

const RegisterContent = () => {
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
          <RegisterContent />
        </QueryClientProvider>
      </ErrorBoundary>
    </main>
  )
}
