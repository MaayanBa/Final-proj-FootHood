import CreateDataContext from './createDataContext';
import GameApi from '../api/Game';
import JarvisApi from '../api/Jarvis';
import { array } from 'yup';

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
        case 'Check': {
            return { ...state, check: action.payload }
        }
        case 'RemoveGameFromList':{
            return { ...state, gamesList: action.payload }
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
const DeleteRequest = dispatch => async (EmailPlayer, GameSerialNum, TeamSerialNum) => {
    try {
        await GameApi.post('/DeleteRequest', { EmailPlayer, GameSerialNum });
        console.log(TeamSerialNum)
        GetGamesList(TeamSerialNum);
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

const EditGameDetailes = dispatch => async (game) => {
    try {
        const res = await GameApi.post('/EditGameDetailes', { game });
        if (res.data != "Somting went wrong with the gameSerialNum")
            dispatch({ type: 'EditGameDetailes', payload: res.data })
    } catch (error) {
        console.log("err EditGameDetailes")
        console.log(error)
    }
}
const GetPlayersDivied2Groups = dispatch => async (GameSerialNum, registeredPlayers) => {
    try {
        const res = await GameApi.post('/GetPlayersDivied2Groups', { GameSerialNum });
        //console.log(res.data)
        if (res.data != "No one has registered yet for this game")
            dispatch({ type: 'GetPlayersDivied2Groups', payload: res.data })
    } catch (error) {
        console.log("err GetPlayersDivied2Groups")
        console.log(error)
    }
}

const GetAmountRegisteredPlayersEachGame = dispatch => async (TeamSerialNum) => {
    try {
        const res = await GameApi.post('/GetAmountRegisteredPlayersEachGame', { TeamSerialNum });
        if (res.data != "There are no games for this Team")
            dispatch({ type: 'GetAmountRegisteredPlayersEachGame', payload: res.data })
        // else
        //     console.log("Thare are not players that registerd in any game")
    } catch (error) {
        console.log("err Get Amount Registered Players Each Game")
        console.log(error)
    }
}

const LeaveGame = dispatch => async (EmailPlayer, GameSerialNum) => {
    try {
        console.log(EmailPlayer)
        console.log(GameSerialNum)
        const res = await GameApi.post('/LeaveGame', { EmailPlayer, GameSerialNum });

        if (res.data != "You Have Left the Game Succesfully")
            alert("You Have Left the Game Succesfully");
    } catch (error) {
        console.log("err LeaveGame")
        console.log(error)
    }
}
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
        if (res.data > 0)
            alert(`Jarvis has found  ${res.data} matching players for this game ! \n\nPlease keep up on your join requests ! `)
        else
            alert(`Jarvis hasn't found  any matching players for this game ! \n\nWe welcome you to invite new friends ! `)


    } catch (error) {
        console.log("err Jarvis_FindPlayers4Game")
        console.log(error)
    }
}

const GetGamesPlayerNotRegistered = dispatch => async (EmailPlayer) => {
    try {
        // console.log(EmailPlayer);
        const response = await GameApi.post('/GamesThatUserNotRegisterd', { EmailPlayer });
        if (typeof response.data !== 'string')
            dispatch({ type: 'GetGamesPlayerNotRegistered', payload: response.data })
        else {
            console.log("Something Went wrong with the games that user not registered !")
            console.log(response.data)
        }
    } catch (err) {
        console.log("in error ")
        console.log(err)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when getting games' })
    }
}

const RemoveGameFromList = dispatch => async (game2Remove) => {
    try {
        // console.log(EmailPlayer);
        const response = await GameApi.post('/RemoveGameFromList', game2Remove);
        if (response.data.length > 0)
            dispatch({ type: 'RemoveGameFromList', payload: response.data })
        else {
            console.log("Something Went wrong when you tried to remove this game  !")
            console.log(response.data)
        }
    } catch (err) {
        console.log("in error ")
        console.log(err.message)
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
        Jarvis_FindPlayers4Game,
        GetGamesPlayerNotRegistered,
        RemoveGameFromList,
    },
    {
        gamesList: [],
        registeredTo: [],
        //emailsOfPlayersPerGame: [],
        playersPerGame: [],
        playersPerGroups: [],
        amountRegisteredPlayersEachGame: [],
        gamesPlayerNotRegistered: [],
    }
);
