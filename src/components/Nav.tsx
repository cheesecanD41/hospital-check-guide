import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SearchBox } from './SearchBox'

export function Nav() {
  const [searchOpen, setSearchOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!searchOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false)
        triggerRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen])

  const closeSearch = () => {
    setSearchOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" to="/" aria-label="医院医疗项目科普首页">
          <span className="brand-full">医院医疗项目科普</span>
          <span className="brand-short">检查说明</span>
        </Link>
        <nav className="primary-nav" aria-label="主导航">
          <NavLink to="/departments">科室</NavLink>
          <NavLink to="/about">关于</NavLink>
          <button
            ref={triggerRef}
            type="button"
            className="nav-search-trigger"
            aria-expanded={searchOpen}
            aria-controls="site-search-panel"
            onClick={() => setSearchOpen((open) => !open)}
          >
            搜索
          </button>
        </nav>
      </div>

      {searchOpen && (
        <section id="site-search-panel" className="nav-search-panel" aria-label="全站搜索">
          <div className="nav-search-inner">
            <SearchBox variant="nav" autoFocus onNavigate={closeSearch} />
            <button type="button" className="text-button nav-search-close" onClick={closeSearch}>
              关闭
            </button>
          </div>
        </section>
      )}
    </header>
  )
}
