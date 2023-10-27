import { useEffect, useState, useContext } from "react"
import { getCommentsbyArticle, postComment, deleteComment } from "../utils/api"
import { useParams } from "react-router-dom"
import moment from "moment";
import { UserContext } from "../contexts/Theme.jsx";



const Comments = () => {

    const {user} = useContext(UserContext);
    const { article_id } = useParams()
    const [comments, setComments] = useState([])
    const [bodyInput, setBodyInput] = useState('')
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

    const handleDelete = (comment_id, author) => {

        if(user!==author){
            setMessage('You cannot delete this comment')
        } else {
        
        deleteComment(comment_id).then(() => {
            setMessage('comment deleted')
        }).then(()=> {
            return getCommentsbyArticle(article_id)

        }).then((body)=> {
            setComments(() => {
                return body
            })


        }).catch(()=> {
            setMessage('comment not deleted, please try again!')
        })
        }

    }

    const handleSubmit = (submitEvent) => {
        const newComment = {
            body: submitEvent.target[0].value,
            username: submitEvent.target[1].value
        }
        
        submitEvent.preventDefault();
        setMessage(null)

        if(bodyInput.length === 0){
            return submitEvent.preventDefault();
            
          } else {
            if (authorInput.length === 0) {
            return submitEvent.preventDefault();
            }
          }
          if(user!==newComment.username){
            setMessage('You are not logged in as this user')
        } else {
            
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

        setAuthorInput('')
        setBodyInput('')
        
        }
    
    } 
    
    return error ? <h2>Oh no...something's gone wrong</h2> : (
        <div className="comments">
         <h3>Leave a comment</h3>
            <form onSubmit={handleSubmit} method="post">
                <input onChange={(e)=> setBodyInput(e.target.value)} value = {bodyInput} type={"text"} placeholder={"comment"}/>
                <input onChange={(e)=> setAuthorInput(e.target.value)} value = {authorInput} type={"text"} placeholder={"username (required)"}/>
                <button onClick={()=> {
                    setBodyInput(e.target.value)
                    setAuthorInput(e.target.value)
                    setAuthorInput('')
                    setBodyInput('')
                }} type="Submit">Click to Submit</button>
                {message && <div>{message}</div>}
                {bodyInput.length === 0 ? <p> username or comment empty </p> : null}
            </form>

       
        <ul className="comment-list">
            {comments.map(({ comment_id, body, votes, created_at, author })=> {
                return <li className='comment-card' key={comment_id}>
            <p>{body}</p>
            <p>Votes: {votes}</p>
            <p>Date: {moment(created_at).utc().format('YYYY-MM-DD')}</p>
            <p>User: {author}</p>
            <button onClick={()=> {handleDelete(comment_id, author)}} type="delete">Delete</button>
            </li>

            })}   
        </ul>
        </div>
    )


}


export default Comments