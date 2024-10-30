/* eslint-disable @typescript-eslint/no-explicit-any */

export class EntityConsole {
  private static env = process.env.NODE_ENV

  private static isDev() {
    return EntityConsole.env == 'development'
  }

  public static log(message?: any, ...optionalParams: any[]) {
    if (EntityConsole.isDev()) {
      // eslint-disable-next-line
      console.log(message, ...optionalParams)
    }
  }

  public static warn(message?: any, ...optionalParams: any[]) {
    if (EntityConsole.isDev()) {
      // eslint-disable-next-line
      console.warn(message, ...optionalParams)
    }
  }

  public static error(message?: any, ...optionalParams: any[]) {
    if (EntityConsole.isDev()) {
      // eslint-disable-next-line
      console.error(message, ...optionalParams)
    }
  }
}
