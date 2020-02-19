const { users } = require("./users");

const currentUserFriends = ["1007", "1008", "1009"];

const friends = currentUserFriends.map(friendId => {
  return users.find(user => user.id === friendId);
});

console.log(friends);
