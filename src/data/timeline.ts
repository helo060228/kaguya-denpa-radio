export interface TimelineEpoch {
  id: string;
  index: string;
  era: string;
  title: string;
  location: string;
  accent: string;
  spoiler: boolean;
  summary: string;
  detail: string;
  link?: {
    label: string;
    href: string;
  };
}

export const TIMELINE_EPOCHS: TimelineEpoch[] = [
  {
    id: 'epoch-01',
    index: 'EPOCH 01',
    era: '约 8000 年前 · 远古地球',
    title: '偏折的返航航线',
    location: '大气层外 → 无名荒野',
    accent: 'var(--route-5)',
    spoiler: true,
    summary: '听到彩叶的歌声后掉头重返地球的飞船，意外被时空乱流抛回了八千年前。',
    detail: '没有光纤，没有直播间，甚至连东京这座城市都尚未诞生。少女带着关于一个夏天的完整记忆，独自开始了跨越数个纪元的漫长漂流。',
  },
  {
    id: 'epoch-02',
    index: 'EPOCH 02',
    era: '平安时代 · 传说的雏形',
    title: '口耳相传的《竹取物语》',
    location: '旧日竹林与京都夜色',
    accent: 'var(--route-1)',
    spoiler: true,
    summary: '为了让那段记忆不被时间彻底风化，她一遍遍向世人讲述自己与少女的物语。',
    detail: '千年传抄之后，近未来的发光电线杆变成了发光的竹节，网络歌声变成了不死药与满月离别——日本最古老的物语，原来是一封写给未来的时间胶囊。',
  },
  {
    id: 'epoch-03',
    index: 'EPOCH 03',
    era: '近未来 · 网络纪元初启',
    title: '筑起虚拟空间「月读」',
    location: 'TSUKUYOMI 虚拟伺服器',
    accent: 'var(--route-3)',
    spoiler: true,
    summary: '人类点亮服务器的那一天，她化名「月见八千代」，亲手建立起梦想交汇的虚拟桃源。',
    detail: '她站上万众仰望的水镜舞台，唱起〈星降之海〉与〈忆昔〉，在亿万条数据流中静静等待着那个注定会戴上耳机走进来的 17 岁女孩。',
    link: {
      label: '收听 ROUTE 05 · 八千年闭环',
      href: '/posts/eight-thousand-years/',
    },
  },
  {
    id: 'epoch-04',
    index: 'EPOCH 04',
    era: '2026 东京深夜 · 命运交汇点',
    title: '散发七彩微光的电线杆',
    location: '东京都住宅巷口',
    accent: 'var(--route-1)',
    spoiler: false,
    summary: '疲惫归家的酒寄彩叶在发光的电线杆下捡到神秘婴儿，少女迅速成长并被命名为「辉夜」。',
    detail: '古老的竹取传说在霓虹与电流的间隙重启。窄小的单身公寓从此响起吵闹的笑声、MIDI 键盘和永不熄灭的夜灯。',
    link: {
      label: '收听 ROUTE 01 · 深夜东京的七彩竹取',
      href: '/posts/glowing-pole/',
    },
  },
  {
    id: 'epoch-05',
    index: 'EPOCH 05',
    era: '2026 夏夜 · 舞台与满月',
    title: '彩P出道与拒绝告别的满月',
    location: '月读舞台 → 近地轨道',
    accent: 'var(--route-4)',
    spoiler: false,
    summary: '两人在月读搭档直播走红；月圆之夜月球使者降临，彩叶隔空传去的歌声击穿了冰冷轨道。',
    detail: '听到那首写给自己的歌后，辉夜拒绝了既定的悲伤剧本，毅然转过飞船航向冲回地球——因果的圆环在此无缝闭合，重新连回 EPOCH 01。',
    link: {
      label: '收听 ROUTE 04 · 满月与折返',
      href: '/posts/full-moon-farewell/',
    },
  },
  {
    id: 'epoch-06',
    index: 'EPOCH 06',
    era: '闭环之后 · 面向现实的未来',
    title: '机械义体与真正的重逢',
    location: '现实世界 · 东京实验室',
    accent: 'var(--route-2)',
    spoiler: true,
    summary: '读懂八千代全部心意的彩叶在大学转修机械义体技术，决心在现实中再次拥抱她。',
    detail: '这一次，不再只有隔着屏幕与八千年光阴的单向信号。由双手亲手打造的新躯体，让《竹取物语》终于迎来了真正意义上的 Happy End。',
  },
];
