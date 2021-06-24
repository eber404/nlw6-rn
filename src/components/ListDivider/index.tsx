import React from 'react'
import { View } from 'react-native'
import { styles } from './styles'

type Props = {
  isCentered?: boolean
}

export function ListDivider(props: Props) {
  return (
    <View style={[
      styles.container,
      props.isCentered ? {
        marginVertical: 12,
      } : {
        marginTop: 2,
        marginBottom: 31,
      }
    ]} />
  )
}