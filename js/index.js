// START OF HUONG'S PART

let tweetList = [];
let id = 0;

let maxInput = 140;

// input area
let tweetInput = document.getElementById("tweetInput");

const addTweet = () => {
  //1. get the value from input
  let tweet = document.getElementById("tweetInput").value;
  if (tweet) {
    id++;
    //2. insert into tweet list
    let tweetItem = {
      id: id,
      user: "Huong",
      content: tweet,
      timePosted: null,
      deleted: false,
      comments: [],
      liked: false,
      hashtag: [],
    };
    tweetList.unshift(tweetItem);

    console.log(id);
  }

  // clear input field
  document.getElementById("tweetInput").value = "";

  console.log(tweetList);

  // save data locally
  saveData();

  // render tweet list
  renderTweets(tweetList);
};

//check textarea input
document.getElementById("tweetInput").addEventListener("input", (e) => {
  let message = e.target.value;

  let textRemain = maxInput - message.length;
  document.getElementById("remain").innerHTML = `${textRemain} characters left`;

  if (textRemain < 0) {
    document.getElementById("remain").style = "color:red";
    document.getElementById("addBtn").disabled = true;
  } else {
    document.getElementById("remain").style = "color:black";
    document.getElementById("addBtn").disabled = false;
  }
});

// --------------------------

for (let i = 0; i < tweetList.length; i++) {
  console.log(tweetList[i].user);
}

const renderTweets = (tweetList) => {
  // clear
  document.getElementById("tweetList").innerHTML = "";

  // show tweet list on web browser

  let tweetsHTML = tweetList
    .map((item) => {

      //when tweet has retweets
      if ('originTweetID' in item) {
        return `<form>
        <div class="card nguyen-card" style="width: 100%;">
            <div class="card-body nguyen-card-body d-flex">
                <div class="left col-2">
                    <img src="logo.png" style="max-width:100%">
                </div>
                <div class="right col-10">
                    <h5 class="card-title">${item.user}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">@${item.user}</h6>
                    <p class="card-text">${item.retweetMessage}</p>
                    <a href="#" class="card-link" onclick="toggleLike('${item.id}')">${checkIfUserHasLike(item) ? "Unlike" : "Like"}</a>
                    <a href="#" class="card-link" onclick="comment('${item.id}')">Comment</a>
                    <a href="#" class="card-link" onclick="retweet('${item.id}')">Retweet</a>
                    <a href="#" class="card-link" onclick="deleteTweet(${item.id})">Delete</a>
                </div>      
            </div>
          </div>
          <div class="retweet-container d-flex pb-3" style="width: 100%">
              <div class="col-2">
              </div>
              <div class="col-10">
                <div class="card nguyen-card mt-3" style="width: 100%;">
                    <div class="card-body nguyen-card-body d-flex justify-content-center">
                        <div class="left col-2">
                            <img src="logo.png" width="60px">
                        </div>
                        <div class="right col-10">
                            <h5 class="card-title">${item.originUser}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">@earlpullara</h6>
                            <p class="card-text">${item.originContent}</p>
                        </div>      
                    </div>
                  </div>
              </div>
          </div>   
        </form>`
    }

      return `<div class="tweet">
        <p class="user-name">
            ${item.user}
            <span class="user-acc"></span>
            <span class="time-posted"></span>
        </p>
        <p class="tweet-content">${item.content}</p>
        <div>
            <button class="btn commentBtn" >
                <i class="fa fa-comment"></i>
                <span class="comment-count"></span>
            </button>
            <button class="btn retweetBtn" >
                <i class="fa fa-retweet"></i>
                <span class="retweet-count"></span>
            </button>
            <button class="btn heartBtn" onclick="toggleHeartColor(${item.id})">
                <i class="fa fa-heart"></i>
                <span class="heart-count"></span>
            </button>
            <button class="btn heartBtn" >
                <i class="fa fa-share-square"></i>
                <span class="share-count"></span>
            </button>
            <button class="btn deleteBtn" onclick="deleteTweet('${item.id}')">
                <i class="fa fa-trash"></i>
            </button>
            
        </div>
  <div>
`;
    })
    .join("");

  document.getElementById("tweetList").innerHTML = tweetsHTML;
};

const deleteTweet = (id) => {
  tweetList = tweetList.filter((tweet) => tweet.id != id);

  saveData();

  renderTweets(tweetList);
};

const saveData = () => {
  localStorage.setItem("tweetList", JSON.stringify(tweetList));
};

const getData = () => {
  let data = localStorage.getItem("tweetList");
  data = JSON.parse(data);
  console.log("getData", data);

  if (data == null) {
    tweetList = [];
  } else {
    tweetList = data;
  }

  renderTweets(tweetList);
};

// check if liked
function checkIfLiked(item) {
  return (item.liked == true)  
}

// toggle heart color
const toggleHeartColor = (id) => {
  

  let likedItem = tweetList.map((item) => item.id == id) 

    likedItem.liked = true;

    tweetList.map((item) => {
      if(item.liked == true);
    })
  if (item.likeStatus == true) {
    heart = `<i class="fas fa-heart fill-red"></i>`
} else if (item.likeStatus == false) {
    heart = `<i class="far fa-heart fill-none"></i>`
}
};

function retweet(originID) {
  let originTweet = tweetList.find((tweet) => tweet.id == originID);
  console.log("originTweet", originTweet);
  const retweetMessage = prompt("What do you think about this?");
  // original tweet that you want to retweet
  let retweetObject = {
    id: id,
    originContent: originTweet.content,
    originTweetID: originID,
    originUser: originTweet.user,
    retweetMessage: retweetMessage,
    isLiked: false,
    deleted: false,
    timePosted: null,
    comments: [],
    likes: [],
    hashtag: [],
    user: currentUser,
  };
  console.log("retweetObject", retweetObject);
  tweetList.unshift(retweetObject);
  render(tweetList);
  console.log(tweetList);
  id++;
}

getData();

// END OF HUONG'S PART

// START OF WILLIAM'S PART

// END OF WILLIAM'S PART

// START OF JUN YOUNG'S PART

// END OF JUN YOUNG'S PART
