// @ts-nocheck
import React, { FC, SetStateAction, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

import {
  ExampleWrapper,
  Text,
  Logo,
  Counter,
  Button,
  Textarea,
  Modal,
  Tabs,
  Input,
  Checkbox,
  Calendar,
  Tooltip,
  PriceItem,
  DropdownMenuCity,
  DirectionInput,
  Loading,
  Toast,
} from 'components'

import {
  AdvantagesSection,
  DetailButton,
  FlightCard,
  TransferTabs,
  Subscribe,
  Question,
  AskQuestionModal,
  SideMenu,
  BurgerMenu,
  CookiesPopup,
  RouteItem,
  CommentForm,
  SectionSoon,
  NoTicketsSection,
  RedirectingModal,
  SubscribeConfirmModal,
  AuthModal,
  FlightInfoCard,
  ViewSubscribeModal,
  BlogSearchModal,
  BlogTags,
  Login,
  EmailConfirm,
  SignUp,
  EditProfile,
  ThankYouPopup,
  ChangePassword,
  SubscribeProfileSection,
  AuthActionModal,
  AskQuestion,
  ProfileSidebarTabs,
  Ticket,
  CheckboxGroup,
  TicketFilter,
  HistoryCleanModal,
  DayPriceCalendar,
  SearchTickets,
  PassengerNumberPopup,
  PriceCalendarTicket,
  HowToContact,
  BottomMenu,
  SubscribePopup,
  GraphicBar,
  BlogCard,
  SpecialOffersSection,
  BlogsGrid,
} from 'features'

import { useAppDispatch, useAppSelector } from 'redux/hooks'

import { mock_flightcard } from 'shared/mocks/mock_flightcard'
import { Currency, Transfer } from 'shared/types'
import { routeItemMock } from 'shared/mocks/mock_routeItem'
import { TagsArray } from 'shared/mocks/mock_tags'
import { numberWithSpaces } from 'shared/helpers/getNumberWithSpace'
import { mock_plane_city } from '../../shared/mocks/mock_dropdown_cities'
import {
  calendar_price_ticket_mock,
  ticket,
} from '../../shared/mocks/mock_ticket'
import { DayPricesMock } from 'shared/mocks/mock_price_calendar_page'

import welcome from '/public/assets/images/welcome.png'

import s from './examplePage.module.scss'

import image from '../../../public/assets/images/recommend.jpg'
import { DirectionValue } from 'components/DirectionInput/DirectionInput'
import { selectIsAuth } from '../../redux/slices/authSlice/authSlice'
import TariffCard from 'features/TariffCard/TariffCard'
import { mock_tariff } from 'shared/mocks/mock_tariff'
import Skeleton from '../../components/Skeleton/Skeleton'
import MobileModal from '../../components/MobileModal/MobileModal'
import { ChartOptions } from 'chart.js'

export const ExamplePage: FC = () => {
  const { t } = useTranslation(['common'])

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)
  const { currency, language } = useAppSelector(
    state => state.settings
  )

  const [isHistoryModalOpen, seHistoryModalOpen] =
    useState<boolean>(false)
  const [counterValue, setCounterValue] = useState<number>(0)
  const [textAreaValue, setTextAreaValue] = useState<string>('')
  const [isSideMenuOpen, setIsSideMenuOpen] = useState<boolean>(false)
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] =
    useState<boolean>(false)
  const [isAuthModalOpen, setIsAuthModalOpen] =
    useState<boolean>(false)
  const [isViewSubscribeModalOpen, setIsViewSubscribeModalOpen] =
    useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isIosModalOpen, setIsIosModalOpen] = useState<boolean>(false)

  const [city, setCity] = useState<DirectionValue>({
    origin: { title: 'Москва', abbreviation: 'MSQ' },
    destination: null,
  })
  console.log(city)

  const [isAskModalOpen, setIsAskModalOpen] = useState<boolean>(false)

  const [isThankYouModalOpen, setIsThankYouModalOpen] =
    useState<boolean>(false)
  const [isChooseCountryPopupOpen, setIsChooseCountryPopupOpen] =
    useState<boolean>(false)

  const [isClosable, setIsClosable] = useState<boolean>(true)
  const [flightCard, setFlightCard] = useState<any>()
  const [isConfirmModalOpen, setIsConfirmModalOpen] =
    useState<boolean>(false)
  const [isRedirectingModalOpen, setIsRedirectingModalOpen] =
    useState<boolean>(false)
  const [isBlogSearchModalOpen, setIsBlogSearchModalOpen] =
    useState<boolean>(false)
  const [
    isSubscribeConfirmModalOpen,
    setIsSubscribeConfirmModalOpen,
  ] = useState<boolean>(false)
  const [isAuthActionModalOpen, setIsAuthActionModalOpen] =
    useState<boolean>(false)
  const [calendarValue, setCalendarValue] = useState<Date>(new Date())
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)

  const [isCookiesOpen, setIsCookiesOpen] = useState<boolean>(true)
  const [isPassengerNumberPopupOpen, setIsPassengerNumberPopupOpen] =
    useState<boolean>(false)
  const [passengerNumberPopupValue, setPassengerNumberPopupValue] =
    useState({
      men: 0,
      child: 0,
      baby: 0,
      isEconomSelected: false,
      isBusinessSelected: true,
    })

  const handleCalendarValueChange = (date: Date) => {
    setCalendarValue(date)
  }

  const handleCalendarClosed = () => {
    console.log('closed')
  }

  const [searchValue, setSearchValue] = useState<string>('')
  const [inputValue, setInputValue] = useState<string>('')

  const handleChange = (value: string) => {
    setInputValue(value)
  }

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
  }

  const [rangeValue, setRangeValue] = useState({ min: 0, max: 24 })
  const [value, setValue] = useState<number[]>([
    rangeValue.min,
    rangeValue.max,
  ])

  const rangeValueHandler = ([min, max]: number[]) => {
    setValue([min, max])
  }

  useEffect(() => {
    setFlightCard(mock_flightcard)
  }, [mock_flightcard])

  const blogCards = [
    {
      id: 0,
      title: '',
      createdAt: '02.11.2023',
      updatedAt: '02.11.2024',
      image: image,
      tags: [{ id: 0, tag: 'Hello' }],
      locale: 'RU',
      section: [
        {
          id: 0,
          title: 'Feugiat in fermentum',
          text: 'Feugiat in fermentum posuere urna nectin cidunt praesent...',
          images: image,
        },
      ],
    },
    {
      id: 1,
      title: '',
      createdAt: '02.11.2023',
      updatedAt: '02.11.2024',
      image: image,
      tags: [{ id: 0, tag: 'Test' }],
      locale: 'RU',
      section: [
        {
          id: 0,
          title: 'Feugiat in fermentum',
          text: 'Feugiat in fermentum posuere urna nectin cidunt praesent...',
          images: image,
        },
      ],
    },
    {
      id: 2,
      title: '',
      createdAt: '02.11.2023',
      updatedAt: '02.11.2024',
      image: image,
      tags: [{ id: 0, tag: 'Test' }],
      locale: 'RU',
      section: [
        {
          id: 0,
          title: 'Feugiat in fermentum',
          text: 'Feugiat in fermentum posuere urna nectin cidunt praesent...',
          images: image,
        },
      ],
    },
    {
      id: 3,
      title: '',
      createdAt: '02.11.2023',
      updatedAt: '02.11.2024',
      image: image,
      tags: [{ id: 0, tag: 'Test' }],
      locale: 'RU',
      section: [
        {
          id: 0,
          title: 'Feugiat in fermentum',
          text: 'Feugiat in fermentum posuere urna nectin cidunt praesent...',
          images: image,
        },
      ],
    },
    {
      id: 4,
      title: '',
      createdAt: '02.11.2023',
      updatedAt: '02.11.2024',
      image: image,
      tags: [{ id: 0, tag: 'Test' }],
      locale: 'RU',
      section: [
        {
          id: 0,
          title: 'Feugiat in fermentum',
          text: 'Feugiat in fermentum posuere urna nectin cidunt praesent...',
          images: image,
        },
      ],
    },
    {
      id: 5,
      title: '',
      createdAt: '02.11.2023',
      updatedAt: '02.11.2024',
      image: image,
      tags: [{ id: 0, tag: 'Test' }],
      locale: 'RU',
      section: [
        {
          id: 0,
          title: 'Feugiat in fermentum',
          text: 'Feugiat in fermentum posuere urna nectin cidunt praesent...',
          images: image,
        },
      ],
    },
    {
      id: 6,
      title: '',
      createdAt: '02.11.2023',
      updatedAt: '02.11.2024',
      image: image,
      tags: [{ id: 0, tag: 'Test' }],
      locale: 'RU',
      section: [
        {
          id: 0,
          title: 'Feugiat in fermentum',
          text: 'Feugiat in fermentum posuere urna nectin cidunt praesent...',
          images: image,
        },
      ],
    },
  ]

  const graphicData = [
    {
      month: 'Нояб',
      price: 9000,
      currency: Currency.RUB,
      isCheap: false,
    },
    {
      month: 'Дек',
      price: 8400,
      currency: Currency.RUB,
      isCheap: false,
    },
    {
      month: 'Янв',
      price: 9500,
      currency: Currency.RUB,
      isCheap: false,
    },
    {
      month: 'Февр',
      price: 7600,
      currency: Currency.RUB,
      isCheap: false,
    },
    {
      month: 'Март',
      price: 8753,
      currency: Currency.RUB,
      isCheap: false,
    },
    {
      month: 'Апр',
      price: 8973,
      currency: Currency.RUB,
      isCheap: false,
    },
    {
      month: 'Май',
      price: 7900,
      currency: Currency.RUB,
      isCheap: false,
    },
    {
      month: 'Июнь',
      price: 7100,
      currency: Currency.RUB,
      isCheap: false,
    },
    {
      month: 'Июль',
      price: 9700,
      currency: Currency.RUB,
      isCheap: false,
    },
    {
      month: 'Авг',
      price: 9300,
      currency: Currency.RUB,
      isCheap: false,
    },
    {
      month: 'Сен',
      price: 9290,
      currency: Currency.RUB,
      isCheap: false,
    },
    {
      month: 'Окт',
      price: 9350,
      currency: Currency.RUB,
      isCheap: false,
    },
  ]

  const options = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    responsive: true,
    plugins: {
      legend: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        display: false,
      },
      title: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#000',
        formatter: (value: number, context: any) => {
          if (context.dataset.data[context.dataIndex] !== undefined) {
            return (
              numberWithSpaces(
                context.dataset.data[context.dataIndex]
              ) + ' ₽'
            )
          }
          return ''
        },
      },
    },
    scales: {
      x: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        stacked: true,
        ticks: {
          font: {
            size: 14,
            height: 20,
            color: '#A1A1A1',
          },
        },
        grid: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          display: false,
        },
        maxScrollbarThumbSize: 10,
      },
      y: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        display: false,
        grid: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          display: false,
        },
      },
    },
    layout: {
      padding: {
        top: 400,
      },
    },
    elements: {
      bar: {
        borderRadius: 4,
      },
    },
  }

  const colors = [
    '#396EF6',
    '#396EF6',
    '#396EF6',
    '#63CC61',
    '#396EF6',
    '#396EF6',
    '#396EF6',
    '#63CC61',
    '#396EF6',
    '#396EF6',
    '#396EF6',
  ]

  const radioButton = [
    { id: 0, name: 'test', label: 'Один' },
    { id: 1, name: 'test', label: 'Два' },
    { id: 2, name: 'test', label: 'Три' },
  ]
  const checkbox = [
    { id: 0, name: 'rate-1', label: 'Один' },
    { id: 1, name: 'rate-1', label: 'Два' },
    { id: 2, name: 'rate-1', label: 'Три' },
  ]

  const [selectedOptionRadio, setSelectedOptionRadio] = useState(0)
  const [selectedOption, setSelectedOption] = useState(0)

  const onHandleChangeRadio = (newValue: SetStateAction<number>) => {
    setSelectedOptionRadio(newValue)
  }

  const onHandleChange = (newValue: SetStateAction<number>) => {
    setSelectedOption(newValue)
  }

  const [tariffCard, setTariffCard] = useState(0)

  const handleTariffCardSelect = (
    newValue: SetStateAction<number>
  ) => {
    setTariffCard(newValue)
  }

  return (
    <div className={s.container}>
      <ExampleWrapper title='GraphicBar'>
        <GraphicBar
          graphicData={graphicData}
          options={options as ChartOptions<'bar'>}
          colors={colors}
        />
      </ExampleWrapper>
      <ExampleWrapper title='Input Type Radio'>
        {radioButton.map(radio => (
          <>
            <Checkbox
              type={'radio'}
              key={radio.id}
              name={radio.name}
              value={radio.id}
              onChange={() => onHandleChangeRadio(radio.id)}
              isChecked={selectedOptionRadio === radio.id}
            />
          </>
        ))}
      </ExampleWrapper>

      <ExampleWrapper title='Input Type checkbox'>
        <div>
          <div
            style={{
              width: '200px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {checkbox.map(input => (
              <Checkbox
                type={'checkbox'}
                key={input.id}
                name={input.name}
                value={input.id}
                label={input.label}
                onChange={() => onHandleChange(input.id)}
                isChecked={selectedOption === input.id}
              />
            ))}
          </div>
          <div
            style={{
              width: '200px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {checkbox.map(input => (
              <Checkbox
                type={'checkbox'}
                key={input.id}
                name={input.name}
                className={s.checkbox}
                value={input.id}
                label={input.label}
                onChange={() => onHandleChange(input.id)}
                isChecked={selectedOption === input.id}
              />
            ))}
          </div>
          <div
            style={{
              width: '220px',
              padding: '0 10px',
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: '#596480',
            }}
          >
            {checkbox.map(input => (
              <Checkbox
                type={'checkbox'}
                key={input.id}
                name={input.name}
                className={s.checkbox2}
                value={input.id}
                label={input.label}
                onChange={() => onHandleChange(input.id)}
                isChecked={selectedOption === input.id}
              />
            ))}
          </div>
        </div>
      </ExampleWrapper>

      <ExampleWrapper title='Tariff cards'>
        <div className={s.flex}>
          {mock_tariff.map(item => (
            <TariffCard
              {...item}
              key={item.title}
              onChange={() => handleTariffCardSelect(item.id)}
              value={tariffCard}
              isChecked={tariffCard === item.id}
            />
          ))}
        </div>
      </ExampleWrapper>

      <ExampleWrapper title='SearchTickets'>
        <SearchTickets />
      </ExampleWrapper>

      <ExampleWrapper title='loading'>
        {null}
        {/*<Loading progress={100} />*/}
      </ExampleWrapper>

      <ExampleWrapper title='BlogTags'>
        <BlogTags tags={TagsArray} />
      </ExampleWrapper>

      <ExampleWrapper title='HistoryCleanModal'>
        <button onClick={() => seHistoryModalOpen(true)}>
          HistoryCleanModal
        </button>

        <HistoryCleanModal
          isOpen={isHistoryModalOpen}
          onClose={() => seHistoryModalOpen(false)}
          onRemove={() => console.log('remove')}
          text=''
        />
      </ExampleWrapper>

      <ExampleWrapper title='ThankYouPopup'>
        <button onClick={() => setIsThankYouModalOpen(true)}>
          ThankYouPopup
        </button>

        <ThankYouPopup
          isOpen={isThankYouModalOpen}
          onClose={() => setIsThankYouModalOpen(false)}
          onRemove={() => console.log('remove')}
          isSubscribe={false}
        />
      </ExampleWrapper>

      <ExampleWrapper title='Ask question popup'>
        <button onClick={() => setIsAskModalOpen(true)}>
          ask popup
        </button>

        <AskQuestionModal
          isOpen={isAskModalOpen}
          onClose={() => setIsAskModalOpen(false)}
        />
      </ExampleWrapper>

      <ExampleWrapper title='Subscribe  Popup'>
        <button onClick={() => setIsConfirmModalOpen(true)}>
          Subscribe Popup
        </button>
        <SubscribePopup
          onSubmit={(mail?: string) => console.log(mail)}
          onClose={() => setIsConfirmModalOpen(false)}
          isOpen={isConfirmModalOpen}
          from='Москва'
          to='Париж'
        />
      </ExampleWrapper>

      <ExampleWrapper title='Redux test'>
        <div>Is logged: {isAuth ? 'yes' : 'no'}</div>
        <br />
        {/*<div onClick={() => dispatch(loginUserRequested())}>*/}
        {/*  click to be logged*/}
        {/*</div>*/}
      </ExampleWrapper>

      <ExampleWrapper title='Headings and text'>
        <h1 className={s.h1}>Heading h1</h1>
        <h2 className={s.h2}>Heading h2</h2>
        <h3 className={s.h3}>Heading h3</h3>

        <p className={s.text}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Suscipit inventore nobis nostrum aliquid vel repellat
          architecto alias esse obcaecati minus sit, ullam recusandae
          laboriosam nihil vitae odio aspernatur eligendi. Quod?
        </p>

        <p className={s.textSmall}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Suscipit inventore nobis nostrum aliquid vel repellat
          architecto alias esse obcaecati minus sit, ullam recusandae
          laboriosam nihil vitae odio aspernatur eligendi. Quod?
        </p>
      </ExampleWrapper>

      <ExampleWrapper title='Logos'>
        <div style={{ background: '#00000030' }}>
          <Logo variant='primary' />
          <Logo variant='primary' isShortened />
          <Logo variant='secondary' />
          <Logo variant='secondary' isShortened />
        </div>
      </ExampleWrapper>

      <ExampleWrapper title='Input'>
        <Input
          value={inputValue}
          onChange={handleChange}
          placeholder={'Name'}
        />
      </ExampleWrapper>

      <ExampleWrapper title='FlightCard'>
        {flightCard && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
            }}
          >
            <FlightCard
              image={flightCard[0].bg}
              route={flightCard[0].route}
              destination={flightCard[0].destination}
              price={flightCard[0].price}
              size='normal'
              currency={Currency.USD}
            />
            <FlightCard
              image={flightCard[0].bg}
              route={flightCard[0].route}
              destination={flightCard[0].destination}
              price={flightCard[0].price}
              currency={Currency.RUB}
            />
          </div>
        )}
      </ExampleWrapper>

      <ExampleWrapper title='Counter'>
        <Counter
          value={counterValue}
          min={0}
          max={100}
          onChange={setCounterValue}
        />
      </ExampleWrapper>

      <ExampleWrapper title='Direction'>
        <TransferTabs
          prices={[17500, 17500, 10000]}
          currency={Currency.RUB}
        />
      </ExampleWrapper>

      <ExampleWrapper title='Button'>
        <Button title='Подписаться' onClick={() => { }} />
      </ExampleWrapper>
      <ExampleWrapper title='TextArea'>
        <Textarea
          onChange={setTextAreaValue}
          value={textAreaValue}
          placeholder='Введите текст...'
        />
      </ExampleWrapper>

      <ExampleWrapper title='Side Menu and Burger Menu'>
        <Button
          onClick={() => {
            setIsSideMenuOpen(true)
          }}
          title='Open sidemenu'
        />

        <Button
          onClick={() => {
            setIsBurgerMenuOpen(true)
          }}
          title='Open Burger Menu'
        />

        <SideMenu
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        >
          code
        </SideMenu>

        <BurgerMenu
          isOpen={isBurgerMenuOpen}
          onClose={() => setIsBurgerMenuOpen(false)}
        />
      </ExampleWrapper>

      <ExampleWrapper title='Subscribe'>
        <Subscribe />
      </ExampleWrapper>

      {/* <ExampleWrapper title='Dropdown menu city'>
        <div className={s.flex}>
          <DropdownMenuCity
            options={mock_plane_city}
            vehicle={'plane'}
            onChange={code => {
              console.log(code)
            }}
            onClose={() => {}}
          />
        </div>
      </ExampleWrapper> */}

      <ExampleWrapper title='detail button'>
        <DetailButton isDefaultOpen={false} variant={'question'}>
          Ответ
        </DetailButton>
      </ExampleWrapper>

      <ExampleWrapper title='Popup Subcribe'>
        <button onClick={() => setIsModalOpen(true)}>Modal</button>
        <button
          onClick={() => setIsClosable(prevState => !prevState)}
        >
          isClosable
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {' '}
          <>
            <button onClick={() => setIsModalOpen(false)}>
              Close
            </button>
            <h1>Москва -{`>`} Париж</h1>
            <input type='text' placeholder='email' />
            <p>
              Нажимая `&quot;`Подтвердить подписку `&quot;` Вы
              соглашаетесь с правилами использования сервиса и
              обработки персональных данных
            </p>
          </>
        </Modal>
      </ExampleWrapper>

      <ExampleWrapper title='Advantages'>
        <AdvantagesSection />
      </ExampleWrapper>

      <ExampleWrapper title='Tabs Item'>
        <Tabs
          content={[
            { component: <Logo key='primary' variant='primary' /> },
            {
              component: <Logo key='secondary' variant='secondary' />,
            },
            {
              component: (
                <Logo
                  key='secondary-shorten'
                  variant='secondary'
                  isShortened
                />
              ),
            },
          ]}
          tabs={[
            { title: 'Маршруты', index: 0 },
            { title: 'Билеты', index: 1 },
            {
              title: 'Link to Google',
              index: 2,
              link: 'https://www.google.com',
            },
          ]}
        />
      </ExampleWrapper>

      <ExampleWrapper title='BlogCard'>
        {/* <BlogCard
          id={mock_blogcard[0].id}
          image={mock_blogcard[0].image}
          title={mock_blogcard[0].title}
          createdAt={mock_blogcard[0].createdAt}
          tags={mock_blogcard[0].tags}
        /> */}
      </ExampleWrapper>

      <ExampleWrapper title='FAQ'>
        <Question title='Есть ли ограничения на перелёты по маршруту Москва - Париж?'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Fusce lobortis commodo erat, sed commodo nisl porttitor
            sit amet. Donec mollis vestibulum purus ut malesuada.
            Vivamus varius mi ut ante scelerisque, nec congue neque
            posuere. Etiam nec quam sapien. Mauris lectus neque,
            volutpat accumsan feugiat sed, sodales id massa. Praesent
            sodales, ante vitae hendrerit tincidunt, urna lectus
            congue neque, ut tristique diam ipsum id sem. Fusce
            condimentum lorem et urna finibus venenatis. Fusce sed mi
            at elit hendrerit laoreet eget sit amet risus.
          </p>
        </Question>

        <Question
          title='Есть ли ограничения на перелёты по маршруту Москва -
               Париж?'
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Fusce lobortis commodo erat, sed commodo nisl porttitor
            sit amet. Donec mollis vestibulum purus ut malesuada.
            Vivamus varius mi ut ante scelerisque, nec congue neque
            posuere. Etiam nec quam sapien. Mauris lectus neque,
            volutpat accumsan feugiat sed, sodales id massa. Praesent
            sodales, ante vitae hendrerit tincidunt, urna lectus
            congue neque, ut tristique diam ipsum id sem. Fusce
            condimentum lorem et urna finibus venenatis. Fusce sed mi
            at elit hendrerit laoreet eget sit amet risus.
          </p>
        </Question>
      </ExampleWrapper>

      <ExampleWrapper title='Calendar'>
        {/*<Calendar*/}
        {/*  onChange={handleCalendarValueChange}*/}
        {/*  value={calendarValue}*/}
        {/*  isOpen={isCalendarOpen}*/}
        {/*/>*/}
      </ExampleWrapper>

      <ExampleWrapper title='CookiesPopup'>
        <CookiesPopup
          isOpen={isCookiesOpen}
          onClose={() => setIsCookiesOpen(false)}
        />

        <CookiesPopup
          isOpen={isCookiesOpen}
          onClose={() => setIsCookiesOpen(false)}
        />
      </ExampleWrapper>

      <ExampleWrapper title='form component'>
        <div style={{ background: '#596480', padding: '20px' }}>
          <CommentForm
            placeholder='Опишите Ваш вопрос или проблему'
            onSubmit={data => console.log(data)}
          />
        </div>
        <div style={{ background: '#596480', padding: '20px' }}>
          <CommentForm
            placeholder='Опишите Ваш вопрос или проблему'
            onSubmit={data => console.log(data)}
            name='Григорий Пронин'
          />
        </div>
      </ExampleWrapper>

      <ExampleWrapper title={'Feedback form'}>
        {/* <FeedbackForm socials={footerSocials} /> */}
      </ExampleWrapper>

      <ExampleWrapper title='Tooltip'>
        <Tooltip trigger='hover' title="That's hover trigger">
          <h1>Hover trigger</h1>
        </Tooltip>

        <Tooltip trigger='click' title="That's click trigger">
          <h1>Click trigger</h1>
        </Tooltip>
      </ExampleWrapper>

      <ExampleWrapper title='SectionSoon'>
        <SectionSoon transfer={Transfer.AVIA} />
      </ExampleWrapper>

      <ExampleWrapper title='NoTicketsSection'>
        <NoTicketsSection />
      </ExampleWrapper>

      <ExampleWrapper title='routeItem'>
        <RouteItem
          {...routeItemMock}
          onDelete={routeId => console.log(routeId)}
        />
      </ExampleWrapper>

      <ExampleWrapper title='Redirecting Modal'>
        <button onClick={() => setIsRedirectingModalOpen(true)}>
          open redirecting modal
        </button>
        <RedirectingModal
          onClose={() => setIsRedirectingModalOpen(false)}
          isOpen={isRedirectingModalOpen}
          company={'Mego Travel'}
          id={1}
          name={'mego.travel'}
          logo={welcome.src}
        />
      </ExampleWrapper>

      <ExampleWrapper title='Auth Modal'>
        <Button
          onClick={() => {
            setIsAuthModalOpen(true)
          }}
          title='Open Auth Modal'
        />
      </ExampleWrapper>

      <ExampleWrapper title='Redirecting Modal'>
        <button onClick={() => setIsRedirectingModalOpen(true)}>
          open redirecting modal
        </button>
        <RedirectingModal
          onClose={() => setIsRedirectingModalOpen(false)}
          isOpen={isRedirectingModalOpen}
          company={'Mego Travel'}
          id={1}
          name={'mego.travel'}
          logo={welcome.src}
        />
      </ExampleWrapper>

      <ExampleWrapper title='Auth Modal'>
        <Button
          onClick={() => {
            setIsAuthModalOpen(true)
          }}
          title='Open Auth Modal'
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onFacebookLogin={() => console.log('Login via Facebook')}
          onInstagramLogin={() => console.log('Login via Instagram')}
        />
      </ExampleWrapper>

      <ExampleWrapper title='Subscribe Confirm Modal'>
        <Button
          onClick={() => {
            setIsSubscribeConfirmModalOpen(true)
          }}
          title='Open Subscribe Confirm Modal'
        />
        <SubscribeConfirmModal
          isOpen={isSubscribeConfirmModalOpen}
          onClose={() => setIsSubscribeConfirmModalOpen(false)}
          onConfirm={() => console.log('Подписка подтверждена')}
        />
      </ExampleWrapper>

      <ExampleWrapper title='Price Item'>
        {/*<PriceItem*/}
        {/*  date={new Date()}*/}
        {/*  price_from={80000}*/}
        {/*  isActive={false}*/}
        {/*  bestPrice={true}*/}
        {/*  variant='month'*/}
        {/*  currency={currency}*/}
        {/*  locale={language}*/}
        {/*/>*/}
        {/*<PriceItem*/}
        {/*  date={new Date()}*/}
        {/*  price_from={100000}*/}
        {/*  isActive={false}*/}
        {/*  bestPrice={false}*/}
        {/*  variant='month'*/}
        {/*  currency={currency}*/}
        {/*  locale={language}*/}
        {/*/>*/}
        {/*<PriceItem*/}
        {/*  date={new Date()}*/}
        {/*  price_from={90000}*/}
        {/*  isActive={true}*/}
        {/*  bestPrice={false}*/}
        {/*  variant='month'*/}
        {/*  currency={currency}*/}
        {/*  locale={language}*/}
        {/*/>*/}
        {/*<PriceItem*/}
        {/*  date={new Date()}*/}
        {/*  isActive={false}*/}
        {/*  bestPrice={false}*/}
        {/*  variant='month'*/}
        {/*  currency={currency}*/}
        {/*  locale={language}*/}
        {/*/>*/}

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onFacebookLogin={() => console.log('Login via Facebook')}
          onInstagramLogin={() => console.log('Login via Instagram')}
        />
      </ExampleWrapper>

      <ExampleWrapper title='Subscribe Confirm Modal'>
        <Button
          onClick={() => {
            setIsSubscribeConfirmModalOpen(true)
          }}
          title='Open Subscribe Confirm Modal'
        />
        <SubscribeConfirmModal
          isOpen={isSubscribeConfirmModalOpen}
          onClose={() => setIsSubscribeConfirmModalOpen(false)}
          onConfirm={() => console.log('Подписка подтверждена')}
        />
      </ExampleWrapper>

      <ExampleWrapper title='Flight Info Card'>
        {/*<FlightInfoCard flightInfo={flightMock} />*/}
      </ExampleWrapper>

      <ExampleWrapper title='View Subscribe Modal'>
        <Button
          onClick={() => {
            setIsViewSubscribeModalOpen(true)
          }}
          title='Open View Subscribe Modal'
        />
        <ViewSubscribeModal
          isOpen={isViewSubscribeModalOpen}
          onClose={() => setIsViewSubscribeModalOpen(false)}
        />
      </ExampleWrapper>

      <ExampleWrapper title='Blog Search Modal'>
        <Button
          onClick={() => {
            setIsBlogSearchModalOpen(true)
          }}
          title='Open Blog Search Modal'
        />
        <BlogSearchModal
          isOpen={isBlogSearchModalOpen}
          onClose={() => setIsBlogSearchModalOpen(false)}
          value={searchValue}
          onChange={handleSearchChange}
          onSearch={() => setSearchValue('')}
        />
      </ExampleWrapper>

      <ExampleWrapper title='Blog Search Modal'>
        <Button
          onClick={() => {
            setIsBlogSearchModalOpen(true)
          }}
          title='Open Blog Search Modal'
        />
        <BlogSearchModal
          isOpen={isBlogSearchModalOpen}
          onClose={() => setIsBlogSearchModalOpen(false)}
          value={searchValue}
          onChange={handleSearchChange}
          onSearch={() => setSearchValue('')}
        />
      </ExampleWrapper>

      <ExampleWrapper title='blogSection'>
        {/* <BlogSection
          posts={mock_blogcard}
          title='Популярное'
          hasMore={true}
          loadMore={() => console.log('hello')}
        /> */}
      </ExampleWrapper>

      <ExampleWrapper title='Login Feature'>
        <Login />
      </ExampleWrapper>

      <ExampleWrapper title='SignUp Feature'>
        <SignUp isMenuOpen />
      </ExampleWrapper>

      <ExampleWrapper title='Email Confirm'>
        <EmailConfirm email={''} keepLogged={false} />
      </ExampleWrapper>

      <ExampleWrapper title='blogSelectionSection'>
        {/* <BlogSelectionSection posts={mock_blogcard} /> */}
      </ExampleWrapper>

      <ExampleWrapper title='Edit Profile'>
        <EditProfile name='Евгений' surname='Пороховой' />
      </ExampleWrapper>

      <ExampleWrapper title='Change Password'>
        <ChangePassword />
      </ExampleWrapper>

      <ExampleWrapper title='Subscribe Profile Section'>
        <SubscribeProfileSection />
      </ExampleWrapper>

      <ExampleWrapper title='Auth Action Modal'>
        <Button
          onClick={() => {
            setIsAuthActionModalOpen(true)
          }}
          title='Open Auth Action Modal'
        />

        <AuthActionModal
          isOpen={isAuthActionModalOpen}
          onClose={() => setIsAuthActionModalOpen(false)}
          onLogin={() => console.log('Переход к авторизации')}
          onRegister={() => console.log('Переход к регистрации')}
        />
      </ExampleWrapper>

      <ExampleWrapper title='Ask Question'>
        <AskQuestion />
      </ExampleWrapper>

      <ExampleWrapper title='Profile Sidebar Tabs'>
        <ProfileSidebarTabs />
      </ExampleWrapper>

      <ExampleWrapper title='Comments'>
        {/* <Comments comments={CommentsMock.comments} /> */}
      </ExampleWrapper>

      <ExampleWrapper title={'Ticket'}>
        <Ticket
          id={''}
          routes={[]}
          time_route={0}
          best_seller={null}
          best_seller_baggage={undefined}
          seller_baggage_count={0}
          seller_count={0}
          {...ticket}
        />
      </ExampleWrapper>

      <ExampleWrapper title={'Day Price Calendar'}>
        <DayPriceCalendar
          days={DayPricesMock}
          currentDate={new Date()}
          onDateSelect={data => console.log(data)}
        //   currentTicket={{ ...ticket }}
        />
      </ExampleWrapper>

      {/* <ExampleWrapper title='PassengerNumberPopup'>
        <Button
          onClick={() => {
            setOpenPassengerNumberPopup(true)
          }}
          title='Open PassengerNumberPopup'
        />
        <PassengerNumberPopup
          isOpen={openPassengerNumberPopup}
          onClose={() => setOpenPassengerNumberPopup(false)}
        />
      </ExampleWrapper> */}
      {/* <ExampleWrapper title={'Price Calendar Ticket'}>
        <PriceCalendarTicket {...calendar_price_ticket_mock} />
      </ExampleWrapper> */}

      <ExampleWrapper title='HowToContact'>
        <HowToContact />
      </ExampleWrapper>

      <ExampleWrapper title='Skeleton'>
        <Skeleton width='70%' height='100px' radius='4px' />

        <Skeleton width='100px' height='100px' radius='50%' />

        <Skeleton width='70%' height='100px' radius='4px' />

        <Skeleton width='150px' height='100px' radius='8px' />
      </ExampleWrapper>

      <ExampleWrapper title='IOS Modal'>
        <Button
          onClick={() => setIsIosModalOpen(true)}
          title='Open Modal'
          variant='primary'
          textSize='medium'
        />
        <MobileModal
          isOpen={isIosModalOpen}
          onClose={() => setIsIosModalOpen(false)}
          title='Откуда'
        >
          <Input
            placeholder={'город или страна'}
            className={s.customInput}
            placeholderClassName={s.customPlaceholder}
          />
        </MobileModal>
      </ExampleWrapper>
    </div>
  )
}
