import {configureStore, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { MY_API_KEY, TMDB_BASE_URL } from '../utils/constant'
import axios from 'axios'

const initialState = {
    movies: [],
    generesLoaded: false,
    genres: []
}

export const getGenres = createAsyncThunk("netflix/genres", async()=>{
    const {data: {genres}} = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${MY_API_KEY}`)
    // console.log(genres)
    return genres
})

const arrayOfMovieData = (array, moviesArray, generes)=>{
    array.forEach((movie)=>{
        const moviesGenres=[]
        movie.genre_ids.forEach((genre)=>{
            const name = generes.find(({id})=> id === genre)
            // fetching generes with id
            if(name) moviesGenres.push(name.name)
        })
    if(movie.backdrop_path)
    // check if the movie has a backdrop path, that means, a poster
    moviesArray.push({
        id: movie.id,
        name: movie.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: moviesGenres.slice(0,3)
        // there are more than one genre of the movie so we are taking only 3 genres of it
    })
    })
}

const getMovieData = async(api, genres, paging = false)=>{
    const moviesArray = []
    for(let i =1; moviesArray.length<80 && i <10; i++){
        const {data: {results},} = await axios.get(`${api}${paging ? `&page=${i}` :  ""}`)
        arrayOfMovieData (results, moviesArray, genres)
    }
    return moviesArray
}

export const fetchMovies = createAsyncThunk("netflix/Trending", async({type}, myThunk)=>{
    const {netflix: {genres},} = myThunk.getState()
    return getMovieData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${MY_API_KEY}`, genres, true);
    // console.log(data)
})

const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    
    extraReducers: (builder)=>{
        builder.addCase(getGenres.fulfilled, (state, action)=>{
            state.genres = action.payload;
            state.generesLoaded = true
        })
        builder.addCase(fetchMovies.fulfilled, (state, action)=>{
            state.movies = action.payload;            
        })
    }
})
// The builder is used in extraReducers to allow reducers to respond to actions that are dispatched from other slices or from outside of the Redux store. This is useful for handling asynchronous actions, such as fetching data from an API, or for handling actions that are dispatched from external libraries.
// The builder in Redux is a helper object that is used to create reducers. It provides a number of methods for adding cases to the reducer, as well as a default case.
// The builder is typically used in conjunction with the createReducer function. The createReducer function takes an initialState object and a builder callback as arguments. The builder callback is used to define the reducer's cases.
// in above code, genres and movies are two state variables, getGenres.fulfilled and fetchMovies.fulfilled are two reducers.
// The payload in Redux is the data that is associated with an action. It is used to describe what happened when the action was dispatched.The payload is not required, but it is often used to pass data to the reducers.

// in the above code, the state is changed or you can say that the state is used as a class

export const store = configureStore({
    reducer:{
        netflix: NetflixSlice.reducer
    }
})
// the code creates a Redux store using the configureStore function. The store is configured with the NetflixSlice reducer. This means that the store will manage the state of the NetflixSlice slice.