import CreateDataContext from './createDataContext';
import GameApi from '../api/Game';

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'CreateNewGame': {
            return { ...state, gamesList: action.payload  }
        }
        case 'GetGamesList': {
            return { ...state, gamesList: action.payload }
        }
        case 'RegisterGame': {
            return { ...state, playersPerGame: action.payload }
        }
        default:
            return state
    }
};

const GetGamesList = dispatch => async (teamSerialNum) => {
    try {
        //console.log(teamSerialNum);
        const response = await GameApi.post('/GamesList', { TeamSerialNum: teamSerialNum });
        dispatch({ type: 'GetGamesList', payload: response.data })
        //console.log(response.data)
        // let tempData = response.data; //להביא שחקנים עבור כל משחק
        // const res = await GameApi.post('/PlayersPerGame')
    } catch (err) {
        console.log("in error GetGameList " + err.data)
        console.log(err)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when getting games list' })
    }
}
const CreatNewGame = dispatch => async (game,equipments)=>{
    try {

         console.log("CNG GameDate=========> "+game)
         console.log(game)
        // console.log("CNG lastRegistrationDate=====> " +game.LastRegistrationDate)
        // console.log(game)
        const response = await GameApi.post('/CreateNewGame', {game,equipments} );
        console.log("CreateGame======>")
        console.log(response.data);
        //dispatch({ type: 'CreatNewGame', payload: response.data }) 
    } catch (err) {
        console.log("in error Create New Game" )
        console.log(err)
        //dispatch({ type: 'add_error', payload: 'Somthing went wrong when post new games ' })
    }
}


const RegisterGame = dispatch => async (addPlayer2Game)=>{
    try {
        console.log(addPlayer2Game)
        const response = await GameApi.post('/RegisterGame', addPlayer2Game );
        dispatch({ type: 'RegisterGame', payload: response.data }) 
        console.log("GOOD~!")
    } catch (err) {
        console.log(err)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when joining a game' })
    }
}

export const { Context, Provider } = CreateDataContext(
    //Reducer
    gameReducer,
    {
        GetGamesList,
        CreatNewGame,
        RegisterGame,
    },
    {
        gamesList: [],
        playersPerGame:[],
    }
);
