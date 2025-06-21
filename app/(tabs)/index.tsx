import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovie } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import "../globals.css";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovie,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies)

  const {
    data: movies,
    loading: moviesLoaidng,
    error: movieError,
  } = useFetch(() => fetchMovie({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0"></Image>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image
          source={icons.logo}
          className="w-12 h-10 mt-20 mb-5 mx-auto"
        ></Image>

        {moviesLoaidng || trendingLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center"></ActivityIndicator>
        ): movieError || trendingError ? (
          <Text>Error : {movieError?.message || trendingError?.message}</Text>
        ): (
          <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => router.push("/(tabs)/search")}
            placeholder="Search for a movie"
          ></SearchBar>

          {trendingMovie && (
            <View className="mt-10">
              <Text className="text-lg text-white font-bold">Trending Movies</Text>
            </View>
          )}

          <>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="w-4" />}
              data={trendingMovie}
              renderItem={({item, index}) => (
                <TrendingCard movie={item} index={index}></TrendingCard>
              )}
              keyExtractor={(item) => item.movie_id.toString()}
            >
            </FlatList>

            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>

            <FlatList
              data={movies}
              renderItem={({item}) => (
                // <Text className="text-white text-sm">{item.title}</Text>
                <MovieCard
                  {...item}
                ></MovieCard>
              )}

              keyExtractor={(item) => item.id.toString() }
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled= {false}
            >

            </FlatList>
          </>
        </View>
        )}
      </ScrollView>
    </View>
  );
}
