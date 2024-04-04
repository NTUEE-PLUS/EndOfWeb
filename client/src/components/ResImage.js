import React from 'react'
import propType from 'prop-types'
import { CImage } from '@coreui/react'

import 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange'
import 'lazysizes/plugins/respimg/ls.respimg.js'

/**
 * ResImage component displays an image with lazy loading support and multiple image sources.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.avifSrc - The AVIF image source object.
 * @param {Object} props.jpgSrc - The JPG image source object.
 * @param {Object} props.webpSrc - The WebP image source object.
 * @param {string} props.alt - The alternative text for the image.
 * @param {boolean} props.lazySize - Enable this help provide an actual size automatically to load proper size size, but since it will deffer the image load, **don't use it for images that user can see at the first glance.**
 * @param {string} props.sizes - The sizes attribute for the image. For images near to top, please use it instead of lazySize.
 * @param {string} props.className - The CSS class name for the image.
 * @returns {JSX.Element} The rendered ResImage component.
 */
const ResImage = ({ avifSrc, jpgSrc, webpSrc, alt, lazySize, sizes, ...props }) => {
  return lazySize ? (
    <picture>
      {avifSrc && <source data-srcset={avifSrc.srcSet} type="image/avif" data-sizes="auto" />}
      {webpSrc && <source data-srcset={webpSrc.srcSet} type="image/webp" data-sizes="auto" />}
      <CImage
        {...props}
        data-src={jpgSrc || webpSrc || avifSrc}
        data-srcset={jpgSrc.srcSet}
        data-sizes="auto"
        alt={alt || null}
        className={`lazyload ${props.className || ''}`}
      />
    </picture>
  ) : (
    <picture>
      {avifSrc && <source srcSet={avifSrc.srcSet} type="image/avif" sizes={sizes || 'auto'} />}
      {webpSrc && <source srcSet={webpSrc.srcSet} type="image/webp" sizes={sizes || 'auto'} />}
      <CImage
        {...props}
        src={jpgSrc || webpSrc || avifSrc}
        srcSet={jpgSrc.srcSet}
        sizes={sizes || 'auto'}
        alt={alt || null}
      />
    </picture>
  )
}

ResImage.propTypes = {
  avifSrc: propType.any,
  jpgSrc: propType.any,
  webpSrc: propType.any,
  alt: propType.string,
  className: propType.string,
  lazySize: propType.bool,
  sizes: propType.string,
}

export default ResImage
