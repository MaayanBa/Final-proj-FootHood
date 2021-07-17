import CreateDataContext from './createDataContext';
import JarvisApi from '../api/Jarvis';

const jarvisReducer = (state, action) => {
    //console.log(action.payload)
    switch (action.type) {
        case 'Jarvis_GetHotGames':
            return { ...state, hotGames: action.payload }
        case 'Jarvis_FindPlayers4Game':
            return { ...state, searchRes: action.payload }
        case 'CleanSearchRes':
            return { ...state, searchRes: action.payload }
        default:
            return state
    }
};

const Jarvis_FindPlayers4Game = dispatch => async (TeamSerialNum, GameSerialNum, AvgPlayerAge, AvgPlayerRating, Region) => {
    try {
        let gameDetailes = {
            TeamSerialNum,
            GameSerialNum,
            AvgPlayerAge,
            AvgPlayerRating,
            LatitudeGameLoc: Region.latitude,
            LongitudeGameLoc: Region.longitude,
        }
        console.log(gameDetailes)
        const res = await JarvisApi.post('/Jarvis_FindPlayers4Game', gameDetailes);
        dispatch({ type: 'Jarvis_FindPlayers4Game', payload: res.data })

    } catch (error) {
        console.log("err Jarvis_FindPlayers4Game",error)
    }
}

const Jarvis_GetHotGames = dispatch => async (EmailPlayer) => {
    try {
        const res = await JarvisApi.post('/Jarvis_GetHotGames', { EmailPlayer });
        if (res.data.length > 0)
            dispatch({ type: 'Jarvis_GetHotGames', payload: res.data })
    } catch (error) {
        console.log("err Jarvis_GetHotGames",error)
    }
}

const CleanSearchRes = dispatch => async () => {
    dispatch({ type: 'CleanSearchRes', payload: '' })
}

export const { Context, Provider } = CreateDataContext(
    //Reducer
    jarvisReducer,
    {
        Jarvis_FindPlayers4Game,
        Jarvis_GetHotGames,
        CleanSearchRes,
    },
    {
        hotGames: [],
        searchRes: '',
    }
);