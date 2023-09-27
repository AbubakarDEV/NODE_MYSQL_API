const express = require("express");
const con = require("./config");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  con.query("select * from user", (err, result) => {
    res.send(result);
  });
});

app.post("/", (req, res) => {
  con.query("insert into user SET ?", req.body, (err, result, fields) => {
    if (err) {
      res.send(err);
    }
    if (result) {
      res.send(result);
    }
  });
});

app.put("/:id", (req, res) => {
  const data = [req.body.name, req.params.id];
  con.query(
    "update user SET name = ? WHERE id = ?",
    data,
    (err, result, fields) => {
      if (err) {
        res.send(err);
      }
      if (result) {
        res.send(result);
      }
    }
  );
});

app.delete("/:id", (req, res) => {
  con.query(
    "delete from user WHERE id =" + req.params.id,
    (err, result, fields) => {
      if (err) {
        res.send(err);
      }
      if (result) {
        res.send(result);
      }
    }
  );
});

app.listen(5000);
