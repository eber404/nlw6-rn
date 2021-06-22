import React from 'react'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { View, Text, Image } from 'react-native'

import { styles } from './styles'

export function GuildIcon() {
  const uri = "https://logodownload.org/wp-content/uploads/2017/11/discord-logo-1-1-2048x2048.png"
  return (
    <Image
      style={styles.image}
      source={{ uri }}
      resizeMode="cover"
    />
  )
}