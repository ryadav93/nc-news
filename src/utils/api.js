import axios from "axios";

export const newsApi = axios.create({baseURL: "https://rashis-nc-news.onrender.com/api"})

export const getArticles = (topic) => {
    return newsApi.get('/articles', {params:  { topic }}).then((response)=>{
        return response.data.articles
    })
}

export const getArticlesById = (article_id) => {
    return newsApi.get(`/articles/${article_id}`).then((response)=> {
        return response.data.article
    })
}

export const getUsers = () => {
    return newsApi.get('/users').then((response)=> {
        return response.data.users
    })
}

export const patchVotes = (article_id, value) => {
    return newsApi.patch(`/articles/${article_id}`, { inc_votes: value }).then((response)=> {
        return response.data.article
    })
    
}

export const getCommentsbyArticle = (article_id) => {
    return newsApi.get(`/articles/${article_id}/comments`).then((response) => {
        return response.data.comments
    })
}

export const postComment = (article_id, commentToPost) => { 

    return newsApi.post(`/articles/${article_id}/comments`, commentToPost).then((response)=> {    
        return response.data.comment
    })
}

export const deleteComment = (comment_id) => {

    return newsApi.delete(`/comments/${comment_id}`).then((response)=> {
        return response.data.comment

    })
}

export const getTopics = () => {
    return newsApi.get("/topics"). then((response)=> {
        return response.data.topics
    })
}
