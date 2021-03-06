import CreateDataContext from './createDataContext';
import GameApi from '../api/Game';

const gameReducer = (state, action) => {
    switch (action.type) {
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
        case 'EditGameDetailes': {
            return { ...state, gamesList: action.payload }
        }
        case 'GetPlayersDivied2Groups': {
            return { ...state, playersPerGroups: action.payload }
        }
        case 'GetAmountRegisteredPlayersEachGame': {
            return { ...state, amountRegisteredPlayersEachGame: action.payload }
        }
        case 'GetGamesPlayerNotRegistered': {
            return { ...state, gamesPlayerNotRegistered: action.payload }
        }
        case 'GetPlayerWaiting': {
            return { ...state, waitList: action.payload }
        }
        case 'Check': {
            return { ...state, check: action.payload }
        }
        case 'RemoveGameFromList': {
            return { ...state, gamesList: action.payload }
        }
        case 'TodaysGame': {
            return { ...state, todaysGame: action.payload }
        }
        case 'CheckIfRegisterd2AnyGame': {
            return { ...state, registeredAtList1Game: action.payload }
        }
        case 'CleanTodaysGame': {
            return { ...state, todaysGame: action.payload }
        }
        default:
            return state
    }
};

const GetGamesList = dispatch => async (teamSerialNum) => {
    try {
        const response = await GameApi.post('/GamesList', { TeamSerialNum: teamSerialNum });
        dispatch({ type: 'GetGamesList', payload: response.data })
    } catch (err) {
        console.log("in error GetGameList ", err.data)
    }
}

const CreatNewGame = dispatch => async (game, equipments) => {
    try {
        await GameApi.post('/CreateNewGame', { game, equipments });
    } catch (err) {
        console.log("in error Create New Game", err)
    }
}

const RegisterGame = dispatch => async (addPlayer2Game, needsToWait) => {
    try {
        console.log(addPlayer2Game)
        await GameApi.post('/RegisterGame', addPlayer2Game);
    } catch (err) {
        console.log("err in RegisterGame", err)
    }
}

const GameRegisterd = dispatch => async (email, teamSerialNum) => {
    try {
        let obj = {
            Email: email,
            TeamSerialNum: teamSerialNum
        }
        const response = await GameApi.post('/GamesThatUserRegisterd', obj);
        console.log("this is the game that the player has registed===>")
        dispatch({ type: 'GameRegisterd', payload: response.data })
    } catch (error) {
        console.log("error in GameRegisterd ", error)
    }

}

const GetPlayers4Game = dispatch => async (gameSerialNum, players) => {
    try {
        const response = await GameApi.post('/GetPlayers4Game', { gameSerialNum });
        let emailsPlayers = response.data;
        let allPlayers4Game = [];

        if (emailsPlayers.length > 0) {
            emailsPlayers.map(p => {
                let playerThatReg = players.find(x => x.Email == p.EmailPlayer);
                if (playerThatReg !== null)
                    allPlayers4Game.push(playerThatReg)
            })
            dispatch({ type: 'GetPlayers4Game', payload: allPlayers4Game })
        }
        else
            dispatch({ type: 'GetPlayers4Game', payload: [] })
    }
    catch (error) {
        console.log("err in get players 4 game", error)
    }
}
const DeleteRequest = dispatch => async (EmailPlayer, GameSerialNum, TeamSerialNum) => {
    try {
        await GameApi.post('/DeleteRequest', { EmailPlayer, GameSerialNum });
        GetGamesList(TeamSerialNum);
    } catch (error) {
        console.log("err DeleteRequest", error.message)
    }
}

const ApproveRequest = dispatch => async (EmailPlayer, GameSerialNum) => {
    try {
        await GameApi.post('/AcceptRequest', { EmailPlayer, GameSerialNum });
    } catch (error) {
        console.log("err ApproveRequest", error.message)
    }
}

const EditGameDetailes = dispatch => async (game) => {
    try {
        const res = await GameApi.post('/EditGameDetailes', { game });
        if (res.data != "Somting went wrong with the gameSerialNum")
            dispatch({ type: 'EditGameDetailes', payload: res.data })
    } catch (error) {
        console.log("err EditGameDetailes", error)
    }
}

const GetPlayersDivied2Groups = dispatch => async (GameSerialNum, registeredPlayers) => {
    try {
        const res = await GameApi.post('/GetPlayersDivied2Groups', { GameSerialNum });
        if (res.data != "No one has registered yet for this game")
            dispatch({ type: 'GetPlayersDivied2Groups', payload: res.data })
    } catch (error) {
        console.log("err GetPlayersDivied2Groups", error)
    }
}

