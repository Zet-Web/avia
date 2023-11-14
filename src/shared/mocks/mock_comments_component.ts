import avatar from '/public/assets/images/comment_avatar.png'

export const CommentsMock = {
  comments: [
      {
        author: {
          id: 1,
          avatar: avatar.src,
          name: 'Евгений Пороховой',
        },
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
        createdAt: '22 мая 2020, 21:48',
        threadOf: null
      },
      {
        author: {
          id: 2,
          avatar: avatar.src,
          name: 'Григорий Пронин',
        },
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
        createdAt: '22 мая 2020, 21:48',
        threadOf: 1
      },
      {
        author: {
          id: 3,
          avatar: avatar.src,
          name: 'Евгений Пороховой',
        },
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
        createdAt: '22 мая 2020, 21:48',
        threadOf: 2
      },
      {
        author: {
          id: 4,
          avatar: avatar.src,
          name: 'Евгений Пороховой',
        },
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
        createdAt: '22 мая 2020, 21:48',
        threadOf: null
      },
    ],
}
