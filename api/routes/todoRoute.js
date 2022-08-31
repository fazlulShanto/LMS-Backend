const Express = require('express');
const router  = Express.Router();
const {addTodo,editTodo,deleteTodo,getTodo,initiateUserTodo}  =require('../controller/todo/todoController');

router.get('/',(req,res)=>{
    // res.statusCode =400;
    res.status(404).send('ToDo Home');
    
})

router.get('/get/:id',(req,res)=>{
    getTodo(req,res);
});
router.post('/add/:id',(req,res)=>{
    addTodo(req,res);
});
router.put('/edit/:id',(req,res)=>{
    editTodo(req,res);
});
router.delete('/delete/:id',(req,res)=>{
    deleteTodo(req,res);
});
router.post('/init/:id',(req,res)=>{
    initiateUserTodo(req,res);
});
module.exports = router;