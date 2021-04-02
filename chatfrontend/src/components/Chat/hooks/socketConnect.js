import {useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import {fetchChats,onlineFriends,onlineFriend,offlineFriends,setSocket,recivedMessage,senderTyping,createChat} from '../../../store/actions/chat'

function useSocket (user,dispatch){
    
    useEffect(()=>{

        dispatch(fetchChats())
            .then(res => {

            const socket = socketIOClient.connect('http://127.0.0.1:4000',{
                transports: [ 'websocket' ],
                upgrade: false
            })

                dispatch(setSocket(socket))

                socket.emit('join',user)

                socket.on('typing', (sender) =>{
                    //Dispatch a new action
                    dispatch(senderTyping(sender))
                    console.log(sender)
                })

                socket.on('friends', (friends) =>{
                    console.log("Friends",friends)
                    dispatch(onlineFriends(friends))
                })

                socket.on('online', (user) =>{
                    console.log("Online",user)
                    dispatch(onlineFriend(user))
                })

                socket.on('offline', (user) =>{
                    console.log("Offline",user)
                    dispatch(offlineFriends(user))
                })

                socket.on('recived',(message)=>{
                    dispatch(recivedMessage(message,user.id))
                })


                socket.on('new-chat',(chat)=>{
                   dispatch(createChat(chat))
                })

            console.log(res)
        }).catch(error =>{ throw error})

    },[dispatch])
}

export default useSocket