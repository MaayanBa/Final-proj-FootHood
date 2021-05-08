import CreateDataContext from './createDataContext';

const citiesReducer = (state, action) => {
    //console.log(action.payload)
    switch (action.type) {
        case 'GetListCities':
            return { ...state, cities: action.payload }
        default:
            return state
    }
};

const GetListCities = dispatch => async () => {
    try {
        const response = await fetch('https://parseapi.back4app.com/classes/Israelcities_City?limit=100000&order=name&keys=name,country,location,cityId,objectId',
            {
                headers: {
                    'X-Parse-Application-Id': 'WzDS6Uhu9MpqArl85l8GM5fmmHFF1QsFJamMFWIY', // This is your app's application id
                    'X-Parse-REST-API-Key': 'F1wFpQk18GaPawGBth2rZ7yyQ9YAmk0LN7MqeDjY', // This is your app's REST API key
                }
            }
        );
        const data = await response.json(); // Here you have the data that you need
        dispatch({ type: 'GetListCities', payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const { Context, Provider } = CreateDataContext(
    //Reducer
    citiesReducer,
    {
        GetListCities,
    },
    {
        cities: null
    }
);
