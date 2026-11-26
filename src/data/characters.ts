export interface CharacterForm {
  id: string;
  label: string;
  image: string;
  caption: string;
}

export interface CharacterProfile {
  id: string;
  code: string;
  name: string;
  jpName: string;
  cv: string;
  accent: string;
  role: string;
  frequency: string;
  quote: string;
  bio: string;
  tags: string[];
  relatedRoute: {
    label: string;
    href: string;
  };
  forms: CharacterForm[];
}

export const CHARACTERS: CharacterProfile[] = [
  {
    id: 'kaguya',
    code: 'SIGNAL 01',
    name: '辉夜',
    jpName: 'かぐや / KAGUYA',
    cv: 'CV. 夏吉优子',
    accent: 'var(--route-1)',
    role: '逃离月球的虚拟歌姬',
    frequency: '101.40 MHz',
    quote: '「悲伤的《竹取物语》到此为止——我要亲手把它改写成 Happy End！」',
    bio: '在深夜东京一根泛着七彩光芒的电线杆中被酒寄彩叶捡回家，迅速成长为同龄少女。性格自由奔放、略带任性，拥有能击穿次元壁的明亮歌喉。拉着彩叶在虚拟空间「月读」出道，并立志逆转古老物语注定的离别结局。',
    tags: ['#月球公主', '#主唱', '#改写结局'],
    relatedRoute: {
      label: '阅读 ROUTE 01 · 发光的电线杆',
      href: '/posts/glowing-pole/',
    },
    forms: [
      {
        id: 'tsukuyomi',
        label: '月读虚拟形态',
        image: '/images/chars/kaguya-tsukuyomi.webp',
        caption: 'TSUKUYOMI AVATAR · 绯樱和风演出服与月形发饰',
      },
      {
        id: 'real',
        label: '东京现实日常',
        image: '/images/chars/kaguya-real.webp',
        caption: 'TOKYO DAILY · 彩叶公寓里的宽松黑 T 恤与球鞋',
      },
    ],
  },
  {
    id: 'iroha',
    code: 'SIGNAL 02',
    name: '酒寄彩叶',
    jpName: '酒寄彩葉 / IROHA SAKAYORI',
    cv: 'CV. 永濑安奈',
    accent: 'var(--route-3)',
    role: '17 岁制作人（彩P）',
    frequency: '102.15 MHz',
    quote: '「如果八千年的电波都是你发给我的，那这一次，换我亲手把你接回现实。」',
    bio: '独自在东京兼顾重点高中学业与深夜打工的 17 岁少女，平日里唯一的慰藉是躲进「月读」看月见八千代的直播。收留辉夜后以「彩P」之名担任作词编曲搭档；得知跨越八千年的真相后，大学转修机械义体技术，决心为现实中的她造一具可触碰的躯体。',
    tags: ['#彩P', '#作词编曲', '#机械义体'],
    relatedRoute: {
      label: '阅读 ROUTE 02 · 彩P与任性公主',
      href: '/posts/tsukuyomi-debut/',
    },
    forms: [
      {
        id: 'tsukuyomi',
        label: '月读虚拟形态',
        image: '/images/chars/iroha-tsukuyomi.webp',
        caption: 'TSUKUYOMI AVATAR · 靛青狐耳兜帽与肩背合成器',
      },
      {
        id: 'real',
        label: '东京水手服',
        image: '/images/chars/iroha-real.webp',
        caption: 'TOKYO SCHOOL · 挂着粉色扁面蛸挂件的书包',
      },
    ],
  },
  {
    id: 'yachiyo',
    code: 'SIGNAL 03',
    name: '月见八千代',
    jpName: '月見ヤチヨ / YACHIYO RUNAMI',
    cv: 'CV. 早见沙织',
    accent: 'var(--route-5)',
    role: '月读管理者 · 八千年守望者',
    frequency: '8000.00 kHz',
    quote: '「我筑起了整座月读，只是为了静静等那个 17 岁的女孩戴上耳机走进来。」',
    bio: '虚拟空间「月读」的管理者与殿堂级虚拟偶像，手持朱红和伞、怀抱海蛞蝓/扁面蛸吉祥物，歌声温柔治愈却隐约藏着穿越漫长时光的静谧疏离。她的真实身份正是乘飞船折返却坠入八千年前、将思念化作《竹取物语》并守望至今的辉夜。',
    tags: ['#月读管理者', '#八千年闭环', '#早见沙织'],
    relatedRoute: {
      label: '阅读 ROUTE 05 · 月见八千代的漫长守望',
      href: '/posts/eight-thousand-years/',
    },
    forms: [
      {
        id: 'tsukuyomi',
        label: '月读管理者形态',
        image: '/images/chars/yachiyo-tsukuyomi.webp',
        caption: 'TSUKUYOMI ADMIN · 朱红和伞、水镜靛裾与八千年光阴',
      },
    ],
  },
];
