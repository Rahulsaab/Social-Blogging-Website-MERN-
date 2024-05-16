import multer from "multer"
const storage= multer.diskStorage({
    destination:function(req,res,cd){
      cd(null,"upload/")
    },
    filename:function(req,file,cd){
      cd(null,Date.now()+"_"+file.originalname)
    }
  })
  export const upload = multer({storage:storage})
  