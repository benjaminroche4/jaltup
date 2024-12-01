'use client'

import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  useCity,
  useLevel,
  useSchool,
  useSetCity,
  useSetLevel,
  useSetSchool,
} from '@/store/registerStore'

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

export const Step2Content = () => {
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
