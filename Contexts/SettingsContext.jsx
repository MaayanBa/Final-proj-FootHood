import CreateDataContext from './createDataContext';
import SettingsApi from '../api/Settings';

const settingsReducer = (state, action) => {
    switch (action.type) {
        // case 'AddFeedback':
        //     return { ...state, feedback: action.payload }
        default:
            return state
    }
};

const AddFeedback = dispatch => async (EmailPlayer,FeedbackContext) => {
    try {
        console.log(EmailPlayer)
        console.log(FeedbackContext)
        const response = await SettingsApi.post('/AddFeedback', { EmailPlayer,FeedbackContext })
        alert("Thank you for leaving a feedback")
        //console.log(response.data)
        //dispatch({ type: 'AddFeedback', payload: response.data })
    } catch (err) {
        console.log(err)
    }
}


export const { Context, Provider } = CreateDataContext(
    //Reducer
    settingsReducer,
    {
        AddFeedback,
    },
    {

    }
);
