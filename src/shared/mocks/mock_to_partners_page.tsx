import businessMeeting from '/public/assets/images/businessMeeting.png'
import saleIcon from '/public/assets/images/icons/partnersPage/saleIcon.png'
import customersIcon from '/public/assets/images/icons/partnersPage/customersIcon.png'
import graphIcon from '/public/assets/images/icons/partnersPage/graphIcon.png'

export const toPartnersPageMock = {
  headerSection: {
    title: 'Партнёрам',
    text: 'Наша компания безусловно планирует расти. Мы будем рады партнёрам, которые расположенным к взаимовыгодному сотрудничеству. Но давайте обо всём по порядку.',
    img: businessMeeting.src,
  },
  whyUsSection: {
    title: 'Почему именно мы?',
    cards: [
      {
        title: 'Прогрессивные технологии',
        text: 'Наша компания  идёт в ногу со временем, поэтому ООО «ТТК МерЛайнс» использует все возможные преимущества современного мира. Такой подход поможет и клиентам, которые смогут проще найти билеты с помощью умных фильтров, и партнёрам, которым не придётся тратить много времени на обмен полезной информацией.',
      },
      {
        title: 'Во главе угла стоит комфорт пользователей',
        text: 'Наша компания ищет умные решения, которые направлены на создание комфортных условий. Например, возьмём дизайн сайта. Он разработан так, чтобы человек мог быстро найти то, что ему нужно, не напрягая глаза. И это желание находить оптимальное решение проявляется на всех уровнях нашей компании.',
      },
      {
        title: 'Молодая компания',
        text: 'Мы не так давно на рынке, а это значит, что хороший сервис будет продолжать расти и развиваться. Также мы не будем останавливаться на достигнутом, так как каждый сотрудник желает выйти на новый уровень. Это помогает и всей компании расти и развиваться.',
      },
      {
        title: 'Надёжность',
        text: 'Вы не услышите много отрицательных отзывов от клиентов, потому что наш сайт честно рассказывает о всех доступных предложениях. Мы выполняем свои обещания, что позволяет нам с лёгкостью находить всё новых и новых клиентов.',
      },
    ],
  },
  benefitsSection: {
    title: 'Какую выгоду получит ваша компания',
    text: 'Так как мы собираем информацию о билетах, то мы будем рады получать её из первых рук. Поэтому, если вы продаёте билеты на выбранные направления или организовываете поездки и путешествия, то мы будем рады сотрудничать с вами. Тем более, каждая из сторон получит свою выгоду.',
    cards: [
      {
        title: 'Больше клиентов',
        text: 'Вы сможете получить больше клиентов, которые узнают о вас через сайт нашей компании. Да-да, вам больше не нужно будет платить за рекламу, ведь о вас будут узнавать совершенно бесплатно на нашем сайте. А свободные деньги вы сможете направить на развитие своего бизнеса.',
        icon: customersIcon.src,
      },
      {
        title: 'Реклама акций',
        text: 'А ещё наш сайт – прекрасная возможность рекламировать акции, скидки и другие новости. Мы информируем наших клиентов обо всех изменениях цен и наличии «Горячих билетов». А это значит, что о ваших выгодных предложениях узнает большое количество людей.',
        icon: saleIcon.src,
      },
      {
        title: 'Продвижение',
        text: 'А ещё мы поможем вам в продвижении вашего сайта. Благодаря сотрудничеству к вам на сайт будет переходить большое количество пользователей, что позволит вам улучшить свои позиции в поисковой выдачи, не нанимая для этого специалистов.',
        icon: graphIcon.src,
      },
    ],
  },
  uniqueOffersSection: {
    title: 'Уникальные предложения',
    text: 'Для своих партнёров мы регулярно продумываем уникальные предложения, которые должны сделать сотрудничество более приятным.',
    cards: [
      'Самое популярное из них – настройка автоматической передачи данных по API. Благодаря этому вам не нужно будет самостоятельно отправлять нам информацию о билетах и маршрутах. Она будет доставляться нам с помощью автоматических алгоритмов.',
      'Также своим партнёрам мы предлагаем возможность сделать уточнения. Например, вы хотите внести какое-то уточнение, касающееся цены билетов. Мы позволим вам это сделать, показав пользователю больше информации (выгода и для клиента, и для вас).',
      'Ещё мы подтвердим авторитетность вашего сайта. Если клиент посчитает, что вы недостаточно авторитетный сайт, то мы самостоятельно убедим его в обратном, подтвердив вашу надёжность. Благодаря чему ваша компания сможет повысить авторитет.',
      'И последнее – мы гарантируем хорошую конверсию. Наши системы специально проверяют каждое предложение на соответствие клиентов. Поэтому каждый человек, который перейдёт к вам на сайт, уже будет настроен на приобретение билета.',
    ],
  },
}
