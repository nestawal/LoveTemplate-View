export default function Login (){
    return(
        <div className="signUpContainer">
            <h2>Login</h2> 
            
            <input 
                type="email" 
                className="signUp-text"
                placeholder="Enter email" 
                maxLength={50}
            />
            
            <input 
                type="password" 
                className="signUp-text" 
                placeholder="Enter password" 
                minLength={6}
            />
    
            <button>Login</button>
            
        </div>
    )
}