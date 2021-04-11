import CreateDataContext from './createDataContext';
import TeamApi from '../api/Team';



const teamReducer = (state, action) => {
    switch (action.type) {
          default:
            return state
    }
};
 

const CreateNewTeam = dispatch => async (newTeam) => {
    try {
        console.log("The new Team =====>   ")
        console.log(newTeam)
        const response = await TeamApi.post('/CreateNewTeam', newTeam);
        console.log("response . data === " + response.data);
        //dispatch({ type: 'CreateNewTeam', payload: response.data.token });
    } catch (err) {
        console.log(err.response.data)
        dispatch({ type: 'add_error', payload: 'Somthing went wrong when creating a team' })
    }
    
}


export const { Context, Provider } = CreateDataContext(
    //Reducer
    teamReducer,
    {
        CreateNewTeam,
    },
    {
        myTeams: [],

    }
);





