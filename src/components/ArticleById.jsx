import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticlesById } from "../utils/api"

const ArticleById = () => {
    const { article_id } = useParams()
    const [singleArticle, setSingleArticle] = useState({})

    useEffect(() => {
        getArticlesById(article_id).then((article)=> {
            setSingleArticle(article)
        })
    }, [article_id])

    return (
        <section>
            <h2>{singleArticle.title}</h2>
            <p>{singleArticle.author}</p>
            <p>{singleArticle.topic}</p>
            <img src={singleArticle.article_img_url} alt={`img of ${singleArticle.title}`} />
            <p>Votes: {singleArticle.votes}</p>
            <p>Created: {singleArticle.created_at}</p>
            <p>Comment count:{singleArticle.comment_count}</p>
        </section>
    )







}

export default ArticleById