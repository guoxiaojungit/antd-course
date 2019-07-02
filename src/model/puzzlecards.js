import request from '../util/request';
const delay=(millisecond)=>{
    return new Promise(resolve => {
        setTimeout(resolve,millisecond)
    })
};
export default {
    namespace: 'puzzlecards',
    state: {
        data:[],
       /* data:[
            { id: 1,
                setup: 'Did you hear about the two silk worms in a race?',
                punchline: 'It ended in a tie',
            },
            {
                id: 2,
                setup: 'What happens to a frog\'s car when it breaks down?',
                punchline: 'It gets toad away',
            },
        ],*/
        counter:0,
    },
    effects:{
        *queryInitCards(_,sagaEffects){
            const {call,put}=sagaEffects;
            const endPointURL='/dev/recommendPoetry';
            const puzzle=yield call(request,endPointURL)
            yield put({type:'addNewCard',payload:puzzle})
            yield call(delay,3000);
            const puzzle2=yield call(request,endPointURL)
            yield put({type:'addNewCard',payload:puzzle2})
        }
    },
    reducers:{
        addNewCard(state,{payload:newCard}){
            const nextCounter=state.counter+1;
            const newCardWithId={...newCard,id:nextCounter};
            const nextData=state.data.concat(newCardWithId);
            return {
                data:nextData,
                counter: nextCounter
            }
        }
    }
};