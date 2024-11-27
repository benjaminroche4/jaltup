import { create } from 'zustand'
import { User } from '@/model/user'

export type RegisterState = User

interface RegisterAction {
  setEmail: (email: RegisterState['email']) => void
  setPassword: (password: RegisterState['password']) => void
  setFirstName: (firstname: RegisterState['firstName']) => void
  setLastName: (lastname: RegisterState['lastName']) => void
  setReferralCode: (referralCode: RegisterState['referralCode']) => void
  reset: () => void
}

const initialState: RegisterState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  referralCode: '',
}

export const useRegisterStore = create<RegisterState & RegisterAction>((set) => ({
  ...initialState,
  setEmail: (email) => set(() => ({ email })),
  setPassword: (password) => set(() => ({ password })),
  setFirstName: (firstname) => set(() => ({ firstName: firstname })),
  setLastName: (lastname) => set(() => ({ lastName: lastname })),
  setReferralCode: (referralCode) => set(() => ({ referralCode })),
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
