import { useEffect, useState } from "react"
import { getArticles } from "../utils/api"
import { Link } from "react-router-dom"
import moment from "moment";


const Articles = () => {
    const [articles, setArticles] = useState([])


useEffect(()=> {
    getArticles().then((fetchedArticles)=> setArticles(fetchedArticles))
}, [])


return (
    <main className="articles">
        <h2>Articles</h2>
        <ul className="article-list">
            {articles.map(({ author, article_id, title, topic, votes, created_at, article_img_url, comment_count })=> {
               return  <li className="article-card" key={article_id}>
                <Link to={`/articles/${article_id}`}>
                    <h3>{title}</h3>
                    </Link>
                    <p>User: {author}</p>
                    <p>Topic: {topic}</p>
                    <img src={article_img_url} alt={`img of ${title}`} />
                    <p>Votes: {votes}</p>
                    <p>Date: {moment(created_at).utc().format('YYYY-MM-DD')}</p>
                    <p>Comments:{comment_count}</p>
                </li>
            })}
        </ul>
    </main> 
)

}
moment("2021-07-14T00:00:00.000Z").utc().format('YYYY-MM-DD')
export default Articles