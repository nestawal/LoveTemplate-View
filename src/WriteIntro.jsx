export default function WriteIntro(props) {
  return (
    <div className="WriteIntro">
      
      <div className="background-hearts"></div>
      
      
      <div className="center-container">
        <p className="romantic-text">
          Hello,<br/>
          Write a letter to your mpendwa<br/>
          make it short and memorable<br/>
          and remember you can only do it once
        </p>
        <button className="romantic-button" onClick={props.onPlus}>Let's go</button>
      </div>
    </div>
  );
}