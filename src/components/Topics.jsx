import { useEffect, useState } from "react"
import { getArticles, getTopics, newsApi } from "../utils/api"
import { useNavigate } from "react-router-dom"

const Topics = () => {

    const [topics, setTopics] = useState([])
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    

    const handleClick = (e) => {
        
        navigate(`/articles/?topic=${e.target.value}`)
        
    }


    useEffect(()=> {
        getTopics().then((fetchedTopics)=> {
            setError(null)
            setTopics(fetchedTopics)
        }).catch((err)=> {
            setError(err.response.data.msg)
        })
    }, [])

    return error ? <h2>Oh no, something's gone wrong!</h2> :(
        <main className="topics">
            <h2>Topics</h2>
            <ul className="topic-name">
                {
                
                topics.map(({slug})=> 
                <li key={slug}>
                    <button value = {slug} onClick={(e)=> {
                        handleClick(e)
                    }}>{slug}</button>
                </li>
                )}
            </ul>
        </main>
    )

}

export default Topics