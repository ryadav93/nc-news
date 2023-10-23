import { useState } from "react"

const Votes = ({ type, votes }) => {
    const [userVotes, setUserVotes] = useState(0)

    const updateVotes = (value) => {
        setUserVotes((currentVotes) => {
            return currentVotes + value 
        })
        
    }

    return (
        <div className="vote-btn">
            <p>{type}: {votes + userVotes} </p>
            <button disabled={userVotes===1} onClick={()=> {
                updateVotes(1)
            }}>+</button>
            <button disabled={userVotes===-1} onClick={()=> {
                updateVotes(-1)
            }}>-</button>
        </div>
    )

}

export default Votes