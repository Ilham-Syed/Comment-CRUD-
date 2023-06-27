const express=require('express');
const path=require('path');
const { v4: uuid } = require('uuid');
const methodOverrided=require('method-override');
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(methodOverrided('_method'));
app.set('view engine','ejs');

app.set('views',path.join(__dirname,'/views'));

let comments=[
    {
        id:uuid(),
        name:'alex',
        comment:'hello my name is alex'
    },
    {
        id:uuid(),
        name:'preet',
        comment:'loolololol'
    },
    {
        id:uuid(),
        name:'amit',
        comment:'Its raining here'
    },
    {
        id:uuid(),
        name:'rishi',
        comment:'gym jaao body banao, gym jaao body banao'
    }
];

app.get('/comments',(req,res)=>{
    console.log('recieved get request on port 3000');
    res.render('comments/index', {comments});
})

app.get('/comments/new',(req,res)=>{
    res.render('comments/new')
})

app.get('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const comment=comments.find(c=>c.id===id);
    res.render('comments/show',{comment});
})

app.get('/comments/:id/edit',(req,res)=>{
    const {id}=req.params;
    const comment=comments.find(c=>c.id===id);
    res.render('comments/edit',{comment});
})

app.post('/comments',(req,res)=>{
    console.log(req.body);
    const {username:name,comment}=req.body;
    const id=uuid();
    comments.push({id,name,comment})
    res.redirect('/comments');
})

app.patch('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const newCommentText=req.body.comment;
    const foundComment=comments.find(c=>c.id===id);
    foundComment.comment=newCommentText;
    res.redirect('/comments');
}) 

app.delete('/comments/:id',(req,res)=>{
    const {id}=req.params;
    comments=comments.filter(c=>c.id !== id);
    res.redirect('/comments');
})

app.listen(3000,()=>{
    console.log("Listening on port 3000");
})