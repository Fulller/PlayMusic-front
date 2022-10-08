import { useReducer, createContext } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import MainRoute from './routes';
import GlobalStyle from './components/GlobalStyle';
import getLocalStorage from './tools/getLocalStorage';
import setLocalStorage from './tools/setLocalStorage';

let GlobalContext = createContext();
let initGlobalState = {
    user: getLocalStorage('userpm'),
    currentAudio: getLocalStorage('craudio'),
    Audios: [],
    isLogin: getLocalStorage('loginpm'),
};
function globalReducer(state, [action, data]) {
    switch (action) {
        case 'currentAudio': {
            return {
                ...state,
                currentAudio: data,
            };
        }
        default:
            console.log('Wrong action');
    }
}

function App() {
    let [globalState, dispatch] = useReducer(globalReducer, initGlobalState);
    return (
        <div className="App">
            <GlobalContext.Provider value={[globalState, dispatch]}>
                <GlobalStyle>
                    <Routes>
                        {MainRoute.map((route, index) => {
                            return <Route path={route.path} element={route.element} key={index}></Route>;
                        })}
                    </Routes>
                </GlobalStyle>
            </GlobalContext.Provider>
        </div>
    );
}
export { GlobalContext };
export default App;
