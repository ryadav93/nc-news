import { useEffect, useState } from "react"
import { getArticles } from "../utils/api"


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
                    <img src={article_img_url} alt={`img of ${title}`} />
                    <h3>{title}</h3>
                    <p>{author}</p>
                    <p>{topic}</p>
                    <p>{votes}</p>
                    <p>{created_at}</p>
                    <p>{comment_count}</p>
                </li>
            })}
        </ul>
    </main> 
)

}

export default Articles