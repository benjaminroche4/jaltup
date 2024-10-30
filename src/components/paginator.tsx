'use client'

import { useTranslations } from 'next-intl'
import * as React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useCurrentPage, useSetCurrentPage, useTotalPages } from '@/store/filtersStore'

interface PaginatorProps {
  showPreviousNext: boolean
}

const generatePaginationLinks = (
  currentPage: number,
  totalPages: number,
  onPageChange: (page: number) => void,
) => {
  const pages: JSX.Element[] = []

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink href="#" onClick={() => onPageChange(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }
  } else {
    for (let i = 1; i <= 2; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink href="#" onClick={() => onPageChange(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }
    if (2 < currentPage && currentPage < totalPages - 1) {
      pages.push(<PaginationEllipsis />)
      pages.push(
        <PaginationItem key={currentPage}>
          <PaginationLink href="#" onClick={() => onPageChange(currentPage)} isActive={true}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>,
      )
    }
    pages.push(<PaginationEllipsis />)
    for (let i = totalPages - 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink href="#" onClick={() => onPageChange(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }
  }
  return pages
}

export const Paginator = ({ showPreviousNext }: PaginatorProps) => {
  const t = useTranslations()
  const currentPage = useCurrentPage()
  const totalPages = useTotalPages()
  const setCurrentPage = useSetCurrentPage()

  const showPrevious = showPreviousNext && totalPages && currentPage - 1 > 0
  const showNext = showPreviousNext && totalPages && currentPage < totalPages

  return (
    <Pagination>
      <PaginationContent>
        {showPrevious ? (
          <PaginationItem>
            <PaginationPrevious
              label={t('Common.prev')}
              href="#"
              onClick={() => setCurrentPage(currentPage - 1)}
            />
          </PaginationItem>
        ) : null}
        {generatePaginationLinks(currentPage, totalPages, setCurrentPage)}
        {showNext ? (
          <PaginationItem>
            <PaginationNext
              label={t('Common.next')}
              href="#"
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  )
}
