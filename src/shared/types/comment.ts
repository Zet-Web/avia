export interface Comment {
  id: number
  content: string
  isBlocked: boolean
  isThreadBlocked: boolean
  blockReason: null
  isAdminComment: null
  removed: null
  approvalStatus: null
  createdAt: string
  updatedAt: string
  hasThread: boolean
  threadFirstItemId: number
  author: {
    id: number
    name: string
    email: string
    avatar: string
  }
  children: Comment[]
}
