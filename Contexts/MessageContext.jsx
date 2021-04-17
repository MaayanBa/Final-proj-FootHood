// import CreateDataContext from './createDataContext';
// import { firebase } from '../api/FireBase';



// const playerReducer = (state, action) => {
//     switch (action.type) {
//         case '':
//             return { ...state, players: action.payload }
//         default:
//             return state
//     }
// };

// const GetMessages = dispatch => async () => {
//     try {
//         const response = await PlayerApi.get('/GetPlayers')
//         // console.log("the list of the all players is ======> " + response)
//         // console.log( response)
//         console.log("the list of the all players is ======> " + response.data)
//         console.log(response.data)
//         dispatch({type: 'GetPlayers', payload: response.data})
//     } catch (err) {
//         console.log(err.data)
//     }

// }
// export const { Context, Provider } = CreateDataContext(
//     //Reducer
//     playerReducer,
//     {
//         GetPlayers,
//     },
//     {
//         players: []
//     }
// );
