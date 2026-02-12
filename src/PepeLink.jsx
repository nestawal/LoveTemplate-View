import { useLocation } from "react-router-dom"

export default function PepeLink(){
    const location = useLocation();
    const linkId = location.state?.linkId  || "no link Id "
    console.log("this is the link id",linkId)
    //write url for frontend when deployed : const url = ""
    return(
        <div>
            <div>
                <h2>This is the link<br/>Share it with<br/>Your Mpendwa</h2>
                <p>https://andikapepe.netlify.app/pepe/{linkId}</p>
            </div>
        </div>
    )
}