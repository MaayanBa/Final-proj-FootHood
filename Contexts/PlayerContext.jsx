import CreateDataContext from './createDataContext';
import PlayerApi from '../api/Player';
import RankApi from '../api/Rank'

const playerReducer = (state, action) => {
    switch (action.type) {
        case 'GetPlayers':
            return { ...state, players: action.payload }
        default:
            return state
    }
};

const GetPlayers = dispatch => async () => {
    try {
        const response = await PlayerApi.get('/GetPlayers')
        dispatch({ type: 'GetPlayers', payload: response.data })
    } catch (err) {
        console.log("err GetPlayers - Player Context")
        console.log(err)
    }
}

const RankPlayer = dispatch => async (EmailofRatedPlayer, EmailofRatingPlayer, PowerRating, AttackRating, DefenseRating) => {
    try {
        if (EmailofRatedPlayer == EmailofRatingPlayer)
            alert("You can't rate yourself")
        else if (PowerRating === 100 && AttackRating === 100 && DefenseRating === 100) {
            alert("No one is perfect excpet Messi and Ronaldo =)\nPlease rate more detailed the values")
        }
        else {
            const response = await RankApi.post('/RankPlayer', { EmailofRatedPlayer, EmailofRatingPlayer, PowerRating, AttackRating, DefenseRating })
            alert(response.data);
            console.log(response.data)
        }
    } catch (err) {
        console.log("err RankPlayer - Player Context")
        console.log(err)
    }
}

export const { Context, Provider } = CreateDataContext(
    //Reducer
    playerReducer,
    {
        GetPlayers,
        RankPlayer,
    },
    {
        players: [],
    }
);
