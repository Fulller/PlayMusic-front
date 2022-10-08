import { useContext } from 'react';
import { GlobalContext } from '../../App';

function Home() {
    let [gobalState, dispatch] = useContext(GlobalContext);
    console.log(gobalState);
    return <h1>Home</h1>;
}
export default Home;
