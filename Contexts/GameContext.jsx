import CreateDataContext from './createDataContext';
import GameApi from '../api/Game';

const gameReducer = (state, action) => {
    switch (action.type) {
        case 'CreateNewGame': {
            return { ...state, gamesList: action.payload }
        }
        case 'GetGamesList': {
            return { ...state, gamesList: action.payload }
        }
        case 'RegisterGame': {
            return { ...state, playersPerGame: action.payload }
        }
        case 'GameRegisterd': {
            return { ...state, registeredTo: action.payload }
        }
        case 'GetPlayers4Game': {
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
const CreatNewGame = dispatch => async (game, equipments) => {
    try {
        const response = await GameApi.post('/CreateNewGame', { game, equipments });
        console.log("CreateGame======>")
        console.log(response.data);
        //dispatch({ type: 'CreatNewGame', payload: response.data }) 
    } catch (err) {
        console.log("in error Create New Game")
        console.log(err)
        //dispatch({ type: 'add_error', payload: 'Somthing went wrong when post new games ' })
    }
}


const RegisterGame = dispatch => async (addPlayer2Game) => {
    try {
        console.log(addPlayer2Game)
        const response = await GameApi.post('/RegisterGame', addPlayer2Game);
        response.data == "The Player Has already Registered The Game" ?
            alert("The Player Has already Registered The Game")
            :
            alert("You have joined the game successfuly");
    } catch (err) {
        console.log(err)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when joining a game' })
    }
}

const GameRegisterd = dispatch => async (email, teamSerialNum) => {
    let obj = {
        Email: email,
        TeamSerialNum: teamSerialNum
    }
    const response = await GameApi.post('/GamesThatUserRegisterd', obj);
    console.log("this is the game that the player has registed===>")
    console.log(response.data)
    dispatch({ type: 'GameRegisterd', payload: response.data })

}


const GetPlayers4Game = dispatch => async (gameSerialNum, players) => {
    try {
        const response = await GameApi.post('/GetPlayers4Game', { gameSerialNum });
        let emailsPlayers = response.data;
        let allPlayers4Game = [];
        emailsPlayers.map(p => {
            let playerThatReg = players.find(x => x.Email == p.EmailPlayer);
            if (playerThatReg !== null)
                allPlayers4Game.push(playerThatReg)
        })
        //log(allPlayers4Game)
        dispatch({ type: 'GetPlayers4Game', payload: allPlayers4Game })
    }
    catch (error) {
        console.log("err")
    }
}
const DeleteRequest = dispatch => async (EmailPlayer, GameSerialNum) => {
    try {
        await GameApi.post('/DeleteRequest', { EmailPlayer, GameSerialNum });
    } catch (error) {
        console.log("err DeleteRequest")
        console.log(error.message)
    }
}

const ApproveRequest = dispatch => async (EmailPlayer, GameSerialNum) => {
    try {

        await GameApi.post('/AcceptRequest', { EmailPlayer, GameSerialNum });
    } catch (error) {
        console.log("err ApproveRequest")
        console.log(error.message)
    }
}



export const { Context, Provider } = CreateDataContext(
    //Reducer
    gameReducer,
    {
        GetGamesList,
        CreatNewGame,
        RegisterGame,
        GameRegisterd,
        GetPlayers4Game,
        DeleteRequest,
        ApproveRequest,
    },
    {
        gamesList: [],
        registeredTo: [],
        //emailsOfPlayersPerGame: [],
        playersPerGame: [],
    }
);
