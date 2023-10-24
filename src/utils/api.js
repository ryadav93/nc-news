import axios from "axios";

export const newsApi = axios.create({baseURL: "https://rashis-nc-news.onrender.com/api"})

export const getArticles = (topic) => {
    return newsApi.get('/articles', {params: {topic: topic}}).then((response)=>{
        return response.data.articles
    }).catch((err)=> {
        console.log(err)
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

export const getTopics = () => {
    return newsApi.get("/topics"). then((response)=> {
        return response.data.topics
    })
}
