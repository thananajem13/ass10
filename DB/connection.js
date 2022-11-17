
import  mongoose from 'mongoose'


const connectDB  = async()=>{
    return  await mongoose.connect(process.env.DBURI)
    .then(res=>{
        console.log(`connected DB Successfully on port ........ ${process.env.DBURI}`);
    })
    .catch(err=>{
        console.log(`Fail connected DB  on port ........ ${err}`);
    })
}


export default connectDB