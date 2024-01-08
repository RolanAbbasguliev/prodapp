import { useState } from 'react'

type ToastColor = 'danger' | 'success'

interface Toast {
    isOpen?: boolean
    message?: string
    color?: ToastColor
}
const useToast = () => {
    const defaultState: Toast = {
        isOpen: false,
        message: '',
        color: 'danger',
    }

    const [toast, setToast] = useState<Toast>(defaultState)

    return {
        toast,
        setToast,
    }
}

export default useToast
