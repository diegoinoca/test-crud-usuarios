const connection = require("../config/db.config");

// constructor
const User = function(user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
};

User.create = (newUser, result) => {
  connection.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByUser = (user, result) => {
  connection.query(`SELECT * FROM users WHERE LOWER(username) = '${user.toLowerCase()}' OR LOWER(email) = '${user.toLowerCase()}'`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

User.findBy = (id, result) => {
  connection.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};


User.getAll = (result) => {
  let query = "SELECT * FROM users";
  connection.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  connection.query(
    "UPDATE users SET firstname = ?, lastname = ?, email = ?, username = ?, password = ? WHERE id = ?",
    [user.firstname, user.lastname, user.email, user.username, user.password, id], (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...user });
    }
  );
};

User.updateProfilePhoto = (id, image, result) => {
  connection.query(
    "UPDATE users SET image = ?  WHERE id = ?",
    [image, id], (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, true);
    }
  );
};

User.remove = (id, result) => {
  connection.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};


User.close = () =>{
  connection.end(function(err) {
    if (err) {
      return false;
    }
    return true;
  });
}

module.exports = User;