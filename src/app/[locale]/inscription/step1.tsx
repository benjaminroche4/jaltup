'use client'

import { useTranslations } from 'next-intl'
import * as React from 'react'
import { useValidator } from '@/app/[locale]/inscription/validator'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
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

export const Step1Content = ({
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
