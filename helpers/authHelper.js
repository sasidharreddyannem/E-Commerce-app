import bcrypt from 'bcrypt'

export const hashPassword = async(passowrd)=>{
    try{
        
        const hashedPassword=await bcrypt.hash(passowrd,10);
        return hashedPassword;
    }catch(err){
        console.log(err);
    }
}


export const comparePassword=async(passowrd,hashedPassword)=>{
    try{
          const compared=bcrypt.compare(passowrd,hashedPassword);
          return compared;
    }catch(Err){
        console.log(Err);
    }
}


