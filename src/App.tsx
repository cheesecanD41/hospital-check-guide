import { useEffect, useLayoutEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { AboutPage } from './pages/AboutPage'
import { DepartmentPage } from './pages/DepartmentPage'
import { DepartmentsPage } from './pages/DepartmentsPage'
import { HomePage } from './pages/HomePage'
import { ProjectPage } from './pages/ProjectPage'

function ScrollManager() {
  const location = useLocation()

  useLayoutEffect(() => {
    const state = location.state as { restoreScroll?: number } | null
    const saved =
      typeof state?.restoreScroll === 'number'
        ? state.restoreScroll
        : Number(sessionStorage.getItem(`scroll:${location.key}`) ?? '0')

    requestAnimationFrame(() => window.scrollTo(0, Number.isFinite(saved) ? saved : 0))
  }, [location.key, location.state])

  useEffect(() => {
    const storageKey = `scroll:${location.key}`
    const saveScroll = () => sessionStorage.setItem(storageKey, String(window.scrollY))
    saveScroll()
    window.addEventListener('scroll', saveScroll, { passive: true })
    return () => {
      saveScroll()
      window.removeEventListener('scroll', saveScroll)
    }
  }, [location.key])

  return null
}

function NotFoundPage() {
  useEffect(() => {
    document.title = '页面未找到｜医院医疗项目科普'
  }, [])

  return (
    <div className="page content-page">
      <div className="empty-page">
        <p className="section-kicker">404</p>
        <h1>这一页不在这里</h1>
        <p>链接可能已经变化，可以回到首页或科室总览继续浏览。</p>
        <div className="empty-actions">
          <Link className="solid-button" to="/">返回首页</Link>
          <Link className="text-button" to="/departments">查看科室</Link>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">跳到正文</a>
      <Nav />
      <ScrollManager />
      <main id="main-content" className="site-main">
        <div className="page-transition" key={location.pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/departments/:departmentSlug" element={<DepartmentPage />} />
            <Route path="/projects/:projectSlug" element={<ProjectPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}
