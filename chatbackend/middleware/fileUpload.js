const multer = require('multer');
const fs = require('fs');
const path = require('path');



const generateFileName = (req,file,cb) => {
    const extension = file.mimetype.split('/')[1];

    const fileName = Date.now() + '_' + Math.round(Math.random() * 1E9) + '_' + '.'+extension;
    
    cb(null,file.fieldname + '_' + fileName);

    

}

//Filter image type 
const fileFilter = (req,file,cb)=>{
    const extension = file.mimetype.split('/')[1];

    const allowedTypes = /jpeg|jpg|png/

    const passed = allowedTypes.test(extension);

    if(passed){
        return cb(null,true)

    }

    return cb(null,false);
}



exports.userFile = ((req,res,next)=>{

    const storage = multer.diskStorage({

        //Destination to folder where all file will be save
        destination:function(req,file,cb){
            const {id} = req.user;
            const dest = `uploads/user/${id}`;

            //Create folder for each user using fileSystem node js 
            fs.access(dest,(error)=>{
                
                //This folder dosentéxists
                if(error){
                    return fs.mkdir(dest,(error)=>{
                        cb(error,dest);
                    })
                }else{
                    //It dose exists
                    fs.readdir(dest,(error,files)=>{
                        if(error) throw error;

                        for(const file of files){
                            fs.unlink(path.join(dest,file), error =>{
                                if(error) throw error;
                            })
                        }
                    })

                    return cb(null,dest);
                }
            })


        },
        filename:generateFileName
    });

    return multer({storage, fileFilter}).single('avatar')

})();


exports.chatFile = ((req,res,next) =>{


    const storage = multer.diskStorage({

        //Destination to folder where all file will be save
        destination:function(req,file,cb){
            const {id} = req.body;
            const dest = `uploads/chat/${id}`;

            //Create folder for each user using fileSystem node js 
            fs.access(dest,(error)=>{
                
                //This folder dosentéxists
                if(error){
                    return fs.mkdir(dest,(error)=>{
                        cb(error,dest);
                    })
                }else{
                    return cb(null,dest);
                }
            })


        },
        filename:generateFileName
    });

    return multer({storage, fileFilter}).single('image')


})();