import { LogoDark } from 'components/Icons'

const LoadingPage = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex animate-pulse items-center">
      <LogoDark />
    </div>
  </div>
)

export default LoadingPage
