import axios from "axios";

export const newsApi = axios.create({baseURL: "https://rashis-nc-news.onrender.com/api"})

export const getArticles = () => {
    return newsApi.get('/articles').then((response)=>{
        return response.data.articles
    })
}

export const getArticlesById = (article_id) => {
    return newsApi.get(`/articles/${article_id}`).then((response)=> {
        return response.data.article
    })
}