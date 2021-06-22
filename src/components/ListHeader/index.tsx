import React from 'react'
import { View, Text } from 'react-native'

import { styles } from './styles'
import { theme } from '../../global/styles/theme'

type Props = {
  title: string,
  subtitle: string,
}

export function ListHeader(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
    </View>
  )
}