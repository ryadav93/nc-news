import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticlesById, getCommentsbyArticle } from "../utils/api"
import Comments from "./Comments"
import moment from "moment";

const ArticleById = () => {
    const { article_id } = useParams()
    const [singleArticle, setSingleArticle] = useState({})
    const [allComments, setAllComments] = useState({})

    useEffect(() => {
        getArticlesById(article_id).then((article)=> {
            setSingleArticle(article)
        })
    }, [article_id])
    
    return (
        <div>
            <section className="article-by-id">
            <h2>{singleArticle.title}</h2>
            <p>{singleArticle.author}</p>
            <p>{singleArticle.topic}</p>
            <img src={singleArticle.article_img_url} alt={`img of ${singleArticle.title}`} />
            <p>Votes: {singleArticle.votes}</p>
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