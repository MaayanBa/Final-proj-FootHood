import CreateDataContext from './createDataContext';
import EquipmentApi from '../api/Equipment';

const equipmentReducer = (state, action) => {
    switch (action.type) {
        case 'GetAllEquipments':
            return { ...state, equipments: action.payload }
        case 'GetItemsAssignForGame':
            return { ...state, gameEquipments: action.payload }
        case 'AssignEquipment2Player':
            return { ...state, response: action.payload }
        default:
            return state
    }
};

const GetAllEquipments = dispatch => async (gameSerialNum) => {
    try {
        const response = await EquipmentApi.post('/GetAllEquipments', { GameSerialNum: gameSerialNum })
        dispatch({ type: 'GetAllEquipments', payload: response.data })
    } catch (err) {
        console.log(err.data)
    }
}

const GetItemsAssignForGame = dispatch => async (gameSerialNum) => {
    try {
        const response = await EquipmentApi.post('/GetItemsAssignForGame', { GameSerialNum: gameSerialNum })
        dispatch({ type: 'GetItemsAssignForGame', payload: response.data })
    } catch (err) {
        console.log(err.data)
    }
}

const AssignEquipment2Player = dispatch => async (assignEquipment2Player) => {
    try {
        const response = await EquipmentApi.post('/AssignEquipment2Player', assignEquipment2Player)
        dispatch({ type: 'AssignEquipment2Player', payload: response.data })
    } catch (err) {
        console.log(err.data)
    }
}

const AddNewItem = dispatch => async (newEquipment) => {
    try {
        console.log(newEquipment)
        await EquipmentApi.post('/AddNewItem', newEquipment)
        GetAllEquipments(newEquipment.GameSerialNum)
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
        AddNewItem,
    },
    {
        equipments: [],
        gameEquipments: [],
        response:'',
    }
);
