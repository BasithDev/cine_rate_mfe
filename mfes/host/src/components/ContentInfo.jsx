import React from 'react'
import { useSearchParams } from 'react-router-dom'
import {SafeImport} from './SafeImport'

const InfoPage = SafeImport(() => import('info_page/InfoPage'), 'InfoPage', 'info_page')
const ReviewPage = SafeImport(() => import('review_page/ReviewPage'), 'ReviewPage', 'review_page')
const ContentInfo = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const mediaType = searchParams.get('media_type')
  return (
    <div className='bg-black text-white '>
      <InfoPage id={id} mediaType={mediaType} />
      <ReviewPage />
    </div>
  )
}

export default ContentInfo