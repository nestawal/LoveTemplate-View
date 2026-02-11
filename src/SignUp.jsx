import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

export default function SignUp(){
    const navigate = useNavigate();
   
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    function handleChange(e){
        setFormData(prev=>{
            return{
            ...prev,
            [e.target.name] : e.target.value 
            }
        })
    }
    console.log(formData)

    const handleClick = () =>{
        if(formData.password == formData.confirmPassword){
            navigate('/letter')
        }
    }

     return(
       <div className="signUpContainer">
            <h2>Create Account</h2> {/* Optional title */}
            
            <input 
                type="text" 
                className="signUp-text" 
                placeholder="Enter name e.g(Ian Dan)" 
                maxLength={50}
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            
            <input 
                type="email" /* Changed from text to email for better validation */
                className="signUp-text"
                placeholder="Enter email" 
                maxLength={50}
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            
            <input 
                type="password" 
                className="signUp-text" 
                placeholder="Enter password" 
                minLength={6}
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            
            <input 
                type="password" 
                className="signUp-text" 
                placeholder="Confirm password" 
                minLength={6}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            
            <button onClick={()=>handleClick()}>Sign Up</button>
            
            {/* Optional login link */}
            <div className="login-link">
                Already have an account? <a href="/login">Log in</a>
            </div>
        </div>
     )
}