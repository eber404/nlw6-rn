import React, { ReactNode } from 'react'
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../../global/styles/theme'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'

type Props = {
  title: string
  action?: ReactNode
}

export function Header(props: Props) {
  const navigate = useNavigation();

  function handleGoBack() {
    navigate.goBack()
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[theme.colors.secondary100, theme.colors.secondary40]}
    >
      <BorderlessButton onPress={handleGoBack}>
        <Feather name="arrow-left" size={24} color={theme.colors.heading} />
      </BorderlessButton>

      <Text style={styles.title}>{props.title}</Text>

      {props.action ? <View>{props.action}</View> : <View style={{ width: 24 }} />}
    </LinearGradient>
  )
}