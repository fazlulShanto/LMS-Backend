const todoModel= require('./api/db/Model/todoModel');
const {connectDb} = require('./api/db/db');
console.clear();
connectDb();



// const nak = new todoModel({
//     id:'4',
//     list:[1,3,54]
// })

// nak.save().then(res=>{
//     console.log(res)
// }).catch(er => console.log(er))

// todoModel.find({})
// .then(res =>{
//     console.log(res)
// })
// .catch(er => console.log(er));

async function findUserTodo(userId){
    let rt = [];
    rt = await todoModel.find({id:userId});
    return rt;
}

 (async ()=>{
    let k=await findUserTodo('24');
    console.log(k)
    return;

})();



// console.log(lmfao)
