const timeSince = (date: string) => {
  const seconds = Math.floor((Date.now() - Date.parse(date)) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return `${Math.floor(interval)}y`
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return new Date(date).toDateString()
  }
  interval = seconds / 86400
  if (interval > 1) {
    return `${Math.floor(interval)}d`
  }
  interval = seconds / 3600
  if (interval > 1) {
    return `${Math.floor(interval)}h`
  }
  interval = seconds / 60
  if (interval > 1) {
    return `${Math.floor(interval)}m`
  }
  return 'a few seconds ago'
}

export default timeSince
