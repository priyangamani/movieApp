import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet
} from "react-native"
import { useSelector, useDispatch } from 'react-redux'
import SearchBarField from "../components/SearchBar";
import CardLayout from "../components/CardLayout";
import {
  loadAllUpcomingMovies,
  clearUserSearchText,
  loadMoreMoviesFromUserSameSearchText,
} from "../actions/index"
import SnackBar from "react-native-snackbar-component"
const { width, height } = Dimensions.get("window");


const App = ({ navigation }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    if (user.userSearchedMovieText.length === 0) {
      dispatch(loadAllUpcomingMovies(page))
    } else {
      let searchTerm = user.userSearchedMovieText;
      dispatch(loadMoreMoviesFromUserSameSearchText(searchTerm, page))
    }
  }, [page]);


  const renderItem = ({ item }) => (
    <View style={styles.itemLayout}>
      <CardLayout
        item={item}
        name={item.title}
        imageUrl={item.poster_path}
        casts={item.castsArr}
        genre={item.genreArr}
        formattedRuntime={item.formattedRuntime}
        vote_average={item.vote_average}
        onItemPress={() =>
          navigation.navigate("MovieDetailedScreen", { item })
        }
      />
    </View>
  )


  const renderFooter = () => {
    if (!user.loadingMore) return null
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  const handleLoadMore = () => {
    setPage(page + 1);
    setRefresh(false);
  }

  const handleRefresh = () => {
    setRefresh(true);
  }

  const clearInput = () => {
    dispatch(clearUserSearchText());
    setRefresh(true);
    setPage(1);
  }

  return !user.loading ? (
    <>
      <SearchBarField clearInput={clearInput}></SearchBarField>
      <FlatList
        contentContainerStyle={{}}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        removeClippedSubviews={true}
        numColumns={2}
        data={user.allUpcomingMovies}
        renderItem={renderItem}
        keyExtractor={item => item.imdb_id}
        ListFooterComponent={renderFooter}
        onRefresh={handleRefresh}
        refreshing={refresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </>

  ) : (
      user.error_while_fetching_movie_data ? (
        <SnackBar
          visible={user.error_while_fetching_movie_data}
          textMessage="Error! No Response"
          actionHandler={() => clearError()}
          actionText="Close"
          autoHidingTime={1000}
          backgroundColor='red'
        />
      ) : null
    );
};


const styles = StyleSheet.create({
  activityIndicator: {
    position: "relative",
    width: width,
    height: height,
    paddingVertical: 20,
    borderTopWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'red',
  },
  itemLayout:{
    marginTop: 25,
    width: "50%",
  }
})

export default App;
