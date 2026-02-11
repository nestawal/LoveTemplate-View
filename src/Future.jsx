export default function Future(props){
    return(
        <div
            style={
                    { 
                        maxWidth: "100%",
                        overflowX: "hidden"
                    }
            }
        >
            <label className="romantic-text">What do U want your future to look like:</label>
            <textarea 
                className="writeLetter-textarea"
                placeholder="write here..."
                name="future"
                value={props.inputValue || ""}
                onChange={props.handleChange}
            />
            <div 
                className="writeLetter-buttonarea" 
                style={
                    { 
                        display: 'flex',
                        gap: "5rem"
                        
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