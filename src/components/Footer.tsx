import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-title">医院医疗项目科普</p>
          <p>把检查的原理、准备和过程说明白。</p>
        </div>
        <div className="footer-disclaimer">
          <p>
            本站内容仅供科普，不构成诊断或治疗建议。具体检查和治疗请以接诊医生及所在医院实际流程为准。
          </p>
          <Link to="/about">阅读完整免责声明</Link>
        </div>
      </div>
    </footer>
  )
}
