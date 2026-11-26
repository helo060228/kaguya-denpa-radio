export interface GalleryPlate {
  id: string;
  fig: string;
  title: string;
  caption: string;
  src: string;
}

export const GALLERY_PLATES: GalleryPlate[] = [
  {
    id: 'cg-01',
    fig: 'FIG.01',
    title: '月读灯笼舞台',
    caption: '官网第一弹主视觉：鸟居与万千浮灯环绕之下，辉夜静坐于虚拟舞台中央。',
    src: '/images/backdrop-main.jpg',
  },
  {
    id: 'cg-02',
    fig: 'FIG.02',
    title: '月读樱花街 Live',
    caption: '官网第二弹主视觉：举起麦克风的辉夜与背着键盘的彩叶跃过霓虹樱花街，屋檐上是月见八千代。',
    src: '/images/route-02-tsukuyomi.jpg',
  },
  {
    id: 'cg-03',
    fig: 'FIG.03',
    title: '深夜公寓的创作日常',
    caption: '官网第三弹主视觉：东京单身公寓里的 MIDI 键盘、录音麦与屏幕上闪烁的月读直播。',
    src: '/images/route-01-apartment.jpg',
  },
  {
    id: 'cg-04',
    fig: 'FIG.04',
    title: 'ray 超かぐや姫！Version',
    caption: '山下清悟导演亲自执导的 ED 官方 MV 静止帧：鸟居光幕下并肩歌唱的三人。',
    src: '/images/route-03-ray.jpg',
  },
  {
    id: 'cg-05',
    fig: 'FIG.05',
    title: '不夜虚拟都「月读」',
    caption: '官方世界观场景图：全息游鱼与浮空画舫交织的新时代电子桃源。',
    src: '/images/gallery-tsukuyomi-city.jpg',
  },
  {
    id: 'cg-06',
    fig: 'FIG.06',
    title: '水镜月夜亭台',
    caption: '官方美术背景：八千年漫长守望中，灯火倒映在深靛水面上的静谧回廊。',
    src: '/images/route-05-pavilion.jpg',
  },
];
