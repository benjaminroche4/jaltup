import secureLocalStorage from 'react-secure-storage'
import { EntityConsole } from '@/lib/entity-console'

interface EntityStorageType<T> {
  value: T
  date?: number
}

const isClientSide = () => typeof window !== 'undefined'

// eslint-disable-next-line import/no-default-export
export default class EntityStorage {
  public static set<T>(
    key: string,
    value: T,
    expirationDate?: number, // timestamp in milliseconds
  ) {
    const data: EntityStorageType<T> = expirationDate ? { value, date: expirationDate } : { value }
    EntityConsole.log(`[EntityStorage] set :`, key)

    if (isClientSide() && process.env.NODE_ENV == 'development') {
      localStorage.setItem(key, JSON.stringify(data))
    } else {
      secureLocalStorage.setItem(key, data)
    }
  }

  public static get<T>(key: string): T | undefined {
    let data = null

    if (isClientSide() && process.env.NODE_ENV == 'development') {
      const value = localStorage.getItem(key)
      if (value !== null) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        data = JSON.parse(value) as EntityStorageType<T> | null
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      data = secureLocalStorage.getItem(key) as EntityStorageType<T> | null
    }
    if (data) {
      EntityConsole.log(`[EntityStorage] Get key ${key}`)

      // no expiration
      if (!data.date && data.date !== 0) {
        return data.value
      }

      // expiration not reached
      if (data.date > Date.now()) {
        return data.value
      }

      EntityConsole.log(`[EntityStorage] Key ${key} has expired ${data.date} > ${Date.now()}`)
      EntityStorage.remove(key)
    }

    return undefined
  }

  public static remove(key: string) {
    EntityConsole.log(`[EntityStorage] remove : ${key}`)
    if (isClientSide() && process.env.NODE_ENV == 'development') {
      localStorage.removeItem(key)
    } else {
      secureLocalStorage.removeItem(key)
    }
  }

  public static clear() {
    EntityConsole.log(`[EntityStorage] clear`)
    if (isClientSide() && process.env.NODE_ENV == 'development') {
      localStorage.clear()
    } else {
      secureLocalStorage.clear()
    }
  }
}
