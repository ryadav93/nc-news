import { useEffect, useState } from "react"
import { getCommentsbyArticle, postComment } from "../utils/api"
import { Link, useParams } from "react-router-dom"
import moment from "moment";

const Comments = () => {

    const { article_id } = useParams()
    const [comments, setComments] = useState([])
    const [bodyInput, setBodyInput] = useState('')
    const [votesInput, setVotesInput] = useState(0)
    const [authorInput, setAuthorInput] = useState('')
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(null)

    useEffect(()=> {
        getCommentsbyArticle(article_id).then((comments)=> {
            setComments(comments)
            setError(false)
        }).catch(()=> {
            setError(true)

        })
    }, [article_id])

    const handleSubmit = (submitEvent) => {
        const newComment = {
            body: submitEvent.target[0].value,
            username: submitEvent.target[1].value
        }
        submitEvent.preventDefault();
        setMessage(null)
        postComment(article_id, newComment).then((response)=> {
            setComments((currentComments)=> {
                return [response, ...currentComments]
                
            })
            setError(false)
        }).then(()=> {
            setMessage('Comment submitted!')

        }).catch(()=> {
            setMessage('Comment not submitted')

        })
    } 
    
    return error ? <h2>Oh no...something's gone wrong</h2> : (
        <div className="comments">
         <h3>Leave a comment</h3>
            <form onSubmit={handleSubmit} method="post">
            {message && <div>{message}</div>}
                <input onChange={(e)=> setBodyInput(e.target.value)} value = {bodyInput} type={"text"} placeholder={"comment"}/>
                <input onChange={(e)=> setAuthorInput(e.target.value)} value = {authorInput} type={"text"} placeholder={"username (required)"}/>
                <button type="Submit">Click to Submit</button>
            </form>

       
        <ul className="comment-list">
            {comments.map(({ comment_id, body, votes, created_at, author })=> {
                return <li className='comment-card' key={comment_id}>
            <p>{body}</p>
            <p>Votes: {votes}</p>
            <p>Date: {moment(created_at).utc().format('YYYY-MM-DD')}</p>
            <p>User: {author}</p>
            </li>

            })}   
        </ul>
        </div>
    )


}


export default Comments