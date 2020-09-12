// START OF HUONG'S PART

let tweetList = [];
let id = 0;
let hashtag = [];
let userHandle = []

const addTweet = () => {
  //1. get the value from input
  let tweet = document.getElementById("tweetInput").value;
  
    // Scan for hastags, username handles and images
    let newTweetItem = tweet.split(' ').map((word, index) => {
        if (word.startsWith('#')) {
            hashtag.push(word);
            return `<a href="#" onclick="filterTweets('${word}')">${word}</a>`;
        } else if (word.startsWith("@")) {
            userHandle.push(word);
            return `<a href="#" onclick="filterTweets('${word}')">${word}</a>`;
        } else if (word.match(/\.(jpeg|jpg|gif|png)$/) != null) {
            return `<img src="${word}" alt="image" width="50px" height="50px">`;
        } else {
            return word;
        }
    }).join(" ");
    
  if (newTweetItem) {
    id++;
    //2. insert into tweet list
    let tweetItem = {
      user: "Huong",
      id: id,
      like: false,
      content: newTweetItem,
    };
    tweetList.unshift(tweetItem);

    console.log(id, "hastag:",hashtag, "userHandle:",userHandle);
  }

  // clear input field
  document.getElementById("tweetInput").value = "";

  console.log(tweetList);

  // save data locally
  saveData();

  // render tweet list
  renderTweets(tweetList);
};

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

const renderTodos = () => {
  // clear
  document.getElementById("todoList").innerHTML = "";
  document.getElementById("completeList").innerHTM = "";

  // show Todo list on web browser
  let tempUndoneList = todoList.filter((task) => task.isDone == false);
  let tempDoneList = todoList.filter((task) => task.isDone == true);
  let unDoneHTML = tempUndoneList
    .map(
      (item) => `
    <li>${item.content}
        <div class="buttons">
            <button class="btn deleteBtn" onclick="deleteTask(${item.id})">
                <i class="fa fa-trash"></i>
            </button>
            <button class="btn completeBtn" onclick="completeTask(${item.id})">
                <i class="fa fa-check-circle"></i>
            </button>
        </div>
    </li>
  `
    )
    .join("");

  let doneHTML = tempDoneList
    .map(
      (item) => `
      <li>${item.content}
          <div class="buttons">
              <button class="btn deleteBtn" onclick="deleteTask(${item.id})">
                  <i class="fa fa-trash"></i>
              </button>
              <button class="btn completedBtn">
                <i class="fa fa-check-circle"></i>
            </button>
          </div>
      </li>
    `
    )
    .join("");

  document.getElementById("todoList").innerHTML = unDoneHTML;
  document.getElementById("completeList").innerHTML = doneHTML;
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

// Filter by hastag or username handle
const filterTweets = (filterItem) => {
    let filteredList = tweetList.filter(tweetItem => tweetItem.content.includes(filterItem));
    renderTweets(filteredList);
}

// Search on input in search box
const searchFilter = () => {
    let filterItem = document.getElementById("search").value
    let filteredList = tweetList.filter(tweetItem => tweetItem.content.includes(filterItem));
    renderTweets(filteredList);
}

// END OF WILLIAM'S PART

// START OF JUN YOUNG'S PART

// END OF JUN YOUNG'S PART
