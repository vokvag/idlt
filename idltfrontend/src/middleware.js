import agent from './agent'
import {
    ASYNC_START,
    ASYNC_END,
    LOGIN,
    LOGOUT,
    REGISTER,
    FIRST_PROGRAMMING_LANGUAGE_CHANGED,
    SECOND_PROGRAMMING_LANGUAGE_CHANGED
} from './constants/actionTypes'

const promiseMiddleware = store => next => action => {
    if(isPromise(action.payload)) {
        store.dispatch({ type: ASYNC_START, subtype: action.type });

        const currentView = store.getState().viewChangeCounter;
        const skipTracking = action.skipTracking;

        action.payload.then(
            res => {
                const currentState = store.getState()
                if (!skipTracking && currentState.viewChangeCounter !== currentView){
                    return
                }
                console.log('RESULT', res);
                action.payload = res;
                store.dispatch({ type: ASYNC_END, promise: action.payload });
                store.dispatch(action);
            },
            error => {
                const currentState = store.getState()
                if (!skipTracking && currentState.viewChangeCounter !== currentView){
                    return
                }
                console.log('ERROR', error);
                action.error = true;
                action.payload = error.response.body;
                //action.payload = error.response;
                if (!action.skipTracking) {
                    store.dispatch({ type: ASYNC_END, promise: action.payload });
                }
                store.dispatch(action);
            }
        );
        return;
    }

    next(action);
};

const localStorageMiddleware = store => next => action => {
    if (action.type === REGISTER || action.type === LOGIN){
        if(!action.error){
            window.localStorage.setItem('jwt', action.payload.user.token);
            agent.setToken(action.payload.user.token);
        }
    } else if (action.type === LOGOUT){
        window.localStorage.setItem('jwt', '');
        agent.setToken(null);
    } else if (action.type === FIRST_PROGRAMMING_LANGUAGE_CHANGED){
        window.localStorage.setItem('firstpl', action.firstpl);
    } else if (action.type === SECOND_PROGRAMMING_LANGUAGE_CHANGED){
        window.localStorage.setItem('secondpl', action.secondpl);
    }
    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';    
}

export { promiseMiddleware, localStorageMiddleware }