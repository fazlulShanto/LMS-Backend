const todoModel = require('../../db/Model/todoModel');
function initiateUserTodo(req,res){
    const {id} = req.params;
    let rtd;
    const ntd = new todoModel({
        id:id,
        list:[]
    });
    ntd.save().catch(d=>{
        if(d){
            rtd=0;
        }
    })

    res.send('done');

}
async function addTodo(req,res){
    // console.log(req.params,req.query)
    const {id} = req.params;
    const {text} = req.query;
   const pd = await todoModel.findOneAndUpdate({id:id},
        {
            $push:{list : {tid:Date.now().toString(32) , text : text} }
        },
        {
            upsert:true,
            new:true
        }
        );
        // console.log(pd)
        if(pd){
          return  res.status(200);
        }
       return res.status(500).send('not Done')
}

function editTodo(req,res){
    const {id} = req.params;
    const {tid,text} = req.query;
    let d = 3;
    todoModel.findOne({
        id
    },(er,result)=>{
        if(result?.list){

            // console.log(result.list)
             result.list.map((v)=>{
                // console.log(v.tid , v.tid==tid)
              if(v.tid == tid ){
                v.text = text;
              }
            })
            todoModel.updateOne({id},{list : result.list},(er , rs)=>{
                if(er){
                    d = 3;
                }
                if(rs.acknowledged){
                    res.send("done")
                }
            })
        }
    })
    // res.send("eidt todo");
}

function deleteTodo(req,res){
    const {id} = req.params;
    const {tid} = req.query;
    let d = 3;
    todoModel.findOne({
        id
    },(er,result)=>{
        if(result?.list){

            // console.log(result.list)
            result.list = result.list.filter((v)=>{
              return  v.tid != tid
            })
            todoModel.updateOne({id},{list : result.list},(er , rs)=>{
                if(er){
                    d = 3;
                }
                if(rs.acknowledged){
                    res.send("done")
                }
            })
        }
    })
// res.send(`delete ${tid}`)

}

function getTodo(req,res){

    const userId = req.path.split('/').pop();
    todoModel.findOne({id:userId},(err,result)=>{
        let rt = [];
        // console.log(`Get Request : \n userId :${userId} result : ${result}`)
        if(result){
            rt = result.list;
        }
        res.send(rt);
    });
}

module.exports = {
    addTodo,
    editTodo,
    deleteTodo,
    getTodo,
    initiateUserTodo
}