const GetAmountRegisteredPlayersEachGame = dispatch => async (TeamSerialNum) => {
    try {
        const res = await GameApi.post('/GetAmountRegisteredPlayersEachGame', { TeamSerialNum });
        if (res.data != "There are no games for this Team")
            dispatch({ type: 'GetAmountRegisteredPlayersEachGame', payload: res.data })
    } catch (error) {
        console.log("err Get Amount Registered Players Each Game", error.message)
    }
}

const LeaveGame = dispatch => async (EmailPlayer, GameSerialNum) => {
    try {
        await GameApi.post('/LeaveGame', { EmailPlayer, GameSerialNum });
    } catch (error) {
        console.log("err LeaveGame",error.message)
    }
}

const GetPlayerWaiting = dispatch => async (GameSerialNum, players) => {
    try {
        const response = await GameApi.post('/GetPlayerWaiting', { GameSerialNum });
        let emailsPlayers = response.data;
        let waitingListPlayers = [];
        if (emailsPlayers.length > 0 && typeof emailsPlayers !== 'string') {
            emailsPlayers.map(p => {
                let waitingPlayer = players.find(x => x.Email == p.EmailPlayer);
                if (waitingPlayer !== null)
                    waitingListPlayers.push(waitingPlayer)
            })
        }
        dispatch({ type: 'GetPlayerWaiting', payload: waitingListPlayers })
    } catch (err) {
        console.log("in error GetPlayerWaiting " , err.message)
    }
}

const GetGamesPlayerNotRegistered = dispatch => async (EmailPlayer) => {
    try {
        const response = await GameApi.post('/GamesThatUserNotRegisterd', { EmailPlayer });
        if (typeof response.data !== 'string')
            dispatch({ type: 'GetGamesPlayerNotRegistered', payload: response.data })
        else {
            console.log("Something Went wrong with the games that user not registered !")
            console.log(response.data)
        }
    } catch (err) {
        console.log("in error GetGamesPlayerNotRegistered", err.message)
    }
}

const RemoveGameFromList = dispatch => async (game2Remove) => {
    try {
        const response = await GameApi.post('/RemoveGameFromList', game2Remove);
        dispatch({ type: 'RemoveGameFromList', payload: response.data })
    } catch (err) {
        console.log("Something Went wrong when you tried to remove this game  ! ",err.message)
    }
}

const GetTodaysGame = dispatch => async (EmailPlayer) => {
    try {
        const response = await GameApi.post('/TodaysGame', { EmailPlayer });
        if (response.data !== null && response.data !== -1) {
            dispatch({ type: 'TodaysGame', payload: response.data })
        }
    } catch (err) {
        console.log("Something Went wrong in todays game  ! ",err.message)
    }
}

const CheckIfRegisterd2AnyGame = dispatch => async (EmailPlayer) => {
    try {
        const response = await GameApi.post('/CheckIfRegisterd2AnyGame', { EmailPlayer });
        if (response.data === true || response.data === false) {
            dispatch({ type: 'CheckIfRegisterd2AnyGame', payload: response.data })
        }
        else {
            CleanTodaysGame()
        }
    } catch (err) {
        console.log("Something Went wrong in CheckIfRegisterd2AnyGame  ! ",err.message)
    }
}

const CleanTodaysGame = dispatch => async () => {
    try {
        dispatch({ type: 'CleanTodaysGame', payload: null })
    } catch (err) {
        console.log("Something Went wrong in CleanTodaysGame ! ",err.message)
    }
}

export const { Context, Provider } = CreateDataContext(
    //Reducer
    gameReducer,
    {
        GetGamesList,
        CreatNewGame,
        RegisterGame,
        GetAmountRegisteredPlayersEachGame,
        GameRegisterd,
        GetPlayers4Game,
        DeleteRequest,
        ApproveRequest,
        EditGameDetailes,
        GetPlayersDivied2Groups,
        LeaveGame,
        GetGamesPlayerNotRegistered,
        RemoveGameFromList,
        GetPlayerWaiting,
        GetTodaysGame,
        CheckIfRegisterd2AnyGame,
        CleanTodaysGame
    },
    {
        gamesList: [],
        registeredTo: [],
        playersPerGame: [],
        playersPerGroups: [],
        amountRegisteredPlayersEachGame: [],
        gamesPlayerNotRegistered: [],
        waitList: [],
        todaysGame: null,
        registeredAtList1Game: true

    }
);
