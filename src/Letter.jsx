import { useState } from "react";
import {useNavigate,useLocation} from "react-router-dom";
import WriteIntro from "./WriteIntro";
import WriteLetter from "./WriteLetter";
import FirstMeet from "./FirstMeet";
import TenThings from "./tenThings";
import Future from "./Future";
import Questionnaire from "./Questionnaire";
import RomanticBook from "./RomanticBook";
import axios from "axios";



export default function Letter(){
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.user  || "no user Id ";
    console.log("this is the user id ",userId)
    console.log("This is letter page")
    const [letterContent,setLetterContent] = useState({
        letter : "",
        firstImpression : "",
        tenThings: Array(10).fill(""),
        future: "",
        questionnaire: ""
    })

    function handleChange(e){
        setLetterContent(prev=>{
            return{
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }

    function handleThingChange(index, value) {
        setLetterContent(prev => {
            const updatedThings = [...prev.tenThings];
            updatedThings[index] = value;
            return {
                ...prev,
                tenThings: updatedThings
            };
        });
    }

    const url = 'https://andika-backend.onrender.com'

    const submitLetter =(e)=>{
        e.preventDefault();
        axios.post(`${url}/pepe/newPepe`,{
            letterId : userId,
            letter : letterContent.letter,
            firstImpression : letterContent.firstImpression,
            tenThings : letterContent.tenThings,
            future : letterContent.future,
            questionnaire : letterContent.questionnaire
        })
        .then(result=>{console.log(result)
            navigate("/link",{state: {linkId : userId}})
        })
        .catch(error=>console.log(error))
    }

    const [pageNo,setPageNo] = useState(1);

    const onPlus = () => {
        setPageNo(prev => prev + 1);
    }
    const onMinus = () => {
        setPageNo(prev => prev - 1);
    }
    const page = (pageNo) =>{
        if(pageNo == 1 ){
            return (
                <WriteIntro
                onPlus = {onPlus}
                />
            )
        }
        else if(pageNo == 2 ){
            return(
                <WriteLetter
                    onMinus = {onMinus}
                    onPlus = {onPlus}
                    handleChange = {handleChange}
                    inputValue = {letterContent.letter}
                />
            )
        }
        else if(pageNo == 3){
            return(
                <FirstMeet
                    onMinus = {onMinus}
                    onPlus = {onPlus}
                    handleChange = {handleChange}
                    inputValue = {letterContent.firstImpression}
                />
            )
        }
        else if(pageNo == 4){
            return(
                <TenThings
                    onMinus = {onMinus}
                    onPlus = {onPlus}
                    handleChange = {handleThingChange}
                    things = {letterContent.tenThings}
                />
            )
        }
        else if(pageNo == 5){
            return(
                <Future
                    onMinus = {onMinus}
                    onPlus = {onPlus}
                    handleChange = {handleChange}
                    inputValue = {letterContent.future}

                />
            )
        }
        else if(pageNo == 6){
            return(
                <Questionnaire
                    onMinus = {onMinus}
                    onPlus = {onPlus}
                    handleChange = {handleChange}
                    inputValue = {letterContent.questionnaire}
                />
            )
        }
        else if(pageNo == 7){
            return(
                <RomanticBook
                    onMinus = {onMinus}
                    onPlus = {onPlus}
                    letterContent={letterContent}
                    sendLetter = {submitLetter}
                />
            )
        }
    }

    console.log(letterContent)

  return(
    <>
        {page(pageNo)}
    </>
  )
}