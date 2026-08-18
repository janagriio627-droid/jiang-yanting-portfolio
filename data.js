/*
 * 作品集的个人信息与项目内容统一维护在这里。
 * 图片均来自本人项目资料，便于后续部署时直接随静态站点发布。
 */
window.PORTFOLIO_DATA = {
  site: {
    name: "江岩庭",
    mark: "JY",
    role: "产品经理 / 产品体验设计",
    availability: "正在寻找产品经理相关机会",
    location: "CHINA · AUSTRALIA",
    intro: "我从真实问题出发，梳理流程、搭建原型，并用 AI 与代码把产品想法推进到可验证的版本。",
    heroLineOne: "把想法，",
    heroLineTwo: "做成产品。",
    about:
      "我具备交互设计与视觉传达背景，做过 ToB 金融产品界面优化和文创产品从调研到落地，也持续独立完成 0→1 产品实践。我的优势是快速理解需求、连接设计与开发，并把复杂问题拆成可执行、可验证的产品方案。",
    email: "18980451269@163.com",
    facts: [
      ["求职方向", "产品经理 / AI 产品"],
      ["教育", "悉尼科技大学 · 交互设计硕士"],
      ["能力", "0→1 产品实践 / 跨团队协作"],
    ],
  },
  projects: [
    {
      slug: "applyflow",
      index: "01",
      name: "网申助手 ApplyFlow",
      category: "浏览器插件 / 求职效率工具",
      title: "把重复填写的网申，变成可控的资料复用流程",
      headline: ["把重复填写的网申，", "变成可控的资料复用流程"],
      summary:
        "面向国内秋招、校招与实习网申场景，从资料维护、字段识别到确认填充建立完整闭环；敏感信息不保存、不自动填写，复杂字段始终由用户确认。",
      role: "产品设计 / 原型 / AI 辅助开发",
      year: "2026",
      duration: "独立项目 · 0→1",
      highlight: "可安装的 Chrome / Edge MVP",
      mockType: "dashboard",
      tone: "blue",
      coverImage: "assets/projects/applyflow/cover.png",
      coverAlt: "网申助手的八张产品介绍与界面预览",
      coverFit: "contain",
      problemCards: [
        ["真实问题", "不同招聘网站反复填写相同的教育、实习与项目经历，时间大量消耗在机械录入上。"],
        ["核心流程", "把体验拆成资料维护、页面扫描、字段匹配、用户确认与安全填充五个环节。"],
        ["产品边界", "插件只填充、不提交；身份证、护照、银行卡等敏感信息不进入资料库和自动流程。"],
        ["实现结果", "完成基于 Manifest V3、React 与 TypeScript 的可安装 MVP，并在真实网申页面验证。"],
      ],
      sections: [
        {
          eyebrow: "01 / PROBLEM",
          title: "从高频重复劳动中找到最小切口",
          body:
            "秋招最耗时的环节往往不是判断岗位，而是在不同网站一遍遍复制同一份经历。我将目标限定为“复用已确认的求职资料”，不替用户选择岗位，也不接管投递决定。",
          image: "assets/projects/applyflow/problem.png",
          imageAlt: "网申助手对秋招重复填表痛点的说明",
          caption: "痛点定义：投得越多，重复填写越多。",
        },
        {
          eyebrow: "02 / FLOW",
          title: "识别、匹配、确认，再执行填充",
          body:
            "插件扫描标签、占位符和字段属性，区分已匹配、资料缺失、敏感信息与待手动处理项。常规输入框可以快速填写，多条教育或项目经历仍保留人工选择，避免错误覆盖。",
          image: "assets/projects/applyflow/fill.png",
          imageAlt: "网申助手在真实招聘页面识别并分类字段",
          caption: "真实页面验证：识别当前网页字段，只填充用户确认的内容。",
        },
        {
          eyebrow: "03 / DELIVERY",
          title: "把隐私与可控性做成产品规则",
          body:
            "求职资料保存在浏览器本地，可导入和导出；敏感字段明确排除，插件不会自动点击提交或下一步。最终完成 Chrome / Edge 可安装版本，也保留对日期、级联选择等复杂组件的后续迭代空间。",
          image: "assets/projects/applyflow/privacy.png",
          imageAlt: "网申助手关于敏感信息不保存的隐私设计说明",
          caption: "隐私边界：不存身份证、护照、银行卡等敏感信息。",
        },
      ],
    },
    {
      slug: "offer-xiaowo",
      index: "02",
      name: "Work Buddy / Offer 小窝",
      category: "AI 求职工作台 / 产品设计",
      title: "把投递、JD、面试与复盘收进一个求职工作台",
      headline: ["把投递、JD、面试与复盘", "收进一个求职工作台"],
      summary:
        "针对岗位信息分散、JD 阅读成本高和进度难追踪的问题，搭建“职位录入—AI 分析—投递跟踪—面试复盘”的个人求职闭环。",
      role: "产品经理 / AI 工作流 / Vibe Coding",
      year: "2026",
      duration: "独立项目 · 0→1",
      highlight: "20 次主动咨询 · 14 次领取/下载",
      mockType: "dashboard",
      tone: "silver",
      coverImage: "assets/projects/offer-xiaowo/overview.png",
      coverAlt: "Offer 小窝首页的求职概况、下一场面试与快捷操作",
      coverFit: "contain",
      problemCards: [
        ["用户问题", "岗位链接、JD、投递状态和面试材料散落在表格、聊天记录与浏览器标签中。"],
        ["产品闭环", "统一职位入口，串联 AI 分析、个人资料、投递进度、面试记录与阶段复盘。"],
        ["AI 设计", "将一次性问答调整为对话任务与 Skill，先结构化 JD，再支持后续匹配与准备。"],
        ["验证反馈", "内容发布后获得 20 次主动咨询，并完成 14 次实际领取或下载。"],
      ],
      sections: [
        {
          eyebrow: "01 / SYSTEM",
          title: "先把分散信息整理成一条求职主线",
          body:
            "首页聚合下一场面试、阶段进度、本周机会与快捷操作，让用户不再依赖额外表格回忆状态。职位、面试和个人资料共用同一套数据，减少重复整理。",
          image: "assets/projects/offer-xiaowo/overview.png",
          imageAlt: "Offer 小窝首页求职概况界面",
          caption: "首页：下一场面试、求职概况、本周机会与快捷操作。",
        },
        {
          eyebrow: "02 / AI WORKFLOW",
          title: "让 AI 先结构化，再参与判断",
          body:
            "用户可以粘贴 JD、上传截图或手动填写。系统先提取岗位职责、要求与关键信息，由用户确认后写入工作台，再进入匹配分析和面试准备，降低直接生成结论带来的失真。",
          image: "assets/projects/offer-xiaowo/job-confirm.png",
          imageAlt: "Offer 小窝结构化确认职位信息的界面",
          caption: "职位录入：AI 解析后先确认，缺失信息再由用户补充。",
        },
        {
          eyebrow: "03 / ITERATION",
          title: "把一次投递沉淀成下一次可用的经验",
          body:
            "面试结束后记录整体感受、下一步行动与未回答好的问题，形成后续可检索的复盘材料。产品使用本地服务和 SQLite / 本地存储完成原型验证，并通过真实用户咨询持续校准信息层级。",
          image: "assets/projects/offer-xiaowo/review.png",
          imageAlt: "Offer 小窝面试复盘表单",
          caption: "面试复盘：记录体验、问题与下一步行动。",
        },
      ],
    },
    {
      slug: "together-eat",
      index: "03",
      name: "Together-Eat 一起吃饭",
      category: "移动端产品 / 双人协作",
      title: "把“今天吃什么”变成两个人可以一起完成的决定",
      headline: ["把“今天吃什么”", "变成两个人的共同决定"],
      summary:
        "面向情侣或双人居家做饭场景，把分散菜谱、临时讨论与周计划整合为共享厨房：从选择、找灵感到安排与复盘形成轻量闭环。",
      role: "产品设计 / 信息架构 / Vibe Coding",
      year: "2026",
      duration: "独立项目 · 0→1",
      highlight: "菜谱 × 计划 × 复盘闭环",
      mockType: "mobile",
      tone: "violet",
      coverImage: "assets/projects/together-eat/cover.png",
      coverAlt: "Together-Eat 产品定位、设计目标与移动端界面",
      coverFit: "contain",
      problemCards: [
        ["使用情境", "两个人在家做饭时，常在选择困难、偏好不一致和临时沟通中消耗时间。"],
        ["产品定位", "从单纯的菜谱收藏工具升级为双人做饭决策台，连接灵感、计划与共享记录。"],
        ["核心能力", "菜谱库、随机选择、AI 搜菜名 / 食材、冰箱灵感、今日计划与本周菜单。"],
        ["技术实践", "使用云开发文档数据库，并通过结果缓存减少重复模型调用与等待成本。"],
      ],
      sections: [
        {
          eyebrow: "01 / DECISION",
          title: "首页只保留今天最需要做的决定",
          body:
            "首页优先回答“今天吃什么”。用户可以直接加入今日计划，也可以随机选、添加菜谱或从冰箱食材获得灵感；复杂管理任务回到菜谱库和计划页处理。",
          image: "assets/projects/together-eat/decision.png",
          imageAlt: "Together-Eat 首页决策入口与冰箱灵感说明",
          caption: "首页：今日计划、随机选择与冰箱食材灵感。",
        },
        {
          eyebrow: "02 / AI SEARCH",
          title: "用两种搜索意图承接不同决策阶段",
          body:
            "已经知道想吃什么时按菜名搜索；只有现有食材时按食材获取建议。AI 被放在决策入口，而不是独立模块，结果优先进入菜谱详情和菜谱库，避免形成新的信息孤岛。",
          image: "assets/projects/together-eat/ai-search.png",
          imageAlt: "Together-Eat 按菜名与按食材两种 AI 搜索模式",
          caption: "AI 搜索：覆盖“知道想吃什么”与“只知道有什么食材”。",
        },
        {
          eyebrow: "03 / SHARED LOOP",
          title: "从一次选择延伸到两个人的共同记录",
          body:
            "本周菜单把想法放进具体日期，“我们”页面承接已做过、想一起尝试和对方喜欢的菜。菜谱、计划与复盘互相连接，让产品从工具逐步变成共享生活记录。",
          image: "assets/projects/together-eat/weekly-plan.png",
          imageAlt: "Together-Eat 本周菜单与双人共享厨房界面",
          caption: "协作闭环：本周菜单、执行状态与双人共享记录。",
        },
      ],
    },
  ],
};
