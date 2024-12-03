const express = require('express');
const router = express.Router();


let todos = [
    {id:1, title: '연애하기', done:false},
    {id:2, title: '금연하기', done:false},
    {id:3, title: '온천가기', done:false},
    {id:4, title: '24시간 자기',done:true}
]


router.get('/',(req,res)=>{
    console.log('전송완료')
    console.log(todos)
    res.json(todos)
});



router.post('/',(req,res)=>{
    const newId = todos[todos.length -1].id + 1
    const newTitle = req.body.title
    todos.push({id:newId, title:newTitle, done:false})
    console.log(`${newId}의 todo가 추가되었습니다.`)
    res.json(todos);
})

router.put('/:id',(req,res)=>{
    const {id} = req.params
     todos = todos.map(todo=> todo.id == id ? {...todo, ...req.body} : todo)
    // todos = todos.map(todo=> todo.id === id ? {id:id, title:todo.title, done:req.body.done} : todo)
    console.log('todo Done 업데이트 완료')
    res.end()
})

router.delete('/:id',(req,res)=>{
    const {id} = req.params
    todos = todos.filter(todo => todo.id != id)
    res.json(todos)
    console.log(todos)
})

router.put('/update/:id',(req,res)=>{
    const {id} = req.params
    todos = todos.map(todo=> todo.id == id ? {id:id, title:req.body.title, done:todo.done}:todo)
    res.json(todos)
})

module.exports = router



