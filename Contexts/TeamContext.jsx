import CreateDataContext from './createDataContext';
import TeamApi from '../api/Team';



const teamReducer = (state, action) => {
    switch (action.type) {

        case 'clearState': {
            return { ...state, myTeams: [] }
        }
        case 'GetTeamDetails': {
            return { ...state, myTeams: action.payload }
        }
        case 'CreateNewTeam': {
            return { ...state, myTeams: action.payload }
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
        console.log("response . data === " + response.data);
        console.log(response.data);

        await dispatch({ type: 'CreateNewTeam', payload: response.data });
    } catch (err) {
        console.log(err.response.data)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when creating a team' })
    }

}

const GetTeamDetails = dispatch => async (playerEmail) => {
    try {
        const response = await TeamApi.post('/TeamDetails', { EmailPlayer: playerEmail });
        // console.log("response . data === " + response.data);
        // console.log( response.data);
        dispatch({ type: 'GetTeamDetails', payload: response.data })
    } catch (err) {
        // console.log("in error" +err.response.data)
        // console.log(err.response.data)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when getting teams' })
    }
}
const GetPlayers4Team = dispatch => async (playersList) => {
    try {
        const response = await TeamApi.post('/GetPlayers4Team', { playersList });
        // console.log("response . data === " + response.data);
        // console.log( response.data);
        //dispatch({ type: 'GetTeamDetails', payload: response.data })
    } catch (err) {
        console.log("in error" +err.response.data)
        console.log(err.response.data)

        dispatch({ type: 'add_error', payload: 'Somthing went wrong when getting players for team' })
    }
}
export const { Context, Provider } = CreateDataContext(
    //Reducer
    teamReducer,
    {
        CreateNewTeam,
        GetTeamDetails,
        clearState,
        GetPlayers4Team
    },
    {
        myTeams: [],
        players:[]
    }
);
