import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticlesById } from "../utils/api"
import Comments from "./Comments"
import Votes from "./Votes"
import moment from "moment";

const ArticleById = () => {
    const { article_id } = useParams()
    const [singleArticle, setSingleArticle] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getArticlesById(article_id).then((article)=> {
            setLoading(false)
            setError(null)
            setSingleArticle(article)
        }).catch((err)=> {
            console.log(err.response.data.msg)
            setError(err.response.data.msg)
        })
    }, [article_id])

    return error ? <h2>{error}</h2> 
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