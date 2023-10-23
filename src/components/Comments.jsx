import { useEffect, useState } from "react"
import { getCommentsbyArticle } from "../utils/api"
import { Link, useParams } from "react-router-dom"
import moment from "moment";

const Comments = () => {

    const { article_id } = useParams()
    const [comments, setComments] = useState([])

    useEffect(()=> {
        getCommentsbyArticle(article_id).then((comments)=> {
            setComments(comments)
        })
    }, [article_id])


    return (
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
    )


}


export default Comments