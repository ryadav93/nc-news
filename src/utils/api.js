import axios from "axios";

export const newsApi = axios.create({baseURL: "https://rashis-nc-news.onrender.com/api"})

export const getArticles = (topic) => {
    return newsApi.get('/articles', {params:  { topic }}).then((response)=>{
        return response.data.articles
    }).catch((err)=> {
        
    })
}

export const getArticlesById = (article_id) => {
    return newsApi.get(`/articles/${article_id}`).then((response)=> {
        return response.data.article
    }).catch((err)=> {
       
    })
}

export const getUsers = () => {
    return newsApi.get('/users').then((response)=> {
        return response.data.users
    }).catch((err)=> {
       
    })
}

export const patchVotes = (article_id, value) => {
    return newsApi.patch(`/articles/${article_id}`, { inc_votes: value }).then((response)=> {
        return response.data.article
    }).catch((err)=> {
       
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
       
    })
}

export const deleteComment = (comment_id) => {

    return newsApi.delete(`/comments/${comment_id}`).then((response)=> {
        return response.data.comment

    }).catch((err)=> {

    })
}

export const getTopics = () => {
    return newsApi.get("/topics"). then((response)=> {
        return response.data.topics
    }).catch((err)=> {
       
    })
}
