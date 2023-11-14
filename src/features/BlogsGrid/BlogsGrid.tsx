import React from 'react'
import { BlogCard } from 'features'
import s from './BlogsGrid.module.scss'

interface BlogsGridProps {
  cards: any
}

const BlogsGrid = ({ cards }: BlogsGridProps) => {
  return (
    <section className={s.grid}>
      {cards.map((item: any) => {
        return <BlogCard key={item.id} {...item} className={s.card} />
      })}
    </section>
  )
}
export default BlogsGrid
