
let lists= document.getElementById("lists");
let inputValue= document.getElementById("input1");


//we are actually making array of objects that would be stored in LocalStorage for the further use

let myFavourites =[];



localStorage.setItem("myFavourites",JSON.stringify(myFavourites));


//  All the keys and other values that would be used in code

const myPublicKey="1689b0f29cfbd3bcbb8904b8b7b36479";

const myPrivateKey="4d99ed4af5d6e3d56d68963bdc1cf8ca40e94aba";

const myMDHash= "3fd1128824622313a83d08f496201ee6";

const SH1HASH="ac3136431014943069316c4c5b7be0517933c74d";



// let accessToken= "1211886636113722";


//this handleInput is triggered from search  button when it is clicked

function handleInput(){

    const searchValue= inputValue.value;

    localStorage.setItem("searchValue", searchValue);
    // const searchValue="batman";
    
const myReq=  async ()=>{

    // const url =`https://gateway.marvel.com:443/v1/public/characters?name=hulk&apikey=1689b0f29cfbd3bcbb8904b8b7b36479`;

    // const url=  `https://gateway.marvel.com/v1/public/characters?name=${searchValue}?ts=1&apikey=${myPublicKey}&hash=${myMDHash}`;
    const url= `https://www.superheroapi.com/api.php/1211886636113722/search/${searchValue}`;

    const response= await fetch(url);

     const mydata= await response.json();

    
    // console.log(mydata.results);

    const res= mydata.results;

    // console.log(res[0]);
    // console.log(res.length);
    for(let i=0;i<res.length;i++){

      // making list item that would be used as list
      let listItem=  document.createElement("li");

      listItem.setAttribute("class","listItem");
     

      listItem.innerHTML=  `

      <div class="content">
                    <div class="leftDiv">
                    <a href="./myHTML/detail.html" > <img onClick="handleShowDetail(${res[i].id})" class="listimage" src="${res[i].image.url}" > </a>
                                    </div>
                    <div class="rightDiv">
                        <span class="myId"> Id: ${res[i].id}</span>
                        <span class="myName"> ${res[i].name} </span>
                    </div>
                    <div class="btn">
                        <button onClick="handleAddFavourite(${res[i].id})" >
                            <img  class="likeImage" src="https://cdn-icons-png.flaticon.com/512/3128/3128313.png" alt="" >
                        </button>
                    </div>
                </div>
   
       `;

      console.log(res[i].id, res[i].name,res[i].image.url );


      lists.appendChild(listItem);

    }

    
}


// making API call 
myReq();

}



// functionality to handle the showDetail of particular hero of API

function handleShowDetail(givenId){
 /// JSON.parse(arg);
 console.log(givenId);
 window.localStorage.setItem("givenId", givenId);
  console.log("functionality of handle show detail has been caaleed");
 // console.log(arg);
}

// funcitonality to add favourite into myFavorite page

function handleAddFavourite(gotId){

  console.log(gotId,"add favourite functionality has been called");

  
const myCall = async ()=>{

  // let searchId= localStorage.getItem("givenId");
  let searchValue= localStorage.getItem("searchValue");
  console.log(searchValue);
  const url= `https://www.superheroapi.com/api.php/1211886636113722/search/${searchValue}`;

  const response= await fetch(url);

   const mydata= await response.json();

  
  // console.log(mydata.results);

  const res= mydata.results;

  console.log(res);
  // console.log(res[2].id);
  // console.log("searchId", searchId);

  // console.log(res[1].id == searchId);

  let n= res.length;
  for(let i=0;i<n;i++){
      if(res[i].id == gotId){
          // console.log(i);

          // console.log(res[i]);
         let  myobj=res[i];

          console.log("myobj",myobj);

             let retrieveArrayOFFav= JSON.parse(localStorage.getItem("myFavourites"));

            //  console.log(retrieveArrayOFFav);


             retrieveArrayOFFav.push(myobj);

             localStorage.setItem("myFavourites",JSON.stringify(retrieveArrayOFFav));


      }}

}



myCall();


}