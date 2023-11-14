import { BetweenInt } from 'shared/types/ticket'

export const endpoints_tickets = {
  create_session: '/tickets', //POST
  get_tickets: (state: string, query?: string) =>
    `/tickets/${state}?${query}`, //for POST and GET
  get_tickets_info: (state: string) => `/tickets/${state}/info`, //for tickets info
  get_week_price: (state: string) => `/week-price/${state}`,
  get_seller_info: (
    state: string,
    ticket_id: string,
    baggage: boolean
  ) =>
    `/tickets/${state}/sellers/${ticket_id}?offset=1&baggage=${baggage}`,

  get_info_transport: (state: string, flight_info_id: string) =>
    `/tickets/${state}/transport-info/${flight_info_id}`,
  cities: '/cities',
  status: (state: string) => `/status/${state}`,

  months_prices: (
    origin: string,
    destination: string,
    currency: string,
    vocation?: BetweenInt
  ) =>
    `/calendar/${origin}/${destination}/month?currency=${currency}${
      vocation
        ? `&vacation_min=${vocation?.min}&vacation_max=${vocation?.max}&one_way=false`
        : '&one_way=true'
    }`,
  days_prices: (
    origin: string,
    destination: string,
    currency: string,
    month: number,
    year?: number | null,
    vocation?: BetweenInt
  ) =>
    `/calendar/${origin}/${destination}/day?currency=${currency}${
      year ? `&year=${year}` : null
    }&month=${month}${
      vocation
        ? `&vacation_min=${vocation?.min}&vacation_max=${vocation?.max}&one_way=false`
        : '&one_way=true'
    }`,
  day_tickets: (
    origin: string,
    destination: string,
    currency: string,
    date: string,
    language: string,
    vocation?: BetweenInt
  ) =>
    `/calendar/${origin}/${destination}/day-details?currency=${currency}&language=${language}&date=${date}${
      vocation
        ? `&vacation_min=${vocation?.min}&vacation_max=${vocation?.max}&one_way=false`
        : '&one_way=true'
    }`,
}

export const endpoints_geo = {
  geo_cities_ip: (language: string) =>
    `/geo/cities/ip?language=${language}`,
  geo_validator: (title: string, language: string) =>
    `/geo/validator?title=${title}&language=${language}`,
  geo_cities: (language: string, iatas: string, airport: boolean) =>
    `/geo/cities?language=${language}&iatas=${iatas}&include_airport=${airport}`,
  geo_airports: (language: string, iatas: string) =>
    `/geo/airports?language=${language}&iatas=${iatas}`,
}

export const endpoints_auth = {
  login: '/login', // POST
  register: '/register', // POST
  verify: '/verify',
  forgot_password: '/forgot-password',
  reset_password: '/reset-password',
  me: '/me', //GET and PATCH

  logout: (token: string) => `/logout?token=${token}`, // POST
  refresh: `/refresh`, // POST
  rename_email: '/rename-email',
  request_rename_email: '/request-rename-email',
  avatar: '/avatar', //GET & DELETE & PATCH
}

export const endpoints_user = {
  history: '/history/route',
  history_delete: (state_id: string) => `history/route/${state_id}`,
  favourites: '/favourites/ticket',
  favourites_delete: (state_id: string, ticket_sing: string) =>
    `/favourites/ticket/${state_id}/${ticket_sing}`,
  tracking: '/tracking/route', // GET & POST
  tracking_delete: (state_id: string) =>
    `/tracking/route/${state_id}`,
  tracking_ticket: '/tracking/ticket', // GET & POST
  tracking_ticket_delete: (state_id: string, ticket_sing: string) =>
    `/tracking/ticket/${state_id}/${ticket_sing}`,
}

export const endpoints_strapi = {
  footer: (locale: string) =>
    `/footer?locale=${locale}&populate=deep`,
  about_project: '/about-project',
  about_us: '/about-us',
  privacy_page: '/privacy-page',
  blog: (id: number) => `/blogs/${id}?populate=*`,
  blogs: '/blogs',
  tags: '/tag',
  search_blogs: '/fuzzy-search/search',
  advertising: '/advertising',
  partner: '/partner',
  faq: '/faq',
  comments: (id: number) => `/comments/api::blog.blog:${id}`, // GET comments
}
