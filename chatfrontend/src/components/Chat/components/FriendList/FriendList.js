import React,{useState, Fragment} from "react"
import {useSelector,useDispatch} from 'react-redux'
import Friend from '../Friend/Friend'
import {setCurrentChat} from '../../../../store/actions/chat'
import Modal from '../../../Modal/Modal';
import chatServices from '../../../../services/chatServices'

import './FriendList.scss';


const FriendList = () =>{

   const dispatch = useDispatch()
    const chats = useSelector(state => state.chatReducer.chats) 
    const socket = useSelector(state => state.chatReducer.socket) 

    const [showFriendModal,setShowFriendModal] = useState(false)
    const [sugestions,setSugestions] = useState([])


   const openChat = (chat) =>{
        dispatch(setCurrentChat(chat))
   }

   const searchFriends = (e) =>{
        //Chat services
        chatServices.searchUsers(e.target.value)
        .then(res => setSugestions(res))
        .catch(err => {throw err})
   }

   const addNewFriends = (id) =>{
        chatServices.createChat(id)
        .then(chats =>{
            socket.emit('add-friend',chats)
            setShowFriendModal(false)
        }).catch(err => console.log(err))
   }

    return (
        <div id="friends" className='shadow-light'>
            <div id="title">
                <h3 className='m-0'>Friends</h3>
                <button onClick={()=>setShowFriendModal(true)}>Add</button>
            </div>

            <hr/>
            <div id="friends-box">
                {
                    chats.length > 0 
                    ? chats.map(chat =>{
                        return <Friend click={()=>openChat(chat)} chat={chat} key={chat.id}/>
                    })
                    :<p id="no-chat">No friends added</p>
                }
            </div>
            {
                showFriendModal &&
                <Modal click={()=>setShowFriendModal(false)}>
                    <Fragment key='header'>
                        <h3 className='m-0'>Create new chat</h3>
                    </Fragment>
                    <Fragment key='body'>
                        <p>Find friends by typing theyr name below</p>
                        <input 
                            onInput = {e => searchFriends(e)}
                            type='text'
                            placeholder='Search...'
                        />
                        <div id='suggestions'>
                            {
                                sugestions.map(user =>{
                                    return <div key={user.id} className='suggestion'>
                                        <p className='m-0'>{user.firstName} {user.lastName}</p>
                                        <button onClick={()=>addNewFriends(user.id)}>Add</button>
                                    </div>
                                })
                            }
                        </div>
                    </Fragment>
                </Modal>
            }
        </div>
    )
}


export default FriendList