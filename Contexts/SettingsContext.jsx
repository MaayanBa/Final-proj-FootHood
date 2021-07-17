import CreateDataContext from './createDataContext';
import SettingsApi from '../api/Settings';

const settingsReducer = (state, action) => {
    switch (action.type) {
        default:
            return state
    }
};

const AddFeedback = dispatch => async (newFeedback) => {
    try {
        const response = await SettingsApi.post('/AddFeedback', newFeedback)
        console.log(response.data)
        //alert("Thank you for leaving a feedback")
    } catch (err) {
        console.log("error in AddFeedback",err.message)
    }
}
const ChangePasscode = dispatch => async (player) => {
    try {
        const response = await SettingsApi.post('/ChangePasscode', {
            Email: player.Email,
            Passcode: player.Passcode,
            NewPasscode: player.NewPasscode
        })

    } catch (err) {
        console.log("error in ChangePasscode ",err.message)
    }
}

export const { Context, Provider } = CreateDataContext(
    //Reducer
    settingsReducer,
    {
        AddFeedback,
        ChangePasscode
    },
    {

    }
);
