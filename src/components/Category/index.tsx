import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import { SvgProps } from 'react-native-svg'

import { styles } from './styles'
import { theme } from '../../global/styles/theme'

import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { View, Text } from 'react-native'

type Props = RectButtonProps & {
  title: string,
  icon: React.FC<SvgProps>,
  hasCheckBox?: boolean,
  checked?: boolean,
}

export function Category({
  title,
  icon: Icon,
  checked = false,
  hasCheckBox = true,
  ...rest
}: Props) {
  return (
    <RectButton {...rest} >
      <LinearGradient
        style={styles.container}
        colors={[theme.colors.secondary50, theme.colors.secondary70]}
      >
        <LinearGradient style={[styles.content, { opacity: checked ? 1 : 0.5 }]}
          colors={[checked ? theme.colors.secondary85 : theme.colors.secondary50, theme.colors.secondary40]}
        >
          {hasCheckBox && (<View style={checked ? styles.checked : styles.check} />)}

          <Icon width={48} height={48} />
          <Text style={styles.title}>{title}</Text>
        </LinearGradient>
      </LinearGradient>
    </RectButton >
  )
}