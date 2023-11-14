import { FC } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import datalabelsPlugin from 'chartjs-plugin-datalabels'

import s from './graphicBar.module.scss'
import { Currency } from 'shared/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
)

ChartJS.register(datalabelsPlugin)

export type GraphicItem = {
  month: string
  price: number
  currency: Currency
  isCheap: boolean
}

export type GraphicDataList = {
  graphicData: GraphicItem[]
  options: ChartOptions<'bar'>
  colors: string[]
}

const GraphicBar: FC<GraphicDataList> = ({
  graphicData,
  options,
  colors,
}) => {
  const prices: number[] = graphicData.map(
    (item: GraphicItem) => item.price
  )
  const months: string[] = graphicData.map(
    (item: GraphicItem) => item.month
  )

  const data = {
    labels: months,
    datasets: [
      {
        data: prices,
        backgroundColor: colors,
        barThickness: 85,
        barPercentage: 0.8,
      },
    ],
  }

  return (
    <div className={s.graphicBar}>
      <div className={s.graphicBarContainer}>
        <div className={s.content}>
          <div className={s.graphicLinear}>
            <span className={s.graphicDate}>2021</span>
          </div>
          <Bar data={data} options={options} />
        </div>
      </div>
      <div className={s.graphicScroll}></div>
    </div>
  )
}

export default GraphicBar
