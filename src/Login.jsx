import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Login (){
    const navigate = useNavigate()

    const [formData,setFormData] = useState({
        email:"",
        password:""
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
        navigate('/letter')
    }

    return(
        <div className="signUpContainer">
            <h2>Login</h2> 
            
            <input 
                type="email" 
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
    
            <button onClick={handleClick}>Login</button>
            
        </div>
    )
}