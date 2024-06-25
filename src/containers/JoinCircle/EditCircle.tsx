import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { ArrowBack, Button, FormLine, TextArea } from 'components'
import { supabase } from 'services/supabase'
import { ICircle } from 'types/supabaseTables'
import { Tables } from 'utils/constants'
import { UpdateEditCircleSchema } from 'utils/yupConfig'

import { yupResolver } from '@hookform/resolvers/yup'

type IEditData = {
  name: string
  description: string
}

const EditCircle = ({
  circleData,
  setShowEditCircle,
  setCircleData,
  circleId,
}: {
  circleData: ICircle
  setShowEditCircle: Dispatch<SetStateAction<boolean>>
  setCircleData: Dispatch<SetStateAction<ICircle>>
  circleId: string
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UpdateEditCircleSchema),
    defaultValues: {
      name: circleData.name || '',
      description: circleData.description || '',
    },
    mode: 'onBlur',
  })

  const handleUpdateCircle = useCallback(
    async ({ name, description }: IEditData) => {
      if (name === circleData.name && description === circleData.description)
        return

      setIsLoading(true)
      const { error } = await supabase
        .from(Tables.CIRCLES)
        .update({
          name,
          description,
        })
        .eq('id', circleId)
      setIsLoading(false)

      if (error) toast.error(error.message)
      else {
        setShowEditCircle(false)
        setCircleData((data) => ({
          ...data,
          name,
          description,
        }))
      }
    },
    [
      circleData.description,
      circleData.name,
      circleId,
      setCircleData,
      setShowEditCircle,
    ]
  )

  return (
    <form
      onSubmit={handleSubmit(handleUpdateCircle)}
      className="w-full space-y-3"
    >
      <button
        type="button"
        className="absolute left-4 top-6 rounded-full bg-black/5 p-1 transition-colors duration-300 hover:bg-black/20"
        onClick={() => setShowEditCircle(false)}
      >
        <ArrowBack className="" />
      </button>
      <FormLine
        {...register('name')}
        title="Title"
        id="circle-name"
        error={errors.name?.message}
        className="w-full"
      />
      <TextArea
        {...register('description')}
        title="Description"
        id="circle-description"
        error={errors.description?.message}
        className="w-full"
        rows={4}
      />
      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full bg-red px-5 text-white"
      >
        Save
      </Button>
    </form>
  )
}

export default EditCircle
