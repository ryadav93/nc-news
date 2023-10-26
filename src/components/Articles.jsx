import { useEffect, useState } from "react"
import { getArticles } from "../utils/api"
import { Link, useParams, useSearchParams } from "react-router-dom"
import moment from "moment";


const Articles = () => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const topic = searchParams.get('topic')
    const [sort, setSort] = useState('');
    const [sortByDate, setSortByDate] = useState('newest')
    const [sortByVotes, setSortByVotes] = useState('')
    const [sortByComments, setSortByComments] = useState('')

useEffect(() => {
    searchParams.delete("order", "asc")
    searchParams.delete("order", "desc")
    searchParams.delete("date", "asc")
    searchParams.delete("date", "desc")
    searchParams.delete("comments", "asc")
    searchParams.delete("comments", "desc")

        if (sortByVotes === 'most votes') {
            setArticles((articles) => {
                return [...articles].sort((a,b) => {
                return b.votes - a.votes
                })
            })
            
            setSearchParams((searchParams) => {
                searchParams.delete('')
                searchParams.set("votes", "desc")
                return searchParams
            } )
        } else {
            setArticles((articles) => {
                return [...articles].sort((a,b) => {   
                return a.votes - b.votes
                })
            })
            setSearchParams((searchParams) => {
                searchParams.set("votes", "asc")
                return searchParams
            } )
        }
        
    }, [sortByVotes])

useEffect(() => {
    searchParams.delete("order", "asc")
    searchParams.delete("order", "desc")
    searchParams.delete("date", "asc")
    searchParams.delete("date", "desc")
    searchParams.delete("votes", "asc")
    searchParams.delete("votes", "desc")
        
    if (sortByComments === 'most comments') {
            setArticles((articles) => {
                return [...articles].sort((a,b) => {
                return b.comment_count - a.comment_count
                })
            })
            setSearchParams((searchParams) => {
                searchParams.set("comments", "desc")
                return searchParams
            } )
        } else {
            setArticles((articles) => {
                return [...articles].sort((a,b) => {   
                return a.comment_count - b.comment_count
                })
            })
            setSearchParams((searchParams) => {
                searchParams.set("comments", "asc")
                return searchParams
            } )
        }
    }, [sortByComments])


useEffect(() => {
    searchParams.delete("order", "asc")
    searchParams.delete("order", "desc")
    searchParams.delete("comments", "asc")
    searchParams.delete("comments", "desc")
    searchParams.delete("votes", "asc")
    searchParams.delete("votes", "desc")

    if (sortByDate === 'oldest') {
        setArticles((articles) => {
            return [...articles].sort((a,b) => {
            return a.created_at.localeCompare(b.created_at)
            })
        })
        setSearchParams((searchParams) => {
            searchParams.set("date", "asc")
            return searchParams
        } )
    } else {
        setArticles((articles) => {
            return [...articles].sort((a,b) => {
            return b.created_at.localeCompare(a.created_at)
            })
        })
        setSearchParams((searchParams) => {
            searchParams.set("date", "desc")
            return searchParams
        } )
    }
}, [sortByDate])

useEffect(() => {
    searchParams.delete("date", "asc")
    searchParams.delete("date", "desc")
    searchParams.delete("comments", "asc")
    searchParams.delete("comments", "desc")
    searchParams.delete("votes", "asc")
    searchParams.delete("votes", "desc")

      if (sort === 'a -> z') {
        setArticles((articles) => { 
            return [...articles].sort((a,b) => {
            return a.title.localeCompare(b.title);
        })});
        setSearchParams((searchParams) => {
            searchParams.set("order", "asc")
            return searchParams
        } )
      } else {
        setArticles((articles) => {
            return [...articles].sort((a, b) => {
            return b.title.localeCompare(a.title);
          });
        });
        setSearchParams((searchParams) => {
            searchParams.set("order", "desc")
            return searchParams
        } )
      }
    }, [sort]);
  
   
useEffect(()=> {
    setLoading(true)
    getArticles(topic).then((fetchedArticles)=> {
        setLoading(false)
        setError(false)
    setArticles(fetchedArticles)
    }).catch(()=> {
        setError(true)
    })
}, [topic])


return error ? <h2>Oh no...something's gone wrong</h2> 
    : loading ? (
        <h2>Loading...</h2> ) : (
            <div>
        <button onClick={() => setSort('a -> z')}>Asc (A-Z)</button>
        <button onClick={() => setSort('z -> a')}>Desc (Z-A)</button>
        <button onClick={() => setSortByVotes('most votes')}>Most popular</button>
        <button onClick={() => setSortByVotes('least votes')}>Least popular</button>
        <button onClick={() => setSortByComments('most comments')}>Most comments</button>
        <button onClick={() => setSortByComments('least comments')}>Least comments</button>
        <button onClick={() => setSortByDate('oldest')}>Oldest</button>
        <button onClick={() => setSortByDate('newest')}>Newest</button>
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
    </div>
)

}
moment("2021-07-14T00:00:00.000Z").utc().format('YYYY-MM-DD')
export default Articles