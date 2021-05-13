import CreateDataContext from './createDataContext';
import TeamApi from '../api/Team';

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
        // case 'GetJoinRequests': {
        //     return { ...state, joinRequests: action.payload }
        // }
        case 'TeamPlayers': {
            return { ...state, teamPlayers: action.payload }
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
        // console.log("response . data === " + response.data);
        // console.log(response.data);
        await dispatch({ type: 'CreateNewTeam', payload: response.data });
    } catch (err) {
        console.log(err.response.data)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when creating a team' })
    }

}

const GetTeamDetails = dispatch => async (playerEmail) => {
    try {
        const response = await TeamApi.post('/TeamDetails', { EmailPlayer: playerEmail });
        //console.log("response . data === " + response.data);
        //console.log( response.data);
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

        console.log(playerInTeam);
        const response = await TeamApi.post('/LeaveTeam', playerInTeam);
        //console.log("response . data === " + response.data);
        //console.log( response.data);
        dispatch({ type: 'LeaveTeam', payload: response.data })
    } catch (err) {
        console.log("in error" +err.response.data)
        console.log(err.response.data)

        // dispatch({ type: 'add_error', payload: 'Somthing went wrong when getting players for team' })
    }
}

// const GetJoinRequests = dispatch => async (GameSerialNum) => {
//     try {
//         const response = await TeamApi.post('/JoinRequests', { GameSerialNum });
//         console.log("response . data === " + response.data);
//         console.log( response.data);
//         dispatch({ type: 'GetJoinRequests', payload: response.data })
//     } catch (err) {
//         console.log("in error" +err.response.data)
//         console.log(err.response.data)

//         dispatch({ type: 'add_error', payload: 'Somthing went wrong when getting the join requests for the game' })
//     }
// }

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


const setTeamPlayers = dispatch => async (team,players) => {
    try {
        //console.log(players)
       
        let tempArr = [];
        team.PlayersList.forEach(p => {
            console.log("PlayerListttttt======"+p)
            let player = players.find(x => x.Email === p.EmailPlayer)
            if (player !== null)
                tempArr.push(player);
        });
        dispatch({ type: 'TeamPlayers', payload: tempArr })

    } catch (error) {
        console.log("Somtiong get wring with playerList")
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
        // GetJoinRequests,
        SearchPlayer,
        AddPlayer,
        SetSearchPlayer,
        setTeamPlayers,
    },
    {
        myTeams: [],
        searchedPlayers: [],
        joinRequests: [],
        teamPlayers: [],
    }
);
