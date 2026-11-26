export interface DenpaPost {
  slug: string;
  routeNum: 1 | 2 | 3 | 4 | 5;
  routeCode: string;
  routeSubtitle: string;
  date: string;
  readTime: string;
  frequency: string;
  title: string;
  excerpt: string;
  tags: string[];
  cover: string;
  backdrop: string;
  spoiler?: boolean;
  trackNote?: {
    title: string;
    artist: string;
    note: string;
  };
  paragraphs: string[];
  quote?: string;
}

export const POSTS: DenpaPost[] = [
  {
    slug: 'glowing-pole',
    routeNum: 1,
    routeCode: 'ROUTE 01',
    routeSubtitle: '发光的电线杆',
    date: '2026.01.22',
    readTime: '约 2 分钟',
    frequency: '101.40 MHz',
    title: '深夜东京的七彩竹取',
    excerpt: '一根在近未来东京街头泛起七彩微光的电线杆，替古老的竹林接过了最初的电波。',
    tags: ['#酒寄彩叶', '#电线杆', '#初遇'],
    cover: '/images/route-01-apartment.jpg',
    backdrop: '/images/route-01-apartment.jpg',
    paragraphs: [
      '兼顾学业与深夜打工的 17 岁东京高中生酒寄彩叶，原本以为自己的日常只剩下便利店冷光、耳机里的虚拟直播与永不结束的疲惫。直到回家的巷口，一根普通的混凝土电线杆忽然亮起七彩光晕。',
      '古典《竹取物语》里发光的是竹节，而在山下清悟笔下的近未来东京，<span class="hl-route">承载神话的容器变成了一根再日常不过的城市电线杆</span>。神话并没有消失，它只是换上了电流与信号的皮囊。',
      '被抱回狭窄公寓的婴儿以不可思议的速度长成与她同龄的少女。彩叶给她取名「辉夜」——任性、喧闹、毫无顾忌地闯进她堆满 MIDI 键盘与书本的房间，像一道蛮横却温柔的月光。',
    ],
    quote: '「如果古老的物语一定要以离别收场，那就从今晚开始把它改写吧。」',
  },
  {
    slug: 'tsukuyomi-debut',
    routeNum: 2,
    routeCode: 'ROUTE 02',
    routeSubtitle: '月读初配信',
    date: '2026.01.28',
    readTime: '约 2 分钟',
    frequency: '102.15 MHz',
    title: '彩P与任性公主的舞台',
    excerpt: '一个抱着肩背键盘编曲，一个举起麦克风放声歌唱——虚拟空间「月读」里最耀眼的搭档。',
    tags: ['#月读', '#彩P', '#虚拟直播'],
    cover: '/images/route-02-tsukuyomi.jpg',
    backdrop: '/images/route-02-tsukuyomi.jpg',
    trackNote: {
      title: '我，好我者也。 / 瞬、交响。',
      artist: 'HoneyWorks · 40mP · 辉夜 (CV. 夏吉优子)',
      note: '从卧室桌面 DAW 到月读樱花长街，两个少女把现实里的局促唱成了无边星海。',
    },
    paragraphs: [
      '「月读（ツクヨミ）」原本只是彩叶逃避现实压力的避风港。可当辉夜拉着她以制作人「彩P」与虚拟歌手的组合正式出道时，这片霓虹古都突然有了真实的心跳。',
      '辉夜的歌声带着近乎任性的自由，而彩叶藏在编曲轨后的和声则沉静而克制。<span class="hl-route">她们一个是向夜空发射信号的天线，另一个是把所有杂音调成旋律的调音台。</span>',
      '那些在屏幕前熬夜剪辑、为每一帧灯光争执又大笑的夜晚，比任何华丽的舞台特效都更接近「幸福」二字。',
    ],
  },
  {
    slug: 'vocaloid-constellation',
    routeNum: 3,
    routeCode: 'ROUTE 03',
    routeSubtitle: '殿堂级曲目志',
    date: '2026.02.04',
    readTime: '约 3 分钟',
    frequency: '104.80 MHz',
    title: '从〈前尘物语〉到〈ray〉',
    excerpt: '当 ryo、kz、40mP、Aqu3ra、yuigot 与 HoneyWorks 在同一片夜空交汇。',
    tags: ['#ryo', '#ray', '#歌单考据'],
    cover: '/images/route-03-ray.jpg',
    backdrop: '/images/route-03-ray.jpg',
    trackNote: {
      title: 'Ex-Otogibanashi / Reply / Starry Sea / ray 超かぐや姫！Version',
      artist: 'ryo (supercell) · kz (livetune) · Aqu3ra · yuigot',
      note: '跨越整个互联网音乐世代的 P 主联袂，让虚拟偶像的歌声本身成为剧情的时间胶囊。',
    },
    paragraphs: [
      '看《超时空辉夜姬！》时最难以忘怀的，是旋律响起的瞬间所唤醒的集体记忆。从 ryo (supercell) 恢宏又带一丝苍凉的〈前尘物语〉，到 kz (livetune) 极具电子通透感的〈答覆〉，每一首歌都像是从互联网黄金年代寄来的漂流瓶。',
      '而最安静、也最让人鼻酸的一刻，属于 Aqu3ra 的〈星降之海〉与片尾山下清悟亲自操刀 MV 的〈ray 超かぐや姫！Version〉。<span class="hl-route">透明感电子音像涨潮一样漫过屏幕，仿佛真的有人隔着八千年的静默轻轻呼唤你的名字。</span>',
      '音乐在这里不是附庸于画面的背景配乐，它就是辉夜、彩叶与八千代互相确认「你还在这条时间线上」的唯一暗号。',
    ],
  },
  {
    slug: 'full-moon-farewell',
    routeNum: 4,
    routeCode: 'ROUTE 04',
    routeSubtitle: '满月与折返',
    date: '2026.02.14',
    readTime: '约 2 分钟',
    frequency: '106.20 MHz',
    title: '拒绝悲剧结局的月圆之夜',
    excerpt: '来自月球的阴影终究降临，但这一次，她听到那首歌后转过了飞船的航向。',
    tags: ['#满月', '#告别', '#逆转命运'],
    cover: '/images/backdrop-main.jpg',
    backdrop: '/images/backdrop-main.jpg',
    spoiler: true,
    paragraphs: [
      '满月悬在东京上空的那个夜晚，所有的喧闹忽然褪去。月球使者的光柱落下时，辉夜终究还是不得不离开这间堆满泡面碗与 MIDI 键盘的小公寓。',
      '如果故事停在这里，它不过又是一次精美的《竹取物语》复刻。可就在升入冰冷轨道的刹那，<span class="hl-route">辉夜听见了彩叶隔空为她写下的歌</span>——那道微弱却顽固的电波穿透大气层，击穿了既定的宿命。',
      '她没有乖乖接受归乡的剧本，而是执拗地驾着飞船掉头冲回地球。哪怕航线在时空乱流中偏折，哪怕前方是无人知晓的遥远纪元，她也只想回到有彩叶的那个夏天。',
    ],
    quote: '「悲伤的童话到此为止——这一次，换我朝你奔赴。」',
  },
  {
    slug: 'eight-thousand-years',
    routeNum: 5,
    routeCode: 'ROUTE 05',
    routeSubtitle: '八千年闭环',
    date: '2026.02.20',
    readTime: '约 3 分钟',
    frequency: '8000.00 kHz',
    title: '月见八千代的漫长守望',
    excerpt: '坠落回八千年前的少女，把思念写进《竹取物语》，又在信息时代筑起了整座「月读」。',
    tags: ['#月见八千代', '#八千年', '#机械义体'],
    cover: '/images/route-05-pavilion.jpg',
    backdrop: '/images/route-05-pavilion.jpg',
    spoiler: true,
    trackNote: {
      title: '忆昔 (Remember)',
      artist: 'yuigot · 月见八千代 (CV. 早见沙织)',
      note: '早见沙织温柔而微带疏离的声线，藏着整整八千年未曾褪色的等待。',
    },
    paragraphs: [
      '返航的飞船意外将辉夜抛回了八千年前的地球。没有网络，没有麦克风，甚至连东京这座城市都尚未诞生。在漫长得近乎残酷的岁月里，她只能一遍又一遍地向世人讲述自己与一个少女的记忆——于是后世有了《竹取物语》。',
      '等到人类终于点亮光纤与服务器的那一天，她化名「月见八千代」，亲手搭建出虚拟空间「月读」，站在所有人仰望的水镜亭台与虚拟舞台中央，只为了静静等待那个 17 岁的女孩戴上耳机走进来。<span class="hl-route">原来最初慰藉彩叶的歌声，竟是未来与过去交叠的回声。</span>',
      '而当彩叶终于读懂这份跨越八千年的执念后，她没有沉溺于哀伤——她在大学转修机械义体技术，决定用自己的双手，为只存在于电波与数据里的八千代造一具能够真实拥抱的躯壳。电波终于有了回音。',
    ],
  },
];
