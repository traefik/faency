import React, { Children, useState, ReactNode, cloneElement, useEffect, useRef } from 'react'
import useKeyListener from '../hooks/use-key-listener'

type ArrowNavProps = {
  children: ReactNode
}

export const ArrowNav: React.FC<ArrowNavProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (Children.count(children) > activeIndex && ref.current) {
      const currentElement = ref.current.children[activeIndex] as HTMLElement

      if (currentElement) {
        currentElement.focus()
      }
    }
  }, [activeIndex])

  useKeyListener((key: string) => {
    const childCount = Children.count(children)

    if (childCount > 0) {
      if (key === 'ArrowUp') {
        setActiveIndex(active => (active - 1 + childCount) % childCount)
      } else if (key === 'ArrowDown') {
        setActiveIndex(active => (active + 1) % childCount)
      }
    }
  })

  const renderChildren = (children: ReactNode, activeIndex: number): ReactNode => {
    let currentIndex = -1
    return Children.map<any, any>(children, child => {
      if (!child) return null
      if (typeof child !== 'object') return child
      currentIndex++
      return cloneElement(child, {
        tabIndex:
          activeIndex === currentIndex
            ? Math.max(0, child.props.tabIndex || 0)
            : Math.min(-1, child.props.tabIndex || 0),
      })
    })
  }

  return <div ref={ref}>{renderChildren(children, activeIndex)}</div>
}
