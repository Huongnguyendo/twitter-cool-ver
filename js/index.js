// START OF HUONG'S PART
let currentUser = prompt("Welcome back: ");

let defaultAccount = "@preciousUser";

let id = 0;
let hashtag = [];
let userHandle = [];

let tweetList = [];

let maxInput = 140;

// input area
let tweetInput = document.getElementById("tweetInput");

const addTweet = () => {
	// clear remaining
	document.getElementById("remain").innerHTML = "";

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
			user: currentUser,
			account: defaultAccount,
			timePosted: null,
			deleted: false,
			comments: [],
			liked: false,
			hashtag: [],
		};
		tweetList.unshift(tweetItem);
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

const renderTweets = (tweetList) => {
  // clear
  document.getElementById("tweetList").innerHTML = "";

  // show tweet list on web browser

  let tweetsHTML = tweetList
    .map((item) => {
      // if liked
      if (item.liked) {
        heart = `<i class="fas fa-heart fill-red"></i>`;
      } else {
        heart = `<i class="far fa-heart fill-none"></i>`;
      }

      //when tweet has retweets
      if (item.originTweetID) {
        return `
        <div class="card" style="width: 100%;">
            <div class="card-body d-flex">
                <div class="left col-2">
                    <img src="https://pm1.narvii.com/6288/b8a1036aed00d8d535b199556bede12f96aba9c5_00.jpg" style="max-width:100%; border-radius:50%;">
                </div>
                <div class="right col-10">
                    <h5 class="card-title">${item.user}
                      <span class="user-account text-muted">${
												item.account
											}</span>
                      <span class="post-date">${moment(item.postTime).fromNow(
												true
											)}</span>
                    </h5>
                    <p class="card-text">${item.retweetMessage}</p>
                    
                    <div>
                      <button class="btn commentBtn" onclick="comment('${
												item.id
											}')">
                          <i class="fa fa-comment"></i>
                          <span class="comment-count"></span>
                      </button>
                      <button class="btn retweetBtn" onclick="retweet(${
												item.id
											})">
                          <i class="fa fa-retweet"></i>
                          <span class="retweet-count"></span>
                      </button>
                      <button class="btn heartBtn" onclick="toggleLike('${
												item.id
											}')">
                          ${heart}
                          <span class="heart-count"></span>
                      </button>
                      <button class="btn shareBtn" >
                          <i class="fa fa-share-square"></i>
                          <span class="share-count"></span>
                      </button>
                      <button class="btn deleteBtn" onclick="deleteTweet('${
												item.id
											}')">
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
                            <h5 class="card-title">${item.originUser}
                              <span class="user-account text-muted">${
																item.originalAccount
															}</span>
                              <span class="post-date">${moment(
																item.postTime
															).fromNow(true)}</span>
                            </h5>
                            <p class="card-text">${item.originContent}</p>
                        </div>      
                    </div>
                  </div>
              </div>
            </div>

          </div>
             
        `;
			}

      // if tweet has comment
      else if (item.comments.length) {
        let commentHTML = item.comments
          .map((comment) => {
            return `<div class="d-flex pb-3" style="width: 100%">
            
            
              <div class="card mt-1" style="width: 100%;">
                  <div class="card-body d-flex justify-content-center">
                      <div class="left col-2">
                          <img src="" style="max-width:100%">
                      </div>
                      <div class="right col-10">
                          <h5 class="card-title">${comment.user}
                              <span class="text-muted">${comment.account}</span>
                              <span class="post-date">${moment(
																item.postTime
															).fromNow(true)}</span>
                            </h5>
                            <p class="text-muted">Replying to ${
															comment.originalAccount
														}</p>
                          <p class="card-text">${comment.content}</p>
                          
                          </div>      
                  </div>
                </div>
            
        </div>`;
					})
					.join("");

				return (
					`<div class="card mt-3" style="width: 100%;">
            <div class="card-body d-flex">
                <div class="left col-2">
                    <img src="" style="max-width:100%;">
                </div>
                <div class="right col-10">
                    <h5 class="card-title">${item.user}
                    <span class="user-account text-muted">${item.account}</span>
                    <span class="post-date">${moment(item.postTime).fromNow(
											true
										)}</span>
                    </h5>
                    <p class="card-text">${item.content}</p>
                    <div>
                      <button class="btn commentBtn" onclick="comment('${
												item.id
											}')">
                          <i class="fa fa-comment"></i>
                          <span class="comment-count"></span>
                      </button>
                      <button class="btn retweetBtn" onclick="retweet(${
												item.id
											})">
                          <i class="fa fa-retweet"></i>
                          <span class="retweet-count"></span>
                      </button>
                      <button class="btn heartBtn" onclick="toggleLike('${
												item.id
											}')">
                      ${heart}
                          <span class="heart-count"></span>
                      </button>
                      <button class="btn shareBtn" >
                          <i class="fa fa-share-square"></i>
                          <span class="share-count"></span>
                      </button>
                      <button class="btn deleteBtn" onclick="deleteTweet('${
												item.id
											}')">
                          <i class="fa fa-trash"></i>
                      </button>
                    </div>
                </div>      
            </div>
          </div>` + commentHTML
				);
			}

			// default tweet display
			return `
      
      
                <div class="card mt-3" style="width: 100%;">
                    <div class="card-body d-flex justify-content-center">
                        <div class="left col-2">
                            <img src="https://pm1.narvii.com/6288/b8a1036aed00d8d535b199556bede12f96aba9c5_00.jpg" style="max-width:100%; border-radius:50%;">
                        </div>
                        <div class="right col-10">
                            <h5 class="card-title">${item.user}
                              <span class="user-account text-muted">${
																item.account
															}</span>
                              <span class="post-date">${moment(
																item.postTime
															).fromNow(true)}</span>
                            </h5>
                            <p class="card-text">${item.content}</p>
                            <div>
                                <button class="btn commentBtn" onclick="comment('${
																	item.id
																}')">
                                    <i class="fa fa-comment"></i>
                                    <span class="comment-count"></span>
                                </button>
                                <button class="btn retweetBtn" onclick="retweet(${
																	item.id
																})">
                                    <i class="fa fa-retweet"></i>
                                    <span class="retweet-count"></span>
                                </button>
                                <button class="btn heartBtn" onclick="toggleLike('${
																	item.id
																}')">
                                ${heart}
                                    <span class="heart-count"></span>
                                </button>
                                <button class="btn shareBtn" >
                                    <i class="fa fa-share-square"></i>
                                    <span class="share-count"></span>
                                </button>
                                <button class="btn deleteBtn" onclick="deleteTweet('${
																	item.id
																}')">
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

const retweet = (originID) => {
	// find original tweet
	let originTweet = tweetList.find((tweet) => tweet.id == originID);
	// add comment
	const retweetMessage = prompt("Retweet this");
	// new id for retweet
	id++;
	let retweetObject = {
		id: id,
		originContent: originTweet.content,
		originTweetID: originID,
		originUser: originTweet.user,
		retweetMessage: retweetMessage,
		originalAccount: originTweet.account,
		account: defaultAccount,
		liked: false,
		timePosted: null,
		deleted: false,
		hashtag: [],

		comments: [],
		user: currentUser,
	};
	tweetList.unshift(retweetObject);
	renderTweets(tweetList);

	saveData();
	console.log(tweetList);
};

// comment func
const comment = (originID) => {
	let originTweet = tweetList.find((tweet) => tweet.id == originID);
	let commentContent = prompt("Add a comment ");
	id++;
	let commentObject = {
		id: id,
		content: commentContent,
		originID: originID,
		originContent: originTweet.content,
		originUser: originTweet.user,
		originalAccount: originTweet.account,
		account: defaultAccount,
		liked: false,

		timePosted: null,
		deleted: false,
		hashtag: [],

		user: currentUser,
	};

	originTweet.comments.push(commentObject);
	renderTweets(tweetList);

	saveData();
};

const toggleLike = (originID) => {
	let targetTweet = tweetList.find((tweet) => tweet.id == originID);
	let targetIndex = tweetList.findIndex((tweet) => tweet.id == originID);

	tweetList[targetIndex].liked = !tweetList[targetIndex].liked;
	console.log("tweetListlike", tweetList);

	renderTweets(tweetList);
};

getData();
// let test = document.getElementById("mainHeart");
// console.log("pls", test);
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
