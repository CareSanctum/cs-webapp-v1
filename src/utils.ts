function getCookie (name: string) {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
          break
        }
      }
    }
    return cookieValue
  }
  export function getCSRFToken () {
    return getCookie('csrftoken')
  }

  export function getUtcDayBounds(date: Date) {
    // clone so we don’t mutate the original
    const startLocal = new Date(date)
    startLocal.setHours(0, 0, 0, 0)
  
    const endLocal = new Date(date)
    endLocal.setHours(23, 59, 0, 0)
  
    return {
      startUtcIso: startLocal.toISOString(),
      endUtcIso:   endLocal.toISOString(),
    }
  }