import CreateDataContext from './createDataContext';
import GameApi from '../api/Game';

const equipmentReducer = (state, action) => {
    //console.log(action.payload)
    switch (action.type) {
        case 'GetAllEquipments':
            return { ...state, equipments: action.payload }
        default:
            return state
    }
};

const GetAllEquipments = dispatch => async () => {
    try {
        const response = "";
        if (response !== undefined) {
            dispatch({ type: 'GetAllEquipments', payload: response.data });
        }
    } catch (error) {
        console.log(error)
    }
}

export const { Context, Provider } = CreateDataContext(
    //Reducer
    equipmentReducer,
    {
        GetAllEquipments,
    },
    {
        equipments: []
    }
);
