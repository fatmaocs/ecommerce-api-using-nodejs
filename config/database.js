const mongoose=require("mongoose");

const dbConnection = ()=>{

    mongoose.connect(process.env.DB_URI)
    .then((con)=>{
        console.log(`database connected at :${con.connection.host}`);
    })
    // .catch((err)=>{
    //     console.error(`databsae error ${err}`);
    //     process.exit(1); 
    // });

}

module.exports = dbConnection;