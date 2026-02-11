export default function WriteLetter(props){
    return(
        <div>
            <label className="romantic-text">Write a letter to them:</label>
            <textarea 
                className="writeLetter-textarea"
                placeholder="write here..."
                name="letter"
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
                <button className="writeLetter-next" onClick={props.onPlus}>
                    Done<br/>
                    Next
                </button>
            </div>
        </div>
    )
}