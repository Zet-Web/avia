import { FC, ReactNode } from "react"

import s from './exampleWrapper.module.scss'

interface ExampleWrapperProps {
    title: string
    children: ReactNode
}

const ExampleWrapper: FC<ExampleWrapperProps> = ({ title, children }) => {
    return (
        <section className={s.wrapper}>
            <div className={s.title}>
                <p>{title}</p>
            </div>
            {children}
        </section>
    )
}
export default ExampleWrapper;