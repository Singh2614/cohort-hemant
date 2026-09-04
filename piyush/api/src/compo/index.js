const getposts=async()=>{
    const Response=await fetch("https://jsonplaceholder.typicode.com/users",{
        method:"GET",
    });
    return  await Response.json();
}
export default getposts;