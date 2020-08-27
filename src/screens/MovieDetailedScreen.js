import React from 'react'
import { Text, View, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import {
  convert_width as cw,
  convert_height as ch,
  cf,
} from '../commonUtils/utils'
import colors from '../commonUtils/color'

const MovieDetailedScreen = ({ route }) => {
  const { item } = route.params;
  const {
    title,
    poster_path,
    overview,
    vote_average,
    genreArr,
    castsArr,
    formattedRuntime,
    release_date,
  } = item
  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
      </View>
      <View style={styles.itemContainer}>
        <Image style={styles.movieImage} source={{ uri: poster_path }} />
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.movieTitle}>{title}</Text>
            <Text style={styles.ratingText}>({vote_average})</Text>
          </View>

          <View style={styles.lengthContainer}>
            <Text style={styles.lengthText}>{release_date} | </Text>
           <Text style={styles.lengthText}>{formattedRuntime} |</Text> 
            <Text style={styles.lengthText}>{genreArr[0]} </Text>
          </View>

          <View style={styles.castContainer}>
            <Text style={styles.caststext}>Casts:</Text>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.casts}>
              {castsArr.toString()}
            </Text>
          </View>
          <View style={styles.overViewText}>
            <Text>{overview}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default MovieDetailedScreen

const styles = StyleSheet.create({
  parentContainer: {
    height: '100%',
    width: '100%',
    
  },
  container: {
    marginTop: ch(20),
    marginLeft: cw(35),
    height: ch(45),
  },
  detailsContainer: {
    marginTop: ch(20),
    width: '80%',
  },
  overViewText: {
    marginTop: ch(20),
    width: '100%',
    height: ch(45),
  },
  itemContainer: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
  },

  movieImage: {
    width: '80%',
    height: '60%',
    top: 0,
    marginTop: 0,
    paddingTop: 0,
    resizeMode: 'stretch',
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: ch(5),
  },
  lengthContainer: {
    marginTop: ch(10),
    marginBottom: ch(5),
    flexDirection: 'row',
  },

  castContainer: {
    flexDirection: 'row',
  },

  movieTitle: {
    fontSize: cf(20),
    fontWeight: '800',
    lineHeight: ch(18),
    marginTop: ch(5),
    paddingLeft: cw(2),
    justifyContent: 'flex-start',
    color: colors().BLACK,
  },
  lengthText: {
    fontSize: cf(16),
    fontWeight: '800',
    lineHeight: ch(18),
    marginTop: ch(5),
    paddingLeft: cw(2),
    justifyContent: 'flex-start',
    color: colors().BLACK,
  },
  formattedRuntime: {
    fontSize: cf(14),
    fontWeight: '800',
    marginTop: ch(5),
    justifyContent: 'flex-end',
    color: colors().BLACK,
  },
  ratingText: {
    fontSize: cf(14),
    fontWeight: '800',
    marginLeft: cw(10),
    marginTop: ch(5),
    justifyContent: 'flex-end',
    color: colors().BLACK,
  },
  caststext: {
    width: cw(50),
    fontSize: cf(16),
    maxWidth: cw(80),
    maxHeight: ch(18),
    fontWeight: '800',
    marginTop: ch(5),
    paddingLeft: cw(2),
    justifyContent: 'flex-start',
    color: colors().BLACK,
  },
  casts: {
    minWidth: cw(150),
    fontSize: cf(16),
    maxWidth: cw(80),
    maxHeight: ch(18),
    fontWeight: '800',
    marginTop: ch(5),
    paddingLeft: cw(2),
    justifyContent: 'flex-start',
    color: colors().BLACK,
  },
  runtime: {
    width: cw(100),
    fontSize: cf(15),
    fontWeight: '800',
    lineHeight: ch(18),
    marginTop: ch(5),
    paddingLeft: cw(2),
    justifyContent: 'flex-start',
    color: colors().BLACK,
  },
  genre: {
    width: cw(130),
    fontSize: cf(14),
    fontWeight: '800',
    lineHeight: ch(18),
    marginTop: ch(5),
    paddingLeft: cw(2),
    justifyContent: 'flex-start',
    color: colors().BLACK,
  },
  vote_average: {
    width: cw(100),
    fontSize: cf(15),
    fontWeight: '800',
    lineHeight: ch(18),
    marginTop: ch(5),
    paddingLeft: cw(2),
    justifyContent: 'flex-start',
    color: colors().BLACK,
  },
})
