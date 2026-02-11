import { useState } from "react";
import WriteIntro from "./WriteIntro";
import WriteLetter from "./WriteLetter";
import FirstMeet from "./FirstMeet";
import TenThings from "./tenThings";
import Future from "./Future";
import Questionnaire from "./Questionnaire";
import RomanticBook from "./RomanticBook";


export default function Letter(){
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