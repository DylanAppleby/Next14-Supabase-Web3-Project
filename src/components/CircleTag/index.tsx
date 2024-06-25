import Image from 'next/image'

import classNames from 'classnames'
import { Cross } from 'components/Icons'
import { Database } from 'types/supabase'

const CircleTag = ({
  circleData,
  varient = 'primary',
  isSelected,
  onUnSelect,
  onSelect,
}: {
  circleData: Database['public']['CompositeTypes']['common_circle']
  varient?: 'primary' | 'secondary'
  isSelected?: boolean
  onUnSelect?: (id: string) => void
  onSelect: (id: string) => void
}) => (
  <div
    className={classNames(
      'flex w-max items-center justify-center gap-2 rounded-full',
      {
        'bg-white p-2 pr-4': varient === 'primary' && !isSelected,
        'bg-secondary p-1 pr-4': varient === 'secondary' && !isSelected,
        'bg-black p-2': isSelected,
      }
    )}
  >
    <Image
      src={circleData.circle_logo_image || ''}
      alt="circle"
      width={24}
      height={24}
      className="aspect-square h-6 w-6 rounded-full"
    />
    <button
      type="button"
      onClick={() => onSelect(circleData.circle_id || '')}
      className={classNames(
        'overflow-hidden whitespace-nowrap text-sm font-bold capitalize',
        { 'flex items-center gap-2 text-white': isSelected }
      )}
    >
      {circleData.circle_name}
    </button>
    {onUnSelect && isSelected && (
      <button
        onClick={() => onUnSelect(circleData.circle_id || '')}
        type="button"
      >
        <Cross color="white" />
      </button>
    )}
  </div>
)

export default CircleTag
