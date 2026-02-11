export default function FirstMeet(props){
    return(
        <div
             style={
                    { 
                        maxWidth: "100%",
                        overflowX: "hidden"
                    }
            }
        >
            <p className="romantic-text">
                What is the memory of when U first met<br/>
                When?Where?How?What did U notice first?
            </p>
            <textarea
                className="writeLetter-textarea"
                placeholder="write here..."
                name="firstImpression"
                value={props.inputValue || ""}
                onChange={props.handleChange}
            />
            <div
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
                <button className="writeLetter-next" onClick={props.onPlus} >
                    Done<br/>
                    Next
                </button>
            </div>
        </div>
    )
}