import CreateDataContext from './createDataContext';

const NewsReducer = (state, action) => {
    switch (action.type) {
        case 'SetTitles':
            return { ...state, titles: action.payload }
        case 'SetLinks':
            return { ...state, links: action.payload }
        default:
            return state
    }
};

const GetNews = dispatch => async (israelNews) => {
    try {
        let title = [];
        let linkArr = [];
        let israelUrl = 'https://www.one.co.il/cat/coop/xml/rss/newsfeed.aspx?c=1';
        let worldNews = 'https://www.one.co.il/cat/coop/xml/rss/newsfeed.aspx?c=3';

        fetch(israelNews === true ? israelUrl : worldNews)
            .then(res => res.text())
            .then(data => {
                var XMLParser = require('react-xml-parser');
                var xml = new XMLParser().parseFromString(data);
                //console.log(xml.getElementsByTagName('link'));
                //console.log(xml.getElementsByTagName('title'));
                var headers = xml.getElementsByTagName('title')
                var link = xml.getElementsByTagName('link')
                headers.map(x => {
                    if (x.value != "ONE") {
                        // console.log(x.value)
                        // console.log("===============")
                        title.push(x.value);
                    }
                })
                dispatch({ type: 'SetTitles', payload: title })

                link.map(x => {
                    if (x.value !== "https://www.ONE.co.il") {
                        // console.log(x.value)
                        // console.log("===============")
                        if (x.value !== "https://images.one.co.il//images/one/logosmall.jpg") {
                            linkArr.push(x.value);
                        }
                    }
                })
                // console.log(linkArr)
                dispatch({ type: 'SetLinks', payload: linkArr })

            })
            .catch(err => console.log(err));



    } catch (error) {
        console.log("err GetNews")
        console.log(error)
    }
}

export const { Context, Provider } = CreateDataContext(
    //Reducer
    NewsReducer,
    {
        GetNews,
    },
    {
        titles: [],
        links: []
    }
);