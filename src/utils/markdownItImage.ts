import MarkdownIt, { type Token } from "markdown-it";
import { isArray, isEmpty } from 'lodash-es'

const isStartWithHttp = (url: string) => {
  return url.startsWith('http://') || url.startsWith('https://')
}

const isImage = (url: string) => {
  return url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.gif') || url.includes('.webp') || url.includes('.avif') || url.includes('.svg') || url.includes('.bmp') || url.includes('.ico') || url.includes('.tif') || url.includes('.tiff')
}

const isAudio = (url: string) => {
  return url.includes('.mp3') || url.includes('.wav') || url.includes('.ogg') || url.includes('.flac') || url.includes('music.163.com')
}

const lazyLoadImage = (token: Token) => {
  token.attrSet('loading', 'lazy');
  token.attrSet('decoding', 'async');
}

const renderAudio = (token: Token) => {
  const audioPath = token.attrGet('src')
  const cover = isArray(token.children) && !isEmpty(token.children) ? token.children[0].content : ''

  return `<div class="audio-container">
    <img class="audio-cover" src="${cover}"  />
    <audio controls autoplay loop src="${audioPath}" />
  </div>`
}

const renderVideo = () => { }


const handleImagePath = (token: Token) => {
  const imgSrc = token.attrGet('src');
  // @ts-ignore
  const imgPath = isStartWithHttp(imgSrc!) ? imgSrc : new URL(`/src/assets/images/${imgSrc?.split('/').at(-1)}`, import.meta.url).href
  return imgPath
}

export default function markdownItImage(md: MarkdownIt) {

  const defaultImageRenderer = md.renderer.rules.image;

  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];

    if (isAudio(token.attrGet('src')!)) {
      return renderAudio(token)
    }

    lazyLoadImage(token)
    token.attrSet('src', handleImagePath(token)!);

    return defaultImageRenderer!(tokens, idx, options, env, self);
  };

}
