import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovie } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import "../globals.css";

export default function Index() {
  const router = useRouter();

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

        {moviesLoaidng ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center"></ActivityIndicator>
        ): movieError ? (
          <Text>Error : {movieError?.message}</Text>
        ): (
          <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          ></SearchBar>

          <>
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

        {/* <View className="flex-1 mt-5">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          ></SearchBar>
        </View> */}
      </ScrollView>
    </View>
  );
}
