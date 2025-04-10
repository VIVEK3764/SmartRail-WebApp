
async function traininformation(req,res){

    const { searchtype }=req.body;
    
    try {
         

        if(searchtype=="location"){
            const { From, To ,Date} = req.body;


        }

        else if(searchtype="number"){
            const { Number, Date} = req.body;
        }

        else{
            const { Name, Date} = req.body;
        }

    }


    catch(err){
        console.error("Error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}


module.exports={
    traininformation
}