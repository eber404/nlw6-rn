import React, { useCallback, useState } from 'react'
import { View, FlatList, Text } from 'react-native'

import { ButtonAdd } from '../../components/ButtonAdd/'
import { CategorySelect } from '../../components/CategorySelect'
import { Profile } from '../../components/Profile'
import { Load } from '../../components/Load'

import { Appointment, AppointmentProps } from '../../components/Appointment'

import { ListHeader } from '../../components/ListHeader'
import { ListDivider } from '../../components/ListDivider'

import { styles } from './styles'
import { Background } from '../../components/Background'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { APPOINTMENTS_COLLECTION } from '../../configs/localStorage'

export function Home() {
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<AppointmentProps[]>([])

  const navigation = useNavigation()

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId)
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate("AppointmentDetails", { guildSelected })
  }

  function handleAppointmentCreate() {
    navigation.navigate("AppointmentCreate")
  }

  async function loadAppointments() {
    const localAppointments = await AsyncStorage.getItem(APPOINTMENTS_COLLECTION)
    const parsedAppointments: AppointmentProps[] = localAppointments ? JSON.parse(localAppointments) : []

    if (category) {
      setAppointments(parsedAppointments.filter(item => item.category === category))
    } else {
      setAppointments(parsedAppointments)
    }

    setLoading(false)
  }

  useFocusEffect(useCallback(() => {
    loadAppointments()
  }, [category]))

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />
      {
        loading
          ? <Load />
          : <>
            <ListHeader
              title="Partidas agendadas"
              subtitle={`Total ${appointments.length}`}
            />
            <FlatList
              style={styles.matches}
              contentContainerStyle={{ paddingBottom: 69, }}
              data={appointments}
              keyExtractor={item => item.id}
              renderItem={(({ item }) => <Appointment data={item} onPress={() => handleAppointmentDetails(item)} />)}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <ListDivider />}
            />
          </>
      }

    </Background>
  )
}