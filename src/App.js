import { Link, Route, Routes } from 'react-router-dom';
import MainRoute from './routes';
import GlobalStyle from './components/GlobalStyle';

function App() {
    return (
        <div className="App">
            <GlobalStyle>
                <Routes>
                    {MainRoute.map((route, index) => {
                        return <Route path={route.path} element={route.element} key={index}></Route>;
                    })}
                </Routes>
            </GlobalStyle>
        </div>
    );
}

export default App;
