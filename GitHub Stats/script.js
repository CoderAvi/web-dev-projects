const btn=document.getElementById("btn");
const user=document.getElementById("user");
const card=document.querySelector(".card");
const dp=document.getElementById("dp");
const bio=document.getElementById("bio");
const username=document.getElementById("username");
const followers=document.getElementById("followers");
const following=document.getElementById("following");
const repo=document.getElementById("repo");

dp.hidden=true;

btn.addEventListener("click", (e)=>{
    e.preventDefault();
    fetch(`https://api.github.com/users/${user.value}`)
        .then((response) => {
            if(response.ok){
                return response.json();
            }
            else{
                throw new Error();
            }
        })
        .then((data) => {
            reset();
            card.classList.add('show');
            dp.src=data['avatar_url'];
            username.innerHTML=data['name'];
            if(data['bio']!=null){
                bio.innerHTML=data['bio'];
            }
            username.href=data['html_url'];
            followers.innerHTML=data['followers'];
            document.querySelector("#followers-count").innerHTML="Followers";
            following.innerHTML=data['following'];
            document.querySelector("#following-count").innerHTML="Following";
            repo.innerHTML=data['public_repos'];
            document.querySelector("#repo-count").innerHTML="Repositories";
            dp.hidden=false;
        })
        .catch(err => {
            reset();
            alert("Enter correct username");
        });
    user.value="";
})

function reset(){
    card.classList.remove('show');
    dp.hidden=true;
    dp.src="";
    username.innerHTML="";
    bio.innerHTML="";
    username.href="";
    followers.innerHTML="";
    document.querySelector("#followers-count").innerHTML="";
    following.innerHTML="";
    document.querySelector("#following-count").innerHTML="";
    repo.innerHTML="";
    document.querySelector("#repo-count").innerHTML="";
}