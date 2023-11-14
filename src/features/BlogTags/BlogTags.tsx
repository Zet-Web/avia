import { FC } from 'react'
import cn from 'classnames'
import TruncateMarkup from 'react-truncate-markup'

import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import { getTagsPerView } from 'shared/helpers/getTagsPerView'

import { Tags } from 'shared/types/blogs'

import s from './blogTags.module.scss'
import { useRouter } from 'next/router'

interface BlogTagsProps {
  tags?: Tags[]
  activeTag?: string[] | string
}

const BlogTags: FC<BlogTagsProps> = ({ tags, activeTag }) => {
  const { width } = useWindowDimensions()
  const router = useRouter()

  const handleTagChange = (tag: string, id: number) => {
    id !== 32 ? router.push(`/blog?tag=${tag}`) : router.push('/blog')
  }

  const isTagActive = (tag: string, id: number) => {
    return id === 32 ? !router.query.tag : tag === activeTag
  }

  const handleCountElipsTag = (node: any) => {
    if (!node || !node.props) return
    return (
      <>
        <div className={s.elipse}>
          ...
          <div className={s.hideTags}>
            {tags?.slice(node.props.children.length).map((el, i) => (
              <span
                key={el.id}
                onClick={e => handleTagChange(el.tag, el.id)}
                className={s[`active${isTagActive(el.tag, el.id)}`]}
              >
                #{el.tag.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.tags}>
          {/*<TruncateMarkup lines={1} ellipsis={handleCountElipsTag}>*/}
          {/*<div style={{ display: 'flex' }}>*/}
          {tags?.map((el, i) => (
            //<TruncateMarkup.Atom key={el.id}>
            <div
              key={i}
              onClick={e => handleTagChange(el.tag, el.id)}
              className={cn(
                s[`active${isTagActive(el.tag, el.id)}`],
                s.tag
              )}
            >
              {i < getTagsPerView(width) ? (
                el.tag.toUpperCase()
              ) : (
                <div>{el.tag}</div>
              )}
            </div>
            //</TruncateMarkup.Atom>
          ))}
          {/*</div>*/}
          {/*</TruncateMarkup>*/}
        </div>
      </div>
    </div>
  )
}

export default BlogTags
