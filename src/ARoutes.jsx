import{BrowserRouter as Router,Routes,Route} from "react-router-dom";
import App from "./App";
import SignUp from "./SignUp";
import Login from "./Login";
import Letter from "./Letter";
import LetterStatus from "./LetterStatus";
import PepeLink from "./PepeLink";
import ViewLetter from "./ViewLetter";

export default function ARoutes(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<App/>} />
                <Route path='/signUp' element={<SignUp/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/letter' element={<Letter/>} />
                <Route path='/status' element={<LetterStatus/>} />
                <Route path='/link' element={<PepeLink/>} />
                <Route path='/pepe/:letterId' element={<ViewLetter/>} />
            </Routes>
        </Router>
    )
}