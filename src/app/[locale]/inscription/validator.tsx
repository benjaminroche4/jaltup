import { useTranslations } from 'next-intl'
import { emailValidator, passwordValidator, stringValidator } from '@/lib/utils'
import { User } from '@/model/user'

export const useValidator = (confirmPassword: string, user: User): string | undefined => {
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
