import{BrowserRouter as Router,Routes,Route} from "react-router-dom";
import App from "./App";
import SignUp from "./SignUp";
import Login from "./Login";

export default function ARoutes(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<App/>} />
                <Route path='/signUp' element={<SignUp/>} />
                <Route path='/login' element={<Login/>} />
            </Routes>
        </Router>
    )
}