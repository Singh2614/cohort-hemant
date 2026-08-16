const axios=require('axios');
async function main(){
    const res=await fetch('https://httpdump.app/dumps/16a1590a-f1d8-4305-90e9-0af96fc2a97b',{
        method:"POST",
        body:{
            username:"anil",
            password:"yele"
        },
        headers:{
            "auth":"bearer 123"
        },
        query:1
    });
    const json=await res.text();
    console.log(json);
}

async function run(){
    const res=await axios.get('https://httpdump.app/dumps/16a1590a-f1d8-4305-90e9-0af96fc2a97b',{
        username:"anil",
        password:"yele"
        },
        {headers:{
            authorization:"123"
            },
        },
    );
    
    
    console.log(res.data);

}

run();