import React, { FC, useEffect, useState } from 'react'

import Socials from './Socials'
import ContentSection from './ContentSection'
import AuthorSection from './AuthorSection'
import CommentSection from './CommentSection'
import { BlogsContentProps } from 'shared/types/blogs'

import s from './blogPage.module.scss'
import { Comment } from 'shared/types/comment'

import {
  AuthorSection as AuthorSectionType,
  SocialSection,
} from 'shared/types/blog'
import { useWindowDimensions } from 'shared/hooks/useWindowDimension'
import Head from 'next/head'
import SearchTicketsBanner from 'components/SearchTicketsBanner/SearchTicketsBanner'
import RecommendSection from './RecommendSection'

const socialsMock: SocialSection[] = [
  {
    id: 0,
    name: 'yandex',
    link: 'https://ya.ru/',
    icon: '/assets/images/icons/social-logo/yandex.svg',
  },
  {
    id: 1,
    name: 'ok',
    link: `https://connect.ok.ru/offer?url=newURL&title=TITLE&imageUrl=`,
    icon: '/assets/images/icons/social-logo/ok.svg',
  },
  
  {
    id: 2,
    name: 'google',
    link: `https://www.google.com/`,
    icon: '/assets/images/icons/social-logo/google.svg',
  },
  {
    id: 3,
    name: 'vk',
    link: `http://vk.com/share.php?url=newURL&title=&description={$desc}&image={$image}&noparse=true`,
    icon: '/assets/images/icons/social-logo/vk.svg',
  },
  {
    id: 4,
    name: 'tg',
    link: `https://t.me/share/url?url=newURL&text=`,
    icon: '/assets/images/icons/social-logo/telegram.svg',
  },
]

export interface BlogPageProps {
  content: BlogsContentProps
  comment: Comment[]
}
const date = new Date(2020, 4, 22, 21, 48)
const comments: Comment[] = [
  {
    id: 1,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
    isBlocked: false,
    isThreadBlocked: true,
    blockReason: null,
    isAdminComment: null,
    removed: null,
    approvalStatus: null,
    createdAt: date + '',
    updatedAt: date + '',
    hasThread: true,
    threadFirstItemId: 1,
    author: {
      id: 2,
      name: 'Евгений Пороховой',
      email: 'Евгений@gmail.com',
      avatar: '/assets/images/comment_avatar.png',
    },
    children: [],
  },
  {
    id: 1,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
    isBlocked: false,
    isThreadBlocked: true,
    blockReason: null,
    isAdminComment: null,
    removed: null,
    approvalStatus: null,
    createdAt: date + '',
    updatedAt: date + '',
    hasThread: true,
    threadFirstItemId: 1,
    author: {
      id: 2,
      name: 'Евгений Пороховой',
      email: 'Евгений@gmail.com',
      avatar: '/assets/images/comment_avatar.png',
    },
    children: [],
  },
  {
    id: 1,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
    isBlocked: false,
    isThreadBlocked: true,
    blockReason: null,
    isAdminComment: null,
    removed: null,
    approvalStatus: null,
    createdAt: date + '',
    updatedAt: date + '',
    hasThread: true,
    threadFirstItemId: 1,
    author: {
      id: 2,
      name: 'Евгений Пороховой',
      email: 'Евгений@gmail.com',
      avatar: '/assets/images/comment_avatar.png',
    },
    children: [
      {
        id: 1,
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
        isBlocked: false,
        isThreadBlocked: true,
        blockReason: null,
        isAdminComment: null,
        removed: null,
        approvalStatus: null,
        createdAt: date + '',
        updatedAt: date + '',
        hasThread: true,
        threadFirstItemId: 1,
        author: {
          id: 2,
          name: 'Евгений Пороховой',
          email: 'Евгений@gmail.com',
          avatar: '/assets/images/comment_avatar.png',
        },
        children: [],
      },
    ],
  },
]
const authorSectionMock: AuthorSectionType = {
  tag: 'Автор',
  link: '',
}

const mockLikeAmount = 24

export const BlogPage: FC<BlogPageProps> = ({ content, comment }) => {
  const { width } = useWindowDimensions()
  const [ socialsShare, setSocialShare ] = useState(socialsMock)

  useEffect(() => {
    setSocialShare(newSocialMock)
  }, [])

  const currentURL = window.location.href;

  const newSocialMock = socialsMock.map((socialItem) => {
    return {
      ...socialItem,
      link: socialItem.link.replace("newURL", `${encodeURIComponent(currentURL)}`)
    };
  });

  return (
    <div className={s.blogPage}>
      <Head>
        {/* TODO добавить keywords, когда они появятся */}

        <meta
          name='description'
          content={content.attributes.section[0].text}
        />

        <title>Merlines | {content.attributes.title}</title>
      </Head>
      <div className={s.blogWrapper}>
        <div className={s.contentWrapper}>
          {width >= 700 && (
            <div className={s.socialsWrapper}>
              <Socials socials={socialsShare} />
            </div>
          )}
          <ContentSection {...content?.attributes} />

          {width <= 992 && (
            <div className={s.bannerWrapper}>
              <SearchTicketsBanner />
            </div>
          )}
          <AuthorSection {...authorSectionMock} />
          <div className={s.socials}>
            {/* <Socials socials={socialsMock} /> */}
          </div>
          {width < 700 && (
            <div className={s.socialsWrapper}>
              <Socials socials={socialsShare} />
            </div>
          )}
          <CommentSection
            likeAmount={mockLikeAmount}
            comment={comments}
          />
        </div>
      </div>
      <div className={s.recommendWrapper}>
        <RecommendSection tag={content?.attributes.tags[0].tag} />
      </div>
    </div>
  )
}
