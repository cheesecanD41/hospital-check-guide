import { useEffect } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'

export function AboutPage() {
  useEffect(() => {
    document.title = '关于与免责声明｜医院医疗项目科普'
  }, [])

  return (
    <div className="page content-page about-page">
      <Breadcrumb items={[{ label: '首页', to: '/' }, { label: '关于' }]} />

      <header className="page-heading about-heading">
        <p className="section-kicker">关于本站</p>
        <h1>把检查说清楚，也把边界说清楚</h1>
        <p className="page-lead">
          本站面向普通患者和家属，说明常见检查与治疗项目的基本原理、准备方式、过程和感受。
        </p>
      </header>

      <div className="about-layout">
        <article className="about-article">
          <section>
            <h2>站点用途</h2>
            <p>
              你可以先从科室找到对应的检查项目，再阅读项目详情。内容重点放在“为什么做”“需要怎样配合”和“过程中可能有什么感觉”，帮助你在就诊前减少未知感。
            </p>
            <p>
              每项内容都包含检查时长、空腹要求、辐射情况、家属陪同与报告时间等信息。不同医院在设备、流程和预约要求上可能有差异，到院后仍应以工作人员指引为准。
            </p>
          </section>

          <section>
            <h2>免责声明</h2>
            <div className="disclaimer-block">
              <p>
                本站内容仅用于健康科普，不构成诊断、治疗、用药或其他医疗建议，也不能替代医生面诊、体格检查和必要的医学检查。
              </p>
              <p>
                文章中的“适合什么情况”用于说明项目通常可能涉及的场景，不代表你可以自行判断是否需要检查。是否检查、何时检查、如何准备及如何处理结果，应由接诊医生结合你的症状、病史和医院条件决定。
              </p>
              <p>
                本站提到的时长、报告时间、空腹和陪同要求均为一般性说明。具体流程以接诊医生与所在医院实际安排为准。如出现胸痛、呼吸困难、意识改变、大量出血等紧急情况，请及时联系急救或前往急诊。
              </p>
            </div>
          </section>

          <section>
            <h2>内容原则</h2>
            <ul className="article-list">
              <li>使用“通常”“多数人”“约”等表述，避免把个体情况写成绝对结论。</li>
              <li>只解释检查项目的一般原理与流程，不提供个体化诊断或治疗选择。</li>
              <li>不展示 AI 生成配图，不使用会干扰阅读的装饰元素。</li>
              <li>所有项目末尾统一提示：具体流程以所在医院为准。</li>
            </ul>
          </section>

          <section>
            <h2>内容更新时间</h2>
            <p>最近更新：2026 年 10 月 31 日</p>
          </section>
        </article>

        <aside className="about-aside" aria-label="使用提示">
          <p className="section-kicker">阅读提示</p>
          <h2>先看准备，再看过程</h2>
          <p>
            如果你马上要做检查，可以先看详情页右侧的信息栏和“需要怎么准备”，再阅读过程与感受。
          </p>
          <p>
            报告中的术语可以带着问题去问医生，不建议只根据网页描述自行判断结果。
          </p>
        </aside>
      </div>
    </div>
  )
}
