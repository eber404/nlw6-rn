import React from 'react'
import { View, Text, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { styles } from './styles'
import { theme } from '../../global/styles/theme'

type Props = {
  urlImage: string,
}

export function Avatar(props: Props) {
  return (
    <LinearGradient
      style={styles.container}
      colors={[theme.colors.secondary50, theme.colors.secondary70]}
    >
      <Image source={{ uri: props.urlImage }} style={styles.avatar} />
    </LinearGradient>
  )
}