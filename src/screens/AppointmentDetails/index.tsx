import React from 'react'
import { View, Text, FlatList } from 'react-native'

import { Fontisto } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'

import { ImageBackground } from 'react-native'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'
import BannerPng from '../../assets/banner.png'

import { Background } from '../../components/Background'
import { ListHeader } from '../../components/ListHeader'
import { Header } from '../../components/Header'
import { Member } from '../../components/Member'
import { ListDivider } from '../../components/ListDivider'
import { ButtonIcon } from '../../components/ButtonIcon'

export function AppointmentDetails() {
  const members = [
    { id: "1", username: "Eber", avatar_url: "https://github.com/eber404.png", status: 'online' },
    { id: "2", username: "Clone do Eber", avatar_url: "https://github.com/eber404.png", status: 'offline' }
  ]

  return (
    <Background>
      <Header title="Detalhes" action={
        <BorderlessButton>
          <Fontisto name="share" size={24} color={theme.colors.primary} />
        </BorderlessButton>
      } />

      <ImageBackground
        style={styles.banner}
        source={BannerPng}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>
          <Text style={styles.subtitle}>maaaaaaaaaaaaaaassa</Text>
        </View>
      </ImageBackground>

      <ListHeader
        title="Jogadores"
        subtitle="Total 3"
      />

      <FlatList
        style={styles.members}
        data={members}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Member data={item} />
        )}
        ItemSeparatorComponent={() => <ListDivider />}
      />

      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" />
      </View>
    </Background>
  )
}