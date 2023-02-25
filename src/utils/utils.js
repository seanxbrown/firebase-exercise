export function formatDate(dateString) {
    if (typeof dateString === "string") {
        const day = dateString.slice(8)
        const month = dateString.slice(5, 7)
        const year = dateString.slice(0, 4)
        return `${day}/${month}/${year}`
      
    } 
  }
  