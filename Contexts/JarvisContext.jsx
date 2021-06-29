import CreateDataContext from './createDataContext';
import JarvisApi from '../api/Jarvis';

const jarvisReducer = (state, action) => {
    //console.log(action.payload)
    switch (action.type) {
        case 'Jarvis_GetHotGames':
            return { ...state, hotGames: action.payload }
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
        if (res.data.AmountOfResults.length > 0)
            alert(`Jarvis has found  ${res.data.AmountOfResults} matching players for this game with ${res.data.MatchPrecent}% - 100% match rate ! \n\nPlease keep up on your join requests ! `)
        else
            alert(`Jarvis hasn't found any matching players for this game ! \n\nWe welcome you to invite new friends ! `)


    } catch (error) {
        console.log("err Jarvis_FindPlayers4Game")
        console.log(error)
    }
}

const Jarvis_GetHotGames = dispatch => async (EmailPlayer) => {
    try {
        console.log(EmailPlayer)
        const res = await JarvisApi.post('/Jarvis_GetHotGames', { EmailPlayer });
        if (res.data.length > 0)
            dispatch({ type: 'Jarvis_GetHotGames', payload: res.data })
    } catch (error) {
        console.log("err Jarvis_GetHotGames")
        console.log(error)
    }
}

export const { Context, Provider } = CreateDataContext(
    //Reducer
    jarvisReducer,
    {
        Jarvis_FindPlayers4Game,
        Jarvis_GetHotGames,
    },
    {
        hotGames: [],
    }
);