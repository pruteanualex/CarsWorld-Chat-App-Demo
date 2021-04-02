import React from "react"
import { useSelector , useDispatch} from "react-redux"
import useSocket  from './hooks/socketConnect'
import Navbar from './components/Navbar/Navbar';
import FriendList from '../Chat/components/FriendList/FriendList';
import Messager from '../Chat/components/Messager/Messager';
import './Chat.scss';
const Chat = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.user);

    useSocket(user,dispatch)

   

    return (
        <div id="chat-container">
             <Navbar/>
             <div id="chat-wrap">
                <FriendList/>
                <Messager/>
             </div>
        </div>
       
    );
}

export default Chat