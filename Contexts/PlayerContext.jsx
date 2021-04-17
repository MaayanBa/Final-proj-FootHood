import CreateDataContext from './createDataContext';
import PlayerApi from '../api/Player';



const playerReducer = (state, action) => {
    switch (action.type) {
        case 'GetPlayers':
            return { ...state, players: action.payload }
        default:
            return state
    }
};

const GetPlayers = dispatch => async () => {
    try {
        const response = await PlayerApi.get('/GetPlayers')
        dispatch({type: 'GetPlayers', payload: response.data})
    } catch (err) {
        console.log(err.data)
    }

}
export const { Context, Provider } = CreateDataContext(
    //Reducer
    playerReducer,
    {
        GetPlayers,
    },
    {
        players: []
    }
);
