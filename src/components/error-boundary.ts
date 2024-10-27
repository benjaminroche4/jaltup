import React, { Component, ErrorInfo } from 'react'
import { ErrorPage } from '@/components/error-page'
import { EntityConsole } from '@/lib/entity-console'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    EntityConsole.error('ErrorBoundary caught an error: ', error, errorInfo)
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return ErrorPage()
    }

    return this.props.children
  }
}
