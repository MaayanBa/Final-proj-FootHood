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
        const response = await fetch('https://parseapi.back4app.com/classes/Israelcities_City?limit=10000&order=name&keys=name,country,location',
            {
                headers: {
                    'X-Parse-Application-Id': 'EE7AbXbB3u1OJeNLNDcvpFArcuDiG8ZsGRhxPKIx', // This is your app's application id
                    'X-Parse-REST-API-Key': 'g0vJDyl3B3uLtupA8KyBKiamNsTFTyAZA8CiFM70', // This is your app's REST API key
                }
            }
        );
        const data = await response.json(); // Here you have the data that you need
        dispatch({ type: 'GetListCities', payload: data });
    } catch (error) {
        console.log("error in GetListCities",error)
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
