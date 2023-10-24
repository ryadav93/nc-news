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

export const getCommentsbyArticle = (article_id) => {
    return newsApi.get(`/articles/${article_id}/comments`).then((response) => {
        return response.data.comments
    }).catch((err)=> {
       
    })
}

export const postComment = (article_id, commentToPost) => { 

    return newsApi.post(`/articles/${article_id}/comments`, commentToPost).then((response)=> {    
        return response.data.comment
    }).catch((err)=>{
       console.log(err)
    })
}
