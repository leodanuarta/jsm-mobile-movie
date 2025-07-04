// track the searches made by a user
import { Client, Databases, ID, Query } from "react-native-appwrite";


const  DATABSE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_COLLECTION_ID!;


const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_ID!)

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {

  try {
    const result = await database.listDocuments(DATABSE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', query)
    ])

    console.log(result)

    // check if a record of that search has already been stored
    if (result.documents.length > 0){
      const existingMovie = result.documents[0]

      await database.updateDocument(
        DATABSE_ID, 
        COLLECTION_ID,
        existingMovie.$id,
        {
          count : existingMovie.count + 1
        }
      )
    }else {
      await database.createDocument(DATABSE_ID, COLLECTION_ID, ID.unique(), {
      searchTerm : query,
      movie_id: movie.id,
      count: 1,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      title: movie.title,
      }
    )}
  }catch(error){
    console.log(error);
    throw error;
  }
  // if a document is found increment the searchCount field
  // if no document is found 
    // create a new document in appwrite database -> 1
}

export const getTrendingMovies = async () : Promise<TrendingMovie[] | undefined> => {
  try{
    const result = await database.listDocuments(DATABSE_ID, COLLECTION_ID, [
      Query.limit(5), Query.orderDesc('count'),
    ])

    return result.documents as unknown as TrendingMovie[]
    
  }catch (error){
    console.log(error);
    return undefined
  }
}