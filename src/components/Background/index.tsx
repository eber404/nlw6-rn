import React, { ReactNode } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import { theme } from './../../global/styles/theme'
import { styles } from './styles'

type Props = {
  children: ReactNode,
}

export function Background(props: Props) {
  return (
    <LinearGradient style={styles.container}
      colors={[theme.colors.secondary80, theme.colors.secondary100]}>
      {props.children}
    </LinearGradient>
  )
}