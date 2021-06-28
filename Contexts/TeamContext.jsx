import CreateDataContext from './createDataContext';
import TeamApi from '../api/Team';
import { object } from 'yup/lib/locale';

const teamReducer = (state, action) => {
    switch (action.type) {
        case 'GetPlayers4Team': {
            return { ...state, myTeams: action.payload }
        }
        case 'LeaveTeam': {
            return { ...state, myTeams: action.payload }
        }
        case 'clearState': {
            return { ...state, myTeams: [] }
        }
        case 'GetTeamDetails': {
            return { ...state, myTeams: action.payload }
        }
        case 'CreateNewTeam': {
            return { ...state, myTeams: action.payload }
        }
        case 'SetSearchPlayer': {
            return { ...state, searchedPlayers: action.payload }
        }
        case 'SearchPlayer': {
            return { ...state, searchedPlayers: action.payload }
        }
        case 'GetJoinRequests': {
            return { ...state, joinRequests: action.payload }
        }
        case 'TeamPlayers': {
            return { ...state, teamPlayers: action.payload }
        }
        case 'LoadMessages': {
            return { ...state, loadMessages: action.payload }
        }
        default:
            return state
    }
};

const clearState = dispatch => () => {
    dispatch({ type: "clearState" })
}

const CreateNewTeam = dispatch => async (newTeam) => {
    try {
        const response = await TeamApi.post('/CreateNewTeam', newTeam);
        await TeamApi.post('/CreateNewTeam', newTeam);
        // console.log("response . data === " + response.data);
        console.log(response.data);
        // await dispatch({ type: 'CreateNewTeam', payload: response.data });
    } catch (err) {
        console.log("ERROR in Create NewTeam")
        console.log(err.response.data)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when creating a team' })
    }

}

const GetTeamDetails = dispatch => async (playerEmail) => {
    try {
        const response = await TeamApi.post('/TeamDetails', { EmailPlayer: playerEmail });
        dispatch({ type: 'GetTeamDetails', payload: response.data })
    } catch (err) {
        // console.log("in error" +err.response.data)
        // console.log(err.response.data)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when getting teams' })
    }
}
const GetPlayers4Team = dispatch => async (teamNum, myTeams) => {
    try {
        let copyTeams = myTeams;
        const response = await TeamApi.post('/GetPlayers4Team', { TeamSerialNum: teamNum });
        // console.log("response . GetPlayers4Team === " + response.data);
        // console.log(response.data);
        copyTeams.forEach(t => {
            if (t.TeamSerialNum === teamNum)
                t.PlayersList = response.data;
        });
        dispatch({ type: 'GetPlayers4Team', payload: copyTeams })
    } catch (err) {
        console.log("in error GetPlayers4Team" + err)
        console.log(err)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when getting players for team' })
    }
}

const LeaveTeam = dispatch => async (playerInTeam) => {
    try {
        const response = await TeamApi.post('/LeaveTeam', playerInTeam);
        console.log("Leave teame")
        console.log(response.data)
        // if (response.data.length == 0)
        //     await dispatch({ type: 'LeaveTeam', payload: [] })
        // else
        //     await dispatch({ type: 'LeaveTeam', payload: response.data })
    } catch (err) {
        console.log("in error In Leave team" + err.response.data)
        console.log(err.response.data)
    }
}
const RemoveFromTeam = dispatch => async (playerInTeam, players) => {
    try {
        const response = await TeamApi.post('/RemoveFromTeam', playerInTeam);
        dispatch({ type: 'GetTeamDetails', payload: response.data })

        // console.log(typeof response.data)
        // if (typeof response.data== 'object') {
        //     console.log("om here" + players.length)
        //     let team = response.data;
        //     setTeamPlayers(team, players)
        // }
    } catch (err) {
        console.log("in error" + err.response.data)
        console.log(err.response.data)
    }
}

const GetJoinRequests = dispatch => async (game, players) => {
    try {
        const response = await TeamApi.post('/JoinRequests', { GameSerialNum: game.GameSerialNum });

        let emailsPlayers = response.data;
        let allRequests4Game = [];
        emailsPlayers.map(p => {
            let playerThatReg = players.find(x => x.Email == p.EmailPlayer);
            if (playerThatReg !== null)
                allRequests4Game.push(playerThatReg)
        })

        dispatch({ type: 'GetJoinRequests', payload: allRequests4Game })
    } catch (err) {
        console.log("in error" + err.response.data)
        console.log(err.response.data)

        // dispatch({ type: 'add_error', payload: 'Somthing went wrong when getting the join requests for the game' })
    }
}

const SearchPlayer = dispatch => async (player) => {
    try {
        const response = await TeamApi.post('/SearchPlayer', player);
        // console.log("response . data === " + response.data);
        // console.log(response.data);
        dispatch({ type: 'SearchPlayer', payload: response.data })
    } catch (err) {
        console.log("in error SearchPlayer==>" + err)
        console.log(err.data)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when searching for players' })
    }
}

const AddPlayer = dispatch => async (player) => {
    try {
        await TeamApi.post('/JoinTeam', player);
    } catch (err) {
        console.log("in error AddPlayer ==" + err)
        console.log(err)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when adding player' })
    }
}
const SetSearchPlayer = dispatch => async () => {
    dispatch({ type: 'SetSearchPlayer', payload: [] })
}

const setTeamPlayers = dispatch => async (team, players) => {
    try {
        let tempArr = [];
        // console.log("team")
        // console.log(team)
        team.PlayersList.forEach(p => {
            let player = players.find(x => x.Email === p.EmailPlayer)
            if (player !== null)
                tempArr.push(player);
        });
        dispatch({ type: 'TeamPlayers', payload: tempArr })

    } catch (error) {
        console.log(error)
    }
}

const AddNewJoinRequests = dispatch => async (EmailPlayer, GameSerialNum) => {
    try {
        console.log(EmailPlayer)
        console.log(GameSerialNum)
        const response = await TeamApi.post('/AddNewJoinRequests', { EmailPlayer, GameSerialNum });
        alert("You have sent a request to join! Please wait for the manager of the team to accept you")
        console.log("response . data === " + response.data);
        //console.log(response.data);
    } catch (err) {
        console.log(err.response.data)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when sending a joining request' })
    }

}
const SendMessageTeamChat = dispatch => async (EmailPlayer, TeamSerialNum, TeamName, FirstName, MessagePlayer, CreatedAt) => {
    try {
        await TeamApi.post('/SendMessageTeamChat', { EmailPlayer, TeamSerialNum, TeamName, FirstName, MessagePlayer, CreatedAt });
    } catch (err) {
        console.log(err.message)
    }
}

const LoadMessages = dispatch => async (CreatedAt) => {
    try {

        console.log("bool" + CreatedAt)

        dispatch({ type: 'LoadMessages', payload: CreatedAt })
    } catch (error) {
        console.log("error in LoadMessages")
    }
}

export const { Context, Provider } = CreateDataContext(
    //Reducer
    teamReducer,
    {
        CreateNewTeam,
        GetTeamDetails,
        clearState,
        GetPlayers4Team,
        LeaveTeam,
        GetJoinRequests,
        SearchPlayer,
        AddPlayer,
        SetSearchPlayer,
        setTeamPlayers,
        AddNewJoinRequests,
        SendMessageTeamChat,
        LoadMessages,
        RemoveFromTeam,
    },
    {
        myTeams: [],
        searchedPlayers: [],
        joinRequests: [],
        teamPlayers: [],
        loadMessages: ''
    }
);
