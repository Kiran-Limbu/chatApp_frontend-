export type Message = {
  id: number
  sender: string
  text: string
  time: string
  // status?: 'sent' | 'delivered'
}

export type Conversation = {
  id: string
  type: 'direct' | 'group'
  name: string
  online?: boolean
  members?: string[]
  unread: number
  messages: Message[]
}