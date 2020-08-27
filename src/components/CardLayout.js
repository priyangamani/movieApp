import React from 'react'
import CardContent from './CardContent'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import {
  convert_width as cw,
  convert_height as ch,
} from '../commonUtils/utils'


const CardLayout = ({
  name,
  imageUrl,
  casts,
  genre,
  formattedRuntime,
  vote_average,
  onItemPress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <CardContent
        name={name}
        imageUrl={imageUrl}
        casts={casts}
        genre={genre}
        formattedRuntime={formattedRuntime}
        vote_average={vote_average}
        onItemPress={onItemPress}
      />
    </View>
  )
}

export default CardLayout

const styles = StyleSheet.create({
  cardContainer: {
    height: ch(260),
    width: cw(170),
    left: '7.5%',
    justifyContent: 'space-around',
  },
})
