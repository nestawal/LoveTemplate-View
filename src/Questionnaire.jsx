export default function Questionnaire(props){
    return(
        <div
             style={
                    { 
                        maxWidth: "100%",
                        overflowX: "hidden",
                       
                    }
            }
        >
            <label className="romantic-text">Ask them a yes or no question</label>
            <textarea 
                className="writeLetter-textarea"
                placeholder="e.g will you be my valentine?"
                name="questionnaire"
                value={props.inputValue || ""}
                onChange={props.handleChange}
            />
            <div 
                className="writeLetter-buttonarea" 
                style={
                    { 
                        display: 'flex',
                        justifyContent: 'space-between'
                        
                    }
                }
            >
                <button className="writeLetter-goBack" onClick={props.onMinus}>
                    Go<br/>
                    back
                </button>
                <button className="writeLetter-next"  onClick={props.onPlus}>
                    Done<br/>
                    Next
                </button>
            </div>
        </div>
    )
}