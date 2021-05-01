import CreateDataContext from './createDataContext';
import GameApi from '../api/Game';



const gameReducer = (state, action) => {
    switch (action.type) {
        case 'CreateNewGame': {
            return { ...state, gamesList: [...state.gamesList, action.payload]  }
        }
        case 'GetGamesList': {
            return { ...state, gamesList: action.payload }
        }
        default:
            return state
    }
};

const GetGamesList = dispatch => async (teamSerialNum) => {
    try {
        const response = await GameApi.post('/GamesList', { TeamSerialNum: teamSerialNum });
        console.log("response . data === " + response.data);
        console.log( response.data);
        let tempData = response.data;
        dispatch({ type: 'GetGamesList', payload: response.data })
        const res = await GameApi.post('/PlayersPer')
        
    } catch (err) {
        console.log("in error" + err.data)
        console.log(err.message)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when getting games list' })
    }
}
const CreatNewGame = dispatch => async (newGame)=>{
    try {
        const response = await GameApi.post('/CreateNewGame', { CNG: newGame });
        console.log("response . data === " + response.data);
        console.log( response.data);
        dispatch({ type: 'GetGamesList', payload: response.data })

        
    } catch (err) {
        console.log("in error" + err.data)
        console.log(err.message)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when post new games ' })
    }
}




export const { Context, Provider } = CreateDataContext(
    //Reducer
    gameReducer,
    {
        GetGamesList,
        CreatNewGame,
    },
    {
        gamesList: [],
        playersPerGame:[],
    }
);
