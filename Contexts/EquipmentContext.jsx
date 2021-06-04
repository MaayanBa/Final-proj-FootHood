import CreateDataContext from './createDataContext';
import EquipmentApi from '../api/Equipment';

const equipmentReducer = (state, action) => {
    //console.log(action.payload)
    switch (action.type) {
        case 'GetAllEquipments':
            return { ...state, equipments: action.payload }
        case 'GetItemsAssignForGame':
            return { ...state, gameEquipments: action.payload }
        case 'AssignEquipment2Player':
            return { ...state, gameEquipments: action.payload }
        default:
            return state
    }
};

// const GetAllEquipments = dispatch => async () => {
//     try {
//         const response = "";
//         if (response !== undefined) {
//             dispatch({ type: 'GetAllEquipments', payload: response.data });
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

const GetAllEquipments = dispatch => async (gameSerialNum) => {
    try {
        const response = await EquipmentApi.post('/GetAllEquipments', { GameSerialNum: gameSerialNum })
        console.log(response.data)
        dispatch({ type: 'GetAllEquipments', payload: response.data })
    } catch (err) {
        console.log(err.data)
    }
}

const GetItemsAssignForGame = dispatch => async () => {
    try {
        // console.log("IM JAJAJA")
        const response = await EquipmentApi.post('/GetItemsAssignForGame')
        dispatch({ type: 'GetItemsAssignForGame', payload: response.data })
    } catch (err) {
        console.log(err.data)
    }
}

const AssignEquipment2Player = dispatch => async (assignEquipment2Player) => {
    try {
        // console.log("IM JAJAJA")
        console.log(assignEquipment2Player)
        // const response = await EquipmentApi.post('/AssignEquipment2Player')
        //dispatch({ type: 'AssignEquipment2Player', payload: response.data })
    } catch (err) {
        console.log(err.data)
    }
}
export const { Context, Provider } = CreateDataContext(
    //Reducer
    equipmentReducer,
    {
        GetAllEquipments,
        GetItemsAssignForGame,
        AssignEquipment2Player,
    },
    {
        equipments: [],
        gameEquipments: [],
    }
);
