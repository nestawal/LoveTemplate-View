export default function TenThings(props){
    

    return(
        <div className="tenThings-container">
            <div className="tenThings-content">
                <h2 className="tenThings-title">Ten things U like<br/> about them</h2>
                
                <div className="tenThings-grid">
                    {props.things.map((thing, index) => (
                        <textarea
                            key={index}
                            className="tenthings-textarea"
                            placeholder={`${index + 1}`}
                            value={thing}
                            onChange={(e) => {
                                console.log(`Textarea ${index} changed:`, e.target.value);
                                if (props.handleChange) {
                                    props.handleChange(index, e.target.value);
                                }
                            }}
                        />
                    ))}
                </div>
                
                <div className="tenThings-buttons">
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
        </div>
    )
}