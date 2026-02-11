import{BrowserRouter as Router,Routes,Route} from "react-router-dom";
import App from "./App";
import SignUp from "./SignUp";
import Login from "./Login";
import Letter from "./Letter";

export default function ARoutes(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<App/>} />
                <Route path='/signUp' element={<SignUp/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/letter' element={<Letter/>} />
            </Routes>
        </Router>
    )
}