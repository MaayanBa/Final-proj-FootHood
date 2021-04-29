import CreateDataContext from './createDataContext';
import GameApi from '../api/Game';



const gameReducer = (state, action) => {
    switch (action.type) {
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




export const { Context, Provider } = CreateDataContext(
    //Reducer
    gameReducer,
    {
        GetGamesList,
    },
    {
        gamesList: [],
        playersPerGame:[],
    }
);
