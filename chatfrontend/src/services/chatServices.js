import API from './api';

const chatServices = {

    fetchChats: () =>{

       
        return API.get('/chats')
        .then(({ data })=>{
            return data
        })
        .catch((error) =>{
            throw error
        })
    },

    uploadImage: (data) =>{
        const headers = {
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        }
        
        return API.post('/chats/upload-image',data,headers)
        .then(({ data })=>{
            return data.url
        })
        .catch((error) =>{
            throw error
        })
    },
    paginateMessages:(id,page)=>{
        return API.get('/chats/paginate-messages',{
            params:{
               id,page 
            }
        })
        .then(({ data })=>{
            return data
        })
        .catch((error) =>{
            throw error
        })
    },

    searchUsers:(term) =>{
        return API.get('/users/search-users',{
            params:{
               term 
            }
        })
        .then(({ data })=>{
            return data
        })
        .catch((error) =>{
            throw error
        })
    },

    createChat:(partenerId)=>{
        return API.post('/chats/create',{partenerId})
        .then(({ data })=>{
            return data
        })
        .catch((error) =>{
            throw error
        })
    }
}

export default chatServices