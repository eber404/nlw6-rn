import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Share, Platform } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import { Fontisto } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'

import * as Linking from 'expo-linking'

import { ImageBackground, Alert } from 'react-native'

import { theme } from '../../global/styles/theme'
import { styles } from './styles'
import BannerPng from '../../assets/banner.png'

import { Background } from '../../components/Background'
import { ListHeader } from '../../components/ListHeader'
import { Header } from '../../components/Header'
import { Member, MemberProps } from '../../components/Member'
import { ListDivider } from '../../components/ListDivider'
import { ButtonIcon } from '../../components/ButtonIcon'
import { AppointmentProps } from '../../components/Appointment'
import { useRoute } from '@react-navigation/native'
import { api } from '../../services/api'
import { Load } from '../../components/Load'

type Params = {
  guildSelected: AppointmentProps
}

type GuildWidget = {
  id: string
  name: string
  instant_invite: string,
  members: MemberProps[]
}

export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget)
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { guildSelected } = route.params as Params

  async function fetchGuildWidget() {
    try {
      const res = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`)
      setWidget(res.data);

    } catch (error) {
      Alert.alert("Habilite o Widget do servidor");
    } finally {
      setLoading(false)
    }
  }

  function handleShare() {
    const message = Platform.OS === 'ios' ? `Junte-se à ${guildSelected.guild.name}` : widget.instant_invite

    Share.share({
      message,
      url: widget.instant_invite,
    })
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite)
  }

  useEffect(() => {
    fetchGuildWidget()
  }, [])

  return (
    <Background>
      <Header title="Detalhes" action={
        guildSelected.guild.owner && (<BorderlessButton onPress={handleShare}>
          <Fontisto name="share" size={24} color={theme.colors.primary} />
        </BorderlessButton>)
      } />

      <ImageBackground
        style={styles.banner}
        source={BannerPng}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>

      {
        loading
          ? <Load />
          : <>
            <ListHeader
              title="Jogadores"
              subtitle={`Total ${widget?.members?.length ?? 0}`}
            />

            <FlatList
              style={styles.members}
              data={widget.members}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Member data={item} />
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: getBottomSpace() + 48,
              }}
            />
          </>
      }

      {guildSelected.guild.owner ??
        <View style={styles.footer}>
          <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild} />
        </View>
      }
    </Background>
  )
}