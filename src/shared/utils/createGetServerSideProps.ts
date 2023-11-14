import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'

export default function (fn: GetServerSideProps) {
  return async function (ctx: GetServerSidePropsContext) {
    try {
      const res = await fn(ctx)
      return res
    } catch (e) {
      return {
        redirect: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          permanent: false,
          destination: '/500',
        },
      }
    }
  }
}
