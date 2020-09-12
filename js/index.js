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
      likes: [],
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
    .map(
      (item) => `
      <div class="tweet">
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
`
    )
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

// toggle heart color
const toggleHeartColor = (id) => {
  console.log(id);
  let heart = document.querySelector(".heartBtn ");
  heart.classList.add("hearted");
};

getData();

// END OF HUONG'S PART

// START OF WILLIAM'S PART

// END OF WILLIAM'S PART

// START OF JUN YOUNG'S PART

// END OF JUN YOUNG'S PART
