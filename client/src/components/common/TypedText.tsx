import { useEffect, useRef } from "react"

interface TypedTextProps {
  strings: string[]
  typeSpeed?: number
  backSpeed?: number
  backDelay?: number
  loop?: boolean
}

export function TypedText({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  backDelay = 2000,
  loop = true
}: TypedTextProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    let currentStringIndex = 0
    let currentCharIndex = 0
    let isDeleting = false
    let timeoutId: NodeJS.Timeout

    const type = () => {
      const currentString = strings[currentStringIndex]
      const element = elementRef.current

      if (!element) return

      if (isDeleting) {
        element.textContent = currentString.substring(0, currentCharIndex - 1)
        currentCharIndex--
      } else {
        element.textContent = currentString.substring(0, currentCharIndex + 1)
        currentCharIndex++
      }

      let nextDelay = isDeleting ? backSpeed : typeSpeed

      if (!isDeleting && currentCharIndex === currentString.length) {
        nextDelay = backDelay
        isDeleting = true
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false
        currentStringIndex = (currentStringIndex + 1) % strings.length
      }

      timeoutId = setTimeout(type, nextDelay)
    }

    type()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [strings, typeSpeed, backSpeed, backDelay, loop])

  return <span ref={elementRef} className="border-r-2 border-current animate-pulse" />
}