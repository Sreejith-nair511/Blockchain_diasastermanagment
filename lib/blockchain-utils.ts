// Generate a random Algorand-like address
export function generateRandomAddress(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
  let result = ""
  for (let i = 0; i < 58; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Generate a random hash
export function generateRandomHash(): string {
  const chars = "0123456789abcdef"
  let result = ""
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Generate a random name for demo data
export function generateRandomName(): string {
  const adjectives = ["Swift", "Bright", "Clever", "Dynamic", "Eager", "Fast", "Global", "Happy", "Iconic", "Jolly"]

  const nouns = ["Algo", "Block", "Chain", "Dapp", "Ether", "Fintech", "Governance", "Hash", "Index", "Journal"]

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]

  return `${adj} ${noun}`
}

// Format large numbers with commas
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Truncate address or hash for display
export function truncateString(str: string, start = 6, end = 4): string {
  if (!str) return ""
  if (str.length <= start + end) return str
  return `${str.slice(0, start)}...${str.slice(-end)}`
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString()
}

// Format time ago
export function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + " years ago"

  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + " months ago"

  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + " days ago"

  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + " hours ago"

  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + " minutes ago"

  return Math.floor(seconds) + " seconds ago"
}
