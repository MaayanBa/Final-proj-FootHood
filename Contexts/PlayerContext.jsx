import CreateDataContext from './createDataContext';
import PlayerApi from '../api/Player';
import RankApi from '../api/Rank'

const playerReducer = (state, action) => {
    switch (action.type) {
        case 'GetPlayers':
            return { ...state, players: action.payload }
        case 'RankPlayer':
            return { ...state, ranked: action.payload }
        case 'CleanRankRes':
            return { ...state, ranked: action.payload }
        default:
            return state
    }
};

const GetPlayers = dispatch => async () => {
    try {
        const response = await PlayerApi.get('/GetPlayers')
        dispatch({ type: 'GetPlayers', payload: response.data })
    } catch (err) {
        console.log("err GetPlayers - Player Context",err)
    }
}

const RankPlayer = dispatch => async (EmailofRatedPlayer, EmailofRatingPlayer, PowerRating, AttackRating, DefenseRating) => {
    try {
        const response = await RankApi.post('/RankPlayer', { EmailofRatedPlayer, EmailofRatingPlayer, PowerRating, AttackRating, DefenseRating })
        dispatch({ type: 'RankPlayer', payload: response.data })
    } catch (err) {
        console.log("err RankPlayer - Player Context",err.message)
    }
}

const RankPlayerAfterGame = dispatch => async (EmailofRatedPlayer, EmailofRatingPlayer, PowerRating, AttackRating, DefenseRating, GameSerialNum) => {
    try {
        if (EmailofRatedPlayer == EmailofRatingPlayer)
            alert("You can't rate yourself")
        else {
            await RankApi.post('/RankPlayerAfterGame', { EmailofRatedPlayer, EmailofRatingPlayer, PowerRating, AttackRating, DefenseRating, GameSerialNum })
        }
    } catch (err) {
        console.log("err RankPlayerAfterGame - Player Context",err)
    }
}

const CleanRankRes = dispatch => async () => {
    dispatch({ type: 'CleanRankRes', payload: '' })
}

export const { Context, Provider } = CreateDataContext(
    //Reducer
    playerReducer,
    {
        GetPlayers,
        RankPlayer,
        RankPlayerAfterGame,
        CleanRankRes,
    },
    {
        players: [],
        ranked: '',
    }
);
