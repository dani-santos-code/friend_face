const { users } = require("./users");

const currentUserFriends = ["1030", "1031", "1032"];

const friends = currentUserFriends.map(friendId => {
  return users.filter(user => user.id !== friendId);
});

console.log(friends.length);
