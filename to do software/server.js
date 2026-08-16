const express = require("express");
const app = express();

app.use(express.json());
const users=[
  {
    "title": "100xDevs",
    "kidneys": [
        {healthy:false},
        {healthy:false},
        {healthy:true},
        {healthy:true},
    ]
  }
]


function sum(n){
    let ans=0;
    for(let i=0;i<=n;i++){
        ans+=i;
    }
    return ans;
}


app.get('/' , function(req,res){
    // const n=req.query.n;
    // const ans=sum(n);

    // res.send("hii your ans is "+ ans);
    const kid=users[0].kidneys;
    const kidlength=kid.length;
    let numberofh=0;
    for(let i=0;i<kidlength;i++){
        if(kid[i].healthy){
            numberofh=numberofh+1;
        }
    }
    const unh=kidlength-numberofh;
    res.json({
        kidlength,
        numberofh,
        unh,
        kid
    });

})
//add new unhealthy kidney
app.post('/',function(req,res){
    const inp=req.body.inp;
    users[0].kidneys.push({healthy:inp});
    res.json({
        mark:"dONE"
    })

})

app.put('/',function(req,res){
    const kid=users[0].kidneys;
    const nok=users[0].kidneys.length;
    for(let i=0;i<nok;i++){
        if(!kid[i].healthy){
            kid[i].healthy=true;
        }
    }res.json({
        mark:"dONE"
    })

})
app.delete('/',function(req,res){
    if(badkidney()){
        const newkidneys=[];
        const kid=users[0].kidneys;
        const nok=users[0].kidneys.length;
        for(let i=0;i<nok;i++){
            if(kid[i].healthy){
                newkidneys.push(
                    {healthy:true}
                )

            }
        }
        users[0].kidneys=newkidneys;
        res.json(users);
    }else{
        res.status(411).json({
            "msg":"chodu lund ab kya apni ma chuda rhe ho"
        })

    }
      
    
})

function badkidney(){
    let badkid=false;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            badkid=true;
        }
    }
    return badkid;
}
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});