import { create } from 'zustand'
import { User } from '@/model/user'

export type RegisterState = User

interface RegisterAction {
  setEmail: (email: RegisterState['email']) => void
  setPassword: (password: RegisterState['password']) => void
  setFirstName: (firstname: RegisterState['firstName']) => void
  setLastName: (lastname: RegisterState['lastName']) => void
  setReferralCode: (referralCode: RegisterState['referralCode']) => void
  setSchool: (school: string) => void
  setLevel: (level: string) => void
  setCity: (city: string) => void
  reset: () => void
}

const initialState: RegisterState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  referralCode: '',
  study: undefined,
}

export const useRegisterStore = create<RegisterState & RegisterAction>((set) => ({
  ...initialState,
  setEmail: (email) => set(() => ({ email })),
  setPassword: (password) => set(() => ({ password })),
  setFirstName: (firstname) => set(() => ({ firstName: firstname })),
  setLastName: (lastname) => set(() => ({ lastName: lastname })),
  setReferralCode: (referralCode) => set(() => ({ referralCode })),
  setSchool: (school) =>
    set((state) => {
      if (state.study) {
        state.study.school = school
      } else {
        state.study = {
          school,
          level: '',
          city: '',
        }
      }
      return state
    }),
  setLevel: (level) =>
    set((state) => {
      if (state.study) {
        state.study.level = level
      } else {
        state.study = {
          school: '',
          level,
          city: '',
        }
      }
      return state
    }),
  setCity: (city) =>
    set((state) => {
      if (state.study) {
        state.study.city = city
      } else {
        state.study = {
          school: '',
          level: '',
          city,
        }
      }
      return state
    }),
  reset: () => {
    set(initialState)
  },
}))

export const useEmail = () => useRegisterStore((state) => state.email)
export const useSetEmail = () => useRegisterStore((state) => state.setEmail)

export const usePassword = () => useRegisterStore((state) => state.password)
export const useSetPassword = () => useRegisterStore((state) => state.setPassword)

export const useFirstName = () => useRegisterStore((state) => state.firstName)
export const useSetFirstName = () => useRegisterStore((state) => state.setFirstName)

export const useLastName = () => useRegisterStore((state) => state.lastName)
export const useSetLastName = () => useRegisterStore((state) => state.setLastName)

export const useReferralCode = () => useRegisterStore((state) => state.referralCode)
export const useSetReferralCode = () => useRegisterStore((state) => state.setReferralCode)

export const useSchool = () => useRegisterStore((state) => state.study?.school)
export const useSetSchool = () => useRegisterStore((state) => state.setSchool)

export const useLevel = () => useRegisterStore((state) => state.study?.level)
export const useSetLevel = () => useRegisterStore((state) => state.setLevel)

export const useCity = () => useRegisterStore((state) => state.study?.city)
export const useSetCity = () => useRegisterStore((state) => state.setCity)
