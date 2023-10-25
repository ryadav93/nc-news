import { useState } from "react"
import { patchVotes } from "../utils/api"

const Votes = ({ type, votes, article_id }) => {
    const [userVotes, setUserVotes] = useState(0)

    const updateVotes = (value) => {
        setUserVotes((currentVotes) => {
            return currentVotes + value 
        })
        patchVotes(article_id, value).catch((err)=> {
            console.log(err)
            setUserVotes(0)
        })
        
    }

    return (
        <div className="vote-btn">
            <p>{type}: {votes + userVotes} </p>
            <button className="like-btn" disabled={userVotes===1} onClick={()=> {
                updateVotes(1)
            }}>+</button>
            <button className="dislike-btn" disabled={userVotes===-1} onClick={()=> {
                updateVotes(-1)
            }}>-</button>
        </div>
    )

}

export default Votes