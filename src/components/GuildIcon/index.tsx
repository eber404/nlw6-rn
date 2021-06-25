import React from 'react'
import { View, Image } from 'react-native'

const { CDN_IMAGE } = process.env

import { styles } from './styles'
import DiscordSvg from '../../assets/discord.svg'

type Props = {
  guildId: string,
  iconId: string | null
}

export function GuildIcon(props: Props) {
  const uri = `${CDN_IMAGE}/icons/${props.guildId}/${props.iconId}.png`

  return (
    <View style={styles.container}>
      {
        props.iconId
          ? (<Image style={styles.image} source={{ uri }} resizeMode="cover" />)
          : (<DiscordSvg width={40} height={40} />)
      }

    </View>
  )
}