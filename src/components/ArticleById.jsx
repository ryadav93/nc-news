import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticlesById } from "../utils/api"
import Comments from "./Comments"
import Votes from "./Votes"
import moment from "moment";

const ArticleById = () => {
    const { article_id } = useParams()
    const [singleArticle, setSingleArticle] = useState({})
    const [allComments, setAllComments] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        getArticlesById(article_id).then((article)=> {
            setLoading(false)
            setError(false)
            setSingleArticle(article)
        }).catch(()=> {
            setError(true)
        })
    }, [article_id])

    return error ? <h2>Oh no...something's gone wrong</h2> 
    : loading ? (
        <h2>Loading...</h2> ) : (
        <div>
            <section className="article-by-id">
            <h2>{singleArticle.title}</h2>
            <p>{singleArticle.author}</p>
            <p>{singleArticle.topic}</p>
            <img src={singleArticle.article_img_url} alt={`img of ${singleArticle.title}`} />
            <Votes type ={'Votes'} votes={singleArticle.votes} article_id={article_id}/>
            <p>Date: {moment(singleArticle.created_at).utc().format('YYYY-MM-DD')}</p>
            <p>Comments:{singleArticle.comment_count}</p>
            </section>
            <section className="comments">
                <Comments/>
            </section>
        </div>

    )







}

export default ArticleById