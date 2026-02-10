export default function SignUp(){
     return(
       <div className="signUpContainer">
            <h2>Create Account</h2> {/* Optional title */}
            
            <input 
                type="text" 
                className="signUp-text" 
                placeholder="Enter name e.g(Ian Dan)" 
                maxLength={50}
            />
            
            <input 
                type="email" /* Changed from text to email for better validation */
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
            
            <input 
                type="password" 
                className="signUp-text" 
                placeholder="Confirm password" 
                minLength={6}
            />
            
            <button>Sign Up</button>
            
            {/* Optional login link */}
            <div className="login-link">
                Already have an account? <a href="/login">Log in</a>
            </div>
        </div>
     )
}