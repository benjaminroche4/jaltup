'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface StepProps {
  index: number
  title: string
  description?: string
  selected?: boolean
}

const Index = ({ index, selected = false }: { index: number; selected?: boolean }) => {
  const className = selected
    ? 'border-[#028B77] dark:border-[#028B77]'
    : 'border-gray-400 dark:border-gray-300'

  return (
    <span
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2',
        className,
      )}
    >
      {index}
    </span>
  )
}

const Step = ({ index, title, description, selected = false }: StepProps) => {
  const className = selected
    ? 'text-[#028B77] dark:text-[#028B77]'
    : 'text-gray-400 dark:text-gray-300'

  return (
    <li className={cn('flex items-center space-x-2.5 rtl:space-x-reverse', className)}>
      <Index index={index} selected={selected} />
      <span>
        <h3 className="font-medium leading-tight">{title}</h3>
        {description ? <p className="text-sm">{description}</p> : null}
      </span>
    </li>
  )
}

export interface StepperProps {
  id: string
  steps: Omit<StepProps, 'index' | 'selected'>[]
  current?: number
  className?: string
}

const Stepper = ({ id, steps, current = 1, className }: StepperProps) => (
  <ol
    id={id}
    className={cn(
      'w-full items-center space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse',
      className,
    )}
  >
    {steps.map((step, index) => (
      <Step
        // eslint-disable-next-line react/no-array-index-key
        key={`${id}_${index}`}
        index={index + 1}
        title={step.title}
        description={step.description}
        selected={index + 1 === current}
      />
    ))}
  </ol>
)

export { Stepper }
