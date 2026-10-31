import type { Department } from './types'

export const departments: Department[] = [
  {
    slug: 'imaging',
    name: '影像与超声',
    category: '影像检验',
    summary: '用不同成像方式观察人体内部结构，帮助判断组织与器官的状态。',
    intro: '影像检查通过 X 线、声波、磁场等方式形成身体内部图像，不同方法的侧重点并不相同。医生会根据部位、症状和既往检查结果选择合适的方式。检查多为无创或微创操作，实际流程因医院设备和检查部位而异。',
    order: 1,
  },
  {
    slug: 'laboratory',
    name: '检验科',
    category: '影像检验',
    summary: '通过血液、尿液等样本了解身体代谢、感染与器官功能。',
    intro: '检验科接收血液、尿液等人体样本，在实验室内完成计数、化学成分或凝血功能分析。一张检验单上的项目常从不同角度反映身体状况，需要结合症状和病史一起理解。采样方式、空腹要求和报告时间以医院实际安排为准。',
    order: 2,
  },
  {
    slug: 'cardiology',
    name: '心血管检查',
    category: '心肺消化',
    summary: '记录心脏电活动、结构或负荷反应，了解心脏工作状态。',
    intro: '心血管检查包括记录心电信号、观察心脏结构与运动、评估运动时的心脏反应等。不同检查解决的问题不同，有的看心律，有的看瓣膜和心功能。多数检查安全、无创，具体项目组合由接诊医生判断。',
    order: 3,
  },
  {
    slug: 'endoscopy',
    name: '消化内镜',
    category: '心肺消化',
    summary: '借助细软内镜观察消化道黏膜，部分检查还能完成取样。',
    intro: '消化内镜经口腔或肛门进入消化道，通过前端镜头观察食管、胃、肠道等部位的黏膜。部分内镜可同时完成活检或治疗。检查前通常需要按医院要求禁食、清肠，是否使用镇静麻醉由医生评估。',
    order: 4,
  },
  {
    slug: 'respiratory',
    name: '呼吸系统',
    category: '心肺消化',
    summary: '评估肺通气、气道、睡眠呼吸与血液氧合情况。',
    intro: '呼吸系统检查从不同侧面了解呼吸功能，包括吹气测肺功能、观察气道、监测睡眠呼吸以及分析动脉血中的氧气和二氧化碳。检查目的和配合方式差别较大，通常由呼吸专科医生根据症状安排。',
    order: 5,
  },
  {
    slug: 'ophthalmology',
    name: '眼科',
    category: '五官妇产',
    summary: '检查视力、眼压、眼表与眼底，了解眼睛各层结构。',
    intro: '眼科检查通常从视力、验光等基础项目开始，再根据情况观察眼压、角膜、晶状体或眼底。多数检查在门诊完成，配合简单。部分检查需要散瞳，散瞳后短时间内看近处会变模糊，需要提前安排出行。',
    order: 6,
  },
  {
    slug: 'ent',
    name: '耳鼻喉科',
    category: '五官妇产',
    summary: '评估听力、中耳功能与鼻腔、咽喉的黏膜状态。',
    intro: '耳鼻喉科检查关注听觉通路、中耳压力以及鼻腔和咽喉的黏膜与结构。检查多通过耳道、鼻腔或口腔完成，通常需要保持身体稳定并配合医生指令。具体操作范围和不适程度与检查部位有关。',
    order: 7,
  },
  {
    slug: 'gynecology',
    name: '妇产科',
    category: '五官妇产',
    summary: '关注女性生殖系统结构、孕期胎儿状态与宫颈健康。',
    intro: '妇产科检查覆盖妇科结构、宫颈筛查、孕期监护和宫腔观察。部分检查涉及隐私部位，医院通常会提供遮挡并安排同性医护人员在场。检查前可主动告知医生是否处于孕期、月经期或有相关过敏史。',
    order: 8,
  },
  {
    slug: 'function',
    name: '功能检查',
    category: '功能检查',
    summary: '记录脑电活动或测量骨量，评估器官功能与骨质状态。',
    intro: '功能检查更关注器官如何工作，而不是单一结构图像。脑电图记录大脑电活动，骨密度检测评估骨量水平。两项检查通常无创，准备事项较少，但仍需按医院要求清洁头皮或避免影响测量的物品。',
    order: 9,
  },
]

export const departmentGroups = [
  { title: '影像检验', departments: departments.filter((item) => item.category === '影像检验') },
  { title: '心肺消化', departments: departments.filter((item) => item.category === '心肺消化') },
  { title: '五官妇产', departments: departments.filter((item) => item.category === '五官妇产') },
  { title: '功能检查', departments: departments.filter((item) => item.category === '功能检查') },
]

export const homeDepartmentGroups = [
  { title: '影像与检验', departments: departments.filter((item) => ['imaging', 'laboratory'].includes(item.slug)) },
  { title: '心肺与消化', departments: departments.filter((item) => ['cardiology', 'endoscopy', 'respiratory'].includes(item.slug)) },
  { title: '五官、妇产与功能', departments: departments.filter((item) => ['ophthalmology', 'ent', 'gynecology', 'function'].includes(item.slug)) },
]
