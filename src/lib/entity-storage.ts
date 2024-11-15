import secureLocalStorage from 'react-secure-storage'
import { EntityConsole } from '@/lib/entity-console'

interface EntityStorageType<T> {
  value: T
  date?: number
}

// eslint-disable-next-line import/no-default-export
export default class EntityStorage {
  public static set<T>(
    key: string,
    value: T,
    expirationDate?: number, // timestamp in milliseconds
  ) {
    const data: EntityStorageType<T> = expirationDate ? { value, date: expirationDate } : { value }
    EntityConsole.log(`[EntityStorage] set :`, key)

    secureLocalStorage.setItem(key, data)
  }

  public static get<T>(key: string): T | undefined {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const data = secureLocalStorage.getItem(key) as EntityStorageType<T> | null
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
    secureLocalStorage.removeItem(key)
  }

  public static clear() {
    EntityConsole.log(`[EntityStorage] clear`)
    secureLocalStorage.clear()
  }
}
