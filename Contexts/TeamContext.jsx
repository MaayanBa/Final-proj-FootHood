import CreateDataContext from './createDataContext';
import TeamApi from '../api/Team';

const teamReducer = (state, action) => {
    switch (action.type) {
        case 'GetPlayers4Team': {
            return { ...state, myTeams: action.payload }
        }
        case 'LeaveTeam': {
            return { ...state, leaveTeamAlert: action.payload }
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
        case 'ClearLeaveAlert': {
            return { ...state, ClearLeaveAlert: action.payload }
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
    } catch (err) {
        console.log("ERROR in Create NewTeam")
        console.log(err.response.data)
    }

}

const GetTeamDetails = dispatch => async (playerEmail) => {
    try {
        const response = await TeamApi.post('/TeamDetails', { EmailPlayer: playerEmail });
        dispatch({ type: 'GetTeamDetails', payload: response.data })
    } catch (err) {
        console.log("in error GetTeamDetails",err)
    }
}

const GetPlayers4Team = dispatch => async (teamNum, myTeams) => {
    try {
        let copyTeams = myTeams;
        const response = await TeamApi.post('/GetPlayers4Team', { TeamSerialNum: teamNum });
        copyTeams.forEach(t => {
            if (t.TeamSerialNum === teamNum)
                t.PlayersList = response.data;
        });
        dispatch({ type: 'GetPlayers4Team', payload: copyTeams })
    } catch (err) {
        console.log("in error GetPlayers4Team" , err)
    }
}

const LeaveTeam = dispatch => async (playerInTeam) => {
    try {
        const response = await TeamApi.post('/LeaveTeam', playerInTeam);
        if (response.data.length == 0)
            await dispatch({ type: 'LeaveTeam', payload: '' })
        else
            await dispatch({ type: 'LeaveTeam', payload: response.data })
    } catch (err) {
        console.log("in error In Leave team" , err)
    }
}

const RemoveFromTeam = dispatch => async (playerInTeam, players) => {
    try {
        await TeamApi.post('/RemoveFromTeam', playerInTeam);
    } catch (err) {
        console.log("error in RemoveFromTeam" , err)
    }
}

const GetJoinRequests = dispatch => async (game, players) => {
    try {
        const response = await TeamApi.post('/JoinRequests', { GameSerialNum: game.GameSerialNum });
        let emailsPlayers = response.data;

        let allRequests4Game = [];
        if (emailsPlayers.length > 0) {
            emailsPlayers.map(p => {
                let playerThatReg = players.find(x => x.Email == p.EmailPlayer);
                if (playerThatReg !== null)
                    allRequests4Game.push(playerThatReg)
            })
            dispatch({ type: 'GetJoinRequests', payload: allRequests4Game })
        }
    } catch (err) {
        console.log("in error" ,err.response.data)
    }
}

const SearchPlayer = dispatch => async (player) => {
    try {
        const response = await TeamApi.post('/SearchPlayer', player);
        dispatch({ type: 'SearchPlayer', payload: response.data })
    } catch (err) {
        console.log("in error SearchPlayer==>" , err)
    }
}

const AddPlayer = dispatch => async (player) => {
    try {
        await TeamApi.post('/JoinTeam', player);
    } catch (err) {
        console.log("in error AddPlayer ==" , err)
    }
}

const SetSearchPlayer = dispatch => async () => {
    dispatch({ type: 'SetSearchPlayer', payload: [] })
}

const setTeamPlayers = dispatch => async (team, players) => {
    try {
        let tempArr = [];
        team.PlayersList.map(p => {
            console.log(p)
            let player = players.find(x => x.Email === p.EmailPlayer)
            if (player !== null)
                tempArr.push(player);
        });
        dispatch({ type: 'TeamPlayers', payload: tempArr })

    } catch (error) {
        console.log("error in setTeamPlayers",error)
    }
}

const AddNewJoinRequests = dispatch => async (EmailPlayer, GameSerialNum) => {
    try {
        const response = await TeamApi.post('/AddNewJoinRequests', { EmailPlayer, GameSerialNum });
        //alert("You have sent a request to join! Please wait for the manager of the team to accept you")
        console.log("response . data === " + response.data);
    } catch (err) {
        console.log("error in AddNewJoinRequests" , err.response.data)
    }

}

const SendMessageTeamChat = dispatch => async (EmailPlayer, TeamSerialNum, TeamName, FirstName, MessagePlayer, CreatedAt) => {
    try {
        await TeamApi.post('/SendMessageTeamChat', { EmailPlayer, TeamSerialNum, TeamName, FirstName, MessagePlayer, CreatedAt });
    } catch (err) {
        console.log("error in SendMessageTeamChat", err.message)
    }
}

const LoadMessages = dispatch => async (CreatedAt) => {
    try {

        dispatch({ type: 'LoadMessages', payload: CreatedAt })
    } catch (error) {
        console.log("error in LoadMessages")
    }
}

const ClearLeaveAlert = dispatch => async () => {
    dispatch({ type: 'ClearLeaveAlert', payload: '' })
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
        ClearLeaveAlert,
    },
    {
        myTeams: [],
        searchedPlayers: [],
        joinRequests: [],
        teamPlayers: [],
        loadMessages: '',
        leaveTeamAlert: ''
    }
);
