export interface BgmTrack {
  id: string;
  title: string;
  artist: string;
  tag: string;
  src: string;
  routeHref?: string;
  routeHint?: string;
}

export const BGM_TRACKS: BgmTrack[] = [
  {
    id: 'ex-otogibanashi',
    title: 'Ex-Otogibanashi (前尘物语)',
    artist: 'ryo (supercell) · 辉夜 & 月见八千代',
    tag: '主题曲',
    src: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/51/61/6c/51616ca9-4f37-f977-72a4-6a5299cea5d2/mzaf_17933705570527889606.plus.aac.p.m4a',
    routeHref: '/posts/vocaloid-constellation/',
    routeHint: 'ROUTE 03 乐评',
  },
  {
    id: 'ray',
    title: 'ray (超かぐや姫! Version)',
    artist: '辉夜 (夏吉优子) & 月见八千代 (早见沙织)',
    tag: '片尾曲',
    src: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/85/c1/77/85c17769-0757-aa50-5918-5f5c8485f95f/mzaf_861246101108246664.plus.aac.p.m4a',
    routeHref: '/posts/vocaloid-constellation/',
    routeHint: 'ROUTE 03 乐评',
  },
  {
    id: 'starry-sea',
    title: '星降る海 (星降之海)',
    artist: 'Aqu3ra · 月见八千代 (早见沙织)',
    tag: '插曲',
    src: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/70/f0/df/70f0dff7-6b18-00d3-8fbb-45a40b8eaef3/mzaf_14265079470440979249.plus.aac.p.m4a',
    routeHref: '/posts/vocaloid-constellation/',
    routeHint: 'ROUTE 03 乐评',
  },
  {
    id: 'remember',
    title: 'Remember (忆昔)',
    artist: 'yuigot · 月见八千代 (早见沙织)',
    tag: '插曲',
    src: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/48/03/32/480332c2-fb79-9c44-9072-353f9f477040/mzaf_5310244352703848222.plus.aac.p.m4a',
    routeHref: '/posts/eight-thousand-years/',
    routeHint: 'ROUTE 05 守望录',
  },
  {
    id: 'reply',
    title: 'Reply (答覆)',
    artist: 'kz (livetune) · 辉夜 (夏吉优子)',
    tag: '插曲',
    src: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b0/f1/8b/b0f18b4d-4188-fbfe-147c-9514834380d5/mzaf_4669912705375990672.plus.aac.p.m4a',
    routeHref: '/posts/vocaloid-constellation/',
    routeHint: 'ROUTE 03 乐评',
  },
  {
    id: 'symphony',
    title: '瞬間、シンフォニー。(瞬、交响。)',
    artist: '40mP · 辉夜 (夏吉优子)',
    tag: '插曲',
    src: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d6/91/80/d691808f-3ffc-1a4b-f7d4-c0a102eb9c3d/mzaf_4272942059550279726.plus.aac.p.m4a',
    routeHref: '/posts/tsukuyomi-debut/',
    routeHint: 'ROUTE 02 舞台记',
  },
  {
    id: 'love-myself',
    title: '私は、わたしの事が好き。',
    artist: 'HoneyWorks · 辉夜 (夏吉优子)',
    tag: '插曲',
    src: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/23/a7/05/23a70572-879e-a356-ba26-3faaf9715952/mzaf_14772113849473714523.plus.aac.p.m4a',
    routeHref: '/posts/tsukuyomi-debut/',
    routeHint: 'ROUTE 02 舞台记',
  },
  {
    id: 'world-is-mine',
    title: 'ワールドイズマイン (CPK! Remix)',
    artist: 'ryo (supercell) · 辉夜 & 月见八千代',
    tag: 'Remix',
    src: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3a/87/c7/3a87c7f4-399a-1f5e-2926-d8cb1023a539/mzaf_6346679346938156730.plus.aac.p.m4a',
    routeHref: '/posts/tsukuyomi-debut/',
    routeHint: 'ROUTE 02 舞台记',
  },
  {
    id: 'serenade-8000',
    title: '満ちる月のセレナーデ 〜八千年の旅〜',
    artist: 'コーニッシュ (Conisch)',
    tag: 'OST BGM',
    src: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3a/af/f6/3aaff636-a0e5-ac1a-c21b-e42a40a3f332/mzaf_16212865242412555736.plus.aac.p.m4a',
    routeHref: '/timeline/',
    routeHint: '八千年时间线',
  },
  {
    id: 'kaguya-iroha',
    title: 'かぐやと彩葉 (辉夜与彩叶)',
    artist: 'コーニッシュ (Conisch)',
    tag: 'OST BGM',
    src: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/80/b2/4d/80b24d91-4eea-f031-73f2-4069f5cd35e5/mzaf_18256382059542145897.plus.aac.p.m4a',
    routeHref: '/posts/glowing-pole/',
    routeHint: 'ROUTE 01 初遇',
  },
];
