export type YesNo = '是' | '否'
export type RadiationLevel = '无' | '低' | '中'
export type DepartmentCategory = '影像检验' | '心肺消化' | '五官妇产' | '功能检查'

export interface Department {
  slug: string
  name: string
  category: DepartmentCategory
  summary: string
  intro: string
  order: number
}

export interface FaqItem {
  q: string
  a: string
}

export interface Project {
  slug: string
  departmentSlug: string
  name: string
  alias: string[]
  oneLine: string
  principle: string
  suitable: string[]
  preparation: string[]
  process: string[]
  feeling: string
  duration: string
  reportTime: string
  fasting: YesNo
  radiation: RadiationLevel
  sedation: YesNo
  escort: YesNo
  cautions: string[]
  resultReading: string
  faq: FaqItem[]
  tags: string[]
}
