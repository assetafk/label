import { useMutation } from '@tanstack/react-query'
import { sendContact, type ContactPayload } from '../lib/api'

export function useContactMutation() {
  return useMutation({
    mutationFn: (payload: ContactPayload) => sendContact(payload),
  })
}

