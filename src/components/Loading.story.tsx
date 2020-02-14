import React from 'react'
import { storiesOf } from '@storybook/react'
import { Loading } from './Loading'
import { Box } from './Box'
import { useState, useEffect } from '@storybook/addons'

storiesOf('Components|Loading', module).add('default', () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const randomNumber = (): number => Math.round(Math.random() * 100)
    const id = setTimeout(() => setProgress(randomNumber()), 1000)
    return (): void => clearTimeout(id)
  }, [progress, setProgress])

  return (
    <>
      <Box mb={1}>
        Continuous:
        <Loading />
      </Box>
      <Box>
        Percentage ({progress}%):
        <Loading progress={progress} />
      </Box>
    </>
  )
})
