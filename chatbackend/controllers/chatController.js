const modules = require('../models');

const User = modules.User
const Chat = modules.Chat
const ChatUser = modules.ChatUser
const Message = modules.Message
const {Op} = require('sequelize');
const { sequelize } = require('../models');

exports.index = async(req,res) =>{
    const user = await User.findOne({
        where:{
            id:req.user.id
        },
        include:[
            {
                model:Chat,
                include:[
                    {
                        model:User,
                        where:{
                            [Op.not]:{
                                id:req.user.id
                            }
                        }

                    },
                    {
                        model:Message,
                        include:[
                            {
                                model:User
                            }
                        ],
                        limit:20,
                        order:[['id','DESC']]
                    }
                ]
            }
        ]
    })

    return res.json(user.Chats);
}

exports.create = async (req,res) =>{
    const {partenerId} = req.body;

    const t = await sequelize.transaction();

    try{

        const user = await User.findOne({
            where:{
                id:req.user.id
            },
            include:[
                {
                    model:Chat,
                    where:{
                        type: 'dual'
                    },
                    include:[
                        {
                            model:ChatUser,
                            where:{
                               userId:partenerId 
                            }
                        }
                    ]
                }
            ]
        })

        if(user && user.Chats.length > 0 ){
            return res.status(403).json({status:"Error",message:"Chat with this user already exists"});
        }

        const chat = await Chat.create({type: "dual" },{transaction: t});

        await ChatUser.bulkCreate([
            {
              chatId:chat.id,
              userId:req.user.id
            },
            {
              chatId:chat.id,
              userId:partenerId
            }
          ],{transaction:t});


          await t.commit()
          
        //   const chat_user = await Chat.findOne({
        //       where:{
        //           id:chat.id
        //       },
        //       include:[
        //             {
        //                 model:User,
        //                 where:{
        //                     [Op.not]:{
        //                         id:req.user.id
        //                     }
        //                 }

        //             },
        //             {
        //                 model:Message,
        //             }
        //       ]
        //     }) 

        //Find logged user 
        const creator = await User.findOne({
            where:{
                id:req.user.id
            }
        })

        //Find other users from search results 
        const partener = await User.findOne({
            where:{
                id:partenerId
            }
        })

        //
        const forCreator = {
            id:chat.id,
            type:'dual',
            Users:[partener],
            Message:[]

        }


        const forReciver = {
            id:chat.id,
            type:'dual',
            Users:[creator],
            Message:[]
        }

            return res.send([forCreator,forReciver])

    }catch (e){
        await t.rollBack();
        return res.status(500).json({status:"Error",Message:e.message})
    }
}


exports.messages = async (req,res) =>{
    const limit = 10
    const page = req.query.page || 1
    let offset = page > 1 ? page * limit : 0 

    const messages = await  Message.findAndCountAll({
        where:{
            chatId:req.query.id
        },
        include:[
            {
                model:User
            }
        ],
        limit,
        offset,
        order:[['id','DESC']]
    });

    const totalPages = Math.ceil(messages.count  / limit);

    if(page > totalPages) return res.json({data:{messages:[]} });

    const results = {
        messages:messages.rows,
        pagination:{
            page,
            totalPages
        }
    }

    return res.json(results)
} 


exports.imageUpload = async(req,res)=>{
    if(req.file){
        return res.json({url:req.file.filename})
    }
    return res.status(500).json('No image uploaded');
}


exports.deleteChat = async (req,res) =>{
    try{
        await Chat.destroy({
            where:{
               id:req.params.id 
            }
        });

        return res.json({status:success,message:"Chat was deleted successfully"})
    }catch(e){
        return res.status(500).json({status:"Error",Message:e.message})
    }
}