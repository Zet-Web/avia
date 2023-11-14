import facebookIcon from '/public/assets/images/icons/blogPage/facebookIcon.png'
import telegramIcon from '/public/assets/images/icons/blogPage/telegramIcon.png'
import vkIcon from '/public/assets/images/icons/blogPage/vkIcon.png'
import image1 from '/public/assets/images/icons/blogPage/image1.png'
import image2 from '/public/assets/images/icons/blogPage/image2.png'
import image3 from '/public/assets/images/icons/blogPage/image3.png'
import image4 from '/public/assets/images/icons/blogPage/image4.png'
import blogcard from '/public/assets/images/blogcard.png'
import avatar from '/public/assets/images/comment_avatar.png'

// import { Blog } from 'shared/types/blog'

export const blogPageMock = {
  createdAt: '2023-02-11T09:33:13.723Z',
  updatedAt: '2023-02-13T08:14:24.868Z',
  locale: 'ru',
  id: 9,
  titleSection: {
    createdAt: '2023-02-11T09:33:13.723Z',
    updatedAt: '2023-02-13T08:14:24.868Z',
    title: '10 мест Парижа для хорошего отдыха на выходных',
    images: image1.src,
  },
  section: [
    {
      title: 'Музей Лувр',
      text: 'Смотрели фильм «Бельфегор – призрак Лувра?». Хотите побывать там, где проводились его съемки со знаменитыми, может даже вашими любимыми актерами? Где летали призраки и передвигались мумии? Тогда вам прямая дорога в Лувр – один из самых древних музеев мира. Каждый год его посещают от 7 до 10 миллионов человек.',
      images: image2.src,
    },
    {
      title: 'Эйфелева башня',
      text: 'Ну кто не знает об этой удивительной конструкции? Наверняка о знаменитой башне знают все! Такого чуда вы не найдете в других городах мира. Высота башни — более трехсот метров!',
      images: image3.src,
    },
  ],
  tags: [
    { id: 24, tag: '#СОВЕТЫ' },
    {
      id: 25,
      tag: '#ГАЙДЫ',
    },
  ],
  socialSection: [
    {
      name: 'vk',
      icon: vkIcon.src,
      link: '#',
    },
    {
      name: 'telegram',
      icon: telegramIcon.src,
      link: '#',
    },
    {
      name: 'Facebook',
      icon: facebookIcon.src,
      link: '#',
    },
  ],
  recommendSection: {
    title: 'Рекомендации',
    subtitle:
      'Интересно, а порой и полезно, почитать перед путешествием!',
    blogCards: [
      {
        image: blogcard.src,
        id: 1,
        title: '3 самых дешёвых страны Европы',
        tags: ['подборки'],
        createdAt: '12.06.2019',
      },
      {
        image: blogcard.src,
        id: 2,
        title: '3 самых дешёвых страны Европы',
        tags: ['подборки'],
        createdAt: '12.06.2019',
      },
      {
        image: blogcard.src,
        id: 3,
        title: '3 самых дешёвых страны Европы',
        tags: ['подборки'],
        createdAt: '12.06.2019',
      },
      {
        image: blogcard.src,
        id: 4,
        title: '3 самых дешёвых страны Европы',
        tags: ['подборки'],
        createdAt: '12.06.2019',
      },
      {
        image: blogcard.src,
        id: 5,
        title: '3 самых дешёвых страны Европы',
        tags: ['подборки'],
        createdAt: '12.06.2019',
      },
    ],
  },
  authorSection: {
    avatar: avatar.src,
    tag: 'Автор',
    link: '#',
    name: 'Евгений Пороховой',
  },
  commentSection: {
    likeAmount: 24,
    likeHandler: () => console.log('like'),
    commentAmount: 23,
    answerHandler: () => console.log('answer'),
    hasMore: true,
    loadMore: () => console.log('load'),
    comments: [
      {
        id: 1,
        avatar: avatar.src,
        name: 'Евгений Пороховой',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
        createdAt: '22 мая 2020, 21:48',
        isAppeal: false,
      },
      {
        id: 2,
        avatar: avatar.src,
        name: 'Григорий Пронин',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
        createdAt: '22 мая 2020, 21:48',
        isAppeal: true,
        appealName: 'Евгений Пороховой',
      },
    ],
  },
}
