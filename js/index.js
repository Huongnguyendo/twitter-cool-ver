// START OF HUONG'S PART

let tweetList = [];
let id = 0;
let hashtag = [];
let userHandle = [];

let maxInput = 140;

// input area
let tweetInput = document.getElementById("tweetInput");

const addTweet = () => {
  //1. get the value from input
  let tweet = document.getElementById("tweetInput").value;

  // Scan for hastags, username handles and images
  let newTweetItem = tweet
    .split(" ")
    .map((word, index) => {
      if (word.startsWith("#")) {
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
    })
    .join(" ");

  if (newTweetItem) {
    id++;
    //2. insert into tweet list
    let tweetItem = {
      id: id,
      content: newTweetItem,
      user: "Huong",
      timePosted: null,
      deleted: false,
      comments: [],
      liked: false,
      hashtag: [],
      // parents: null,
    };
    tweetList.unshift(tweetItem);

    console.log(id, "hastag:", hashtag, "userHandle:", userHandle);
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
      if (item.originTweetID) {
        return `
        <div class="card" style="width: 100%;">
            <div class="card-body d-flex">
                <div class="left col-2">
                    <img src="https://pm1.narvii.com/6288/b8a1036aed00d8d535b199556bede12f96aba9c5_00.jpg" style="max-width:100%; border-radius:50%;">
                </div>
                <div class="right col-10">
                    <h5 class="card-title">${item.user}</h5>
                    <p class="card-text">${item.retweetMessage}</p>
                    
                    <div>
                      <button class="btn commentBtn" >
                          <i class="fa fa-comment"></i>
                          <span class="comment-count"></span>
                      </button>
                      <button class="btn retweetBtn" onclick="retweet(${item.id})">
                          <i class="fa fa-retweet"></i>
                          <span class="retweet-count"></span>
                      </button>
                      <button class="btn heartBtn">
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

                </div>      
  
            </div>

            <div class="d-flex pb-3" style="width: 100%">
              <div class="col-2">
              </div>
              <div class="col-10">
                <div class="card mt-3" style="width: 100%;">
                    <div class="card-body d-flex justify-content-center">
                        <div class="left col-2">
                            <img src="https://pm1.narvii.com/6288/b8a1036aed00d8d535b199556bede12f96aba9c5_00.jpg" style="max-width:100%; border-radius:50%;">
                        </div>
                        <div class="right col-10">
                            <h5 class="card-title">${item.originUser}</h5>
                            <p class="card-text">${item.originContent}</p>
                        </div>      
                    </div>
                  </div>
              </div>
            </div>

          </div>
             
        `;
      }

      return `
      
      
                <div class="card mt-3" style="width: 100%;">
                    <div class="card-body d-flex justify-content-center">
                        <div class="left col-2">
                            <img src="https://pm1.narvii.com/6288/b8a1036aed00d8d535b199556bede12f96aba9c5_00.jpg" style="max-width:100%; border-radius:50%;">
                        </div>
                        <div class="right col-10">
                            <h5 class="card-title">${item.user}</h5>
                            <p class="card-text">${item.content}</p>
                            <div>
                                <button class="btn commentBtn" >
                                    <i class="fa fa-comment"></i>
                                    <span class="comment-count"></span>
                                </button>
                                <button class="btn retweetBtn" onclick="retweet(${item.id})">
                                    <i class="fa fa-retweet"></i>
                                    <span class="retweet-count"></span>
                                </button>
                                <button class="btn heartBtn">
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
                          </div>      
                      </div>
                  </div>
              
      
      
`;
    })
    .join("");

  document.getElementById("tweetList").innerHTML = tweetsHTML;
};

const deleteTweet = (id) => {
  // edited for parent att
  let updatedTweetList = tweetList.filter((item) => {
    console.log("deletenumber ", id);

    if (item.id == id || item.originTweetID == id) {
      return false;
    }
    return true;
  });

  tweetList = updatedTweetList;
  console.log("list: ", tweetList);

  // tweetList = tweetList.filter((tweet) => tweet.id != id);

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

function retweet(originID) {
  // find original tweet
  let originTweet = tweetList.find((tweet) => tweet.id == originID);
  console.log("originTweet", originTweet);
  // add comment
  const retweetMessage = prompt("What do you think about this?");
  // new id for retweet
  id++;
  let retweetObject = {
    id: id,
    originContent: originTweet.content,
    originTweetID: originID,
    originUser: originTweet.user,
    retweetMessage: retweetMessage,
    liked: false,
    timePosted: null,
    deleted: false,
    // parents: null,
    hashtag: [],

    comments: [],
    user: "Huong",
  };
  console.log("retweetObject", retweetObject);
  tweetList.unshift(retweetObject);
  renderTweets(tweetList);

  saveData();
  console.log(tweetList);
  // id++
}

getData();

// END OF HUONG'S PART

// START OF WILLIAM'S PART

// Filter by hastag or username handle
const filterTweets = (filterItem) => {
  let filteredList = tweetList.filter((tweetItem) =>
    tweetItem.content.includes(filterItem)
  );
  renderTweets(filteredList);
};

// Search on input in search box
const searchFilter = () => {
  let filterItem = document.getElementById("search").value;
  let filteredList = tweetList.filter((tweetItem) =>
    tweetItem.content.includes(filterItem)
  );
  renderTweets(filteredList);
};

// END OF WILLIAM'S PART

// START OF JUN YOUNG'S PART

// END OF JUN YOUNG'S PART
