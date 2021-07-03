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
        // console.log(EmailPlayer)
        // console.log(FeedbackContext)
        const response = await SettingsApi.post('/AddFeedback', newFeedback)
        console.log(response.data)
        alert("Thank you for leaving a feedback")
    } catch (err) {
        console.log("error in AddFeedback")
        console.log(err)
    }
}
const ChangePasscode = dispatch => async (player) => {
    try {
        console.log(player)

        const response = await SettingsApi.post('/ChangePasscode', {
            Email: player.Email,
            Passcode: player.Passcode,
            NewPasscode: player.NewPasscode
        })

        if (response.status < 400 || response.status >= 500) {
            alert(response.data)
        }
    } catch (err) {
        console.log("error in ChangePasscode ")
        console.log(err.message)
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
