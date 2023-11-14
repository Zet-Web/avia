import { useTranslation } from 'next-i18next'
import { FC, useEffect, useState } from 'react'

import { Button, Select } from 'components'
import { BlogSearchModal, BlogSection, BlogTags } from 'features'

import { AxiosStrapiBlogsPageResponse } from 'shared/api'
import {
  getBlogsContent,
  getFilterBlogsContent,
  getSearchBlogsContent,
} from 'shared/api/routes/blogs'
import { formatSearchBlogsContent } from 'shared/helpers/formatSearchBlogsContent'

import { BlogsContentProps, Tags } from 'shared/types/blogs'

import s from './blogsPage.module.scss'

import {
  BLOG_PAGINATION_COUNT,
  NEW_BLOGS_TO_DISPLAY,
} from 'shared/constants/pagination'

import { useRouter } from 'next/router'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import { useAppSelector } from '../../redux/hooks'
import Head from 'next/head'
import BlogHeader from './BlogHeader/BlogHeader'
import { options } from './mock'

export interface BlogsPageProps {
  blogs: BlogsContentProps[]
  tags: Tags[]
}

export const BlogsPage: FC<BlogsPageProps> = ({ blogs, tags }) => {
  const { t } = useTranslation(['blogSection', 'meta'])
  const { width } = useWindowDimensions()
  const language = useAppSelector(
    state => state.settings.language
  ).toLowerCase()

  const [isOpenModalSearch, setIsOpenModalSearch] =
    useState<boolean>(false)
  const [isLoaiding, setIsLoading] = useState<boolean>(true)
  const [value, setValue] = useState({ label: '', value: '' })

  const {
    query: { tag: currentTag },
  } = useRouter()

  const [searchModalValue, setSearchModalValue] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')
  const [filteredBlogs, setFilteredBlogs] =
    useState<AxiosStrapiBlogsPageResponse | null>(null)

  // response search blog
  const [searchedBlogs, setSearchedBlogs] = useState<
    BlogsContentProps[] | null
  >(null)

  const [paginationCount, setPaginationCount] = useState<number>(
    BLOG_PAGINATION_COUNT
  )

  const [loadPaginationBlogs, setLoadPaginationBlogs] = useState<
    BlogsContentProps[] | null
  >(null)

  const handleChange = (value: string) => {
    setSearchModalValue(value)
  }

  const getActiveTag = () => {
    const active = tags.filter(item => item.tag === currentTag)
    return active.length ? active[0].tag : t('blogSection:all:title')
  }
  useEffect(() => {
    getFilterBlogs(currentTag as string, paginationCount)
    searchValue ? getSearchBlog() : null
    setSearchValue('')
    paginationCount <= BLOG_PAGINATION_COUNT
      ? null
      : getLoadMoreBlogs(paginationCount)
  }, [searchValue, paginationCount, currentTag])

  useEffect(() => {
    setPaginationCount(BLOG_PAGINATION_COUNT)
  }, [currentTag])

  const getFilterBlogs = async (tag: string, count: number) => {
    setIsLoading(true)
    setSearchedBlogs(null)
    await getFilterBlogsContent(language, getActiveTag(), count)
      .then(res => setFilteredBlogs(res.data))
      .then(() => setIsLoading(false))
  }

  const getLoadMoreBlogs = async (count: number) => {
    const loadMoreBlogs = (await getBlogsContent(language, count))
      .data.data
    setLoadPaginationBlogs(loadMoreBlogs)
  }

  const getSearchBlog = async () => {
    const resultSearch = await getSearchBlogsContent(
      language,
      searchValue
    ).then()
    const result = formatSearchBlogsContent(resultSearch.data.blogs)
    setSearchedBlogs(result)
  }

  const handleSearchBlogs = () => {
    setSearchValue(searchModalValue)
    setIsOpenModalSearch(false)
    setSearchModalValue('')
  }
  const blogsToDisplay = () => {
    if (searchedBlogs?.length) {
      return searchedBlogs
    } else if (searchedBlogs?.length === 0) {
      return searchedBlogs
    } else if (filteredBlogs?.data.length) {
      return filteredBlogs.data
    } else if (loadPaginationBlogs?.length) {
      return loadPaginationBlogs
    } else return blogs
  }

  const hasMore = (displayBlogs: BlogsContentProps[]) => {
    return displayBlogs
      ? displayBlogs?.length >= paginationCount
      : true
  }

  return (
    <div className={s.wrapperBlog}>
      <Head>
        <title>{t('meta:titles:blogs')}</title>
      </Head>
      <BlogSearchModal
        isOpen={isOpenModalSearch}
        onClose={() => setIsOpenModalSearch(false)}
        value={searchModalValue}
        onChange={handleChange}
        onSearch={() => handleSearchBlogs}
      />

      <BlogHeader posts={blogs.slice(0, 4)} />

      <div className={s.headerSection}>
        <Select
          value={value.label}
          setValue={setValue}
          options={options}
          placeholder={t('blogSection:placeholder')}
        />
        <BlogTags activeTag={currentTag || ''} tags={tags} />
        <Button
          title=''
          className={s.buttonSearch}
          onClick={() => setIsOpenModalSearch(!isOpenModalSearch)}
        />
      </div>
      <div className={s.content}>
        {searchedBlogs?.length !== undefined ||
        filteredBlogs?.data.length ||
        currentTag ? null : (
          <div className={s.staticContent}>
            <BlogSection
              posts={blogs.slice(0, NEW_BLOGS_TO_DISPLAY)}
              title={t('blogSection:new:title')}
              hasMore={false}
              isLoaiding={isLoaiding}
            />
            <BlogSection
              posts={blogs}
              title={t('blogSection:popular:title')}
              hasMore={false}
              isLoaiding={isLoaiding}
              isLeftSideSkeleton={true}
            />
          </div>
        )}

        {currentTag && !filteredBlogs ? null : (
          <BlogSection
            posts={blogsToDisplay()}
            title={getActiveTag().toLowerCase()}
            titleClassName={s.title}
            hasMore={hasMore(blogsToDisplay())}
            loadMore={() => setPaginationCount(paginationCount + 8)}
            hasSlider={false}
            isLoaiding={isLoaiding}
          />
        )}
      </div>
    </div>
  )
}
