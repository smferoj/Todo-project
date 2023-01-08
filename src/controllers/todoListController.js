const ToDoListModel = require("../models/TodoListModel");

// ===================Create Todo ======================
exports.CreateToDo = (req, res) => {
  let reqBody = req.body;
  let ToDoSubject = reqBody["ToDoSubject"];
  let ToDoDescription = reqBody["ToDoDescription"];
  let UserName = req.headers["username"];
  let ToDoStatus = "New";
  let ToDoCreateDate = Date.now();
  let ToDoUpdateDate = Date.now();

  let PostBody = {
    UserName: UserName,
    ToDoSubject: ToDoSubject,
    ToDoDescription: ToDoDescription,
    ToDoStatus: ToDoStatus,
    ToDoCreateDate: ToDoCreateDate,
    ToDoUpdateDate: ToDoUpdateDate,
  };

  ToDoListModel.create(PostBody, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

// ======================Select Todo ================

exports.SelectToDo = (req, res) => {
  let UserName = req.headers["username"];
  ToDoListModel.find({ UserName }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

//=================Update Todo ===============

exports.UpdateToDo = (req, res) => {
  let ToDoSubject = req.body["ToDoSubject"];
  let ToDoDescription = req.body["ToDoDescription"];
  let _id = req.body["_id"];
  let ToDoUpdateDate = Date.now();

  let PostBody = {
    ToDoSubject,
    ToDoDescription,
    _id,
    ToDoUpdateDate,
  };

  ToDoListModel.updateOne(
    { _id },
    { $set: PostBody },
    { upsert: true },
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    }
  );
};

// ================update Todo=============
exports.UpdateStatusToDo = (req, res) => {
  let ToDoStatus = req.body["ToDoStatus"];
  let _id = req.body["_id"];
  let ToDoUpdateDate = Date.now();

  let PostBody = {
    ToDoStatus: ToDoStatus,
    ToDoUpdateDate: ToDoUpdateDate,
    _id: _id,
  };
  ToDoListModel.updateOne(
    { _id: _id },
    { $set: PostBody },
    { upsert: true },
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    }
  );
};

// ========================Remove Todo===================

exports.RemoveToDo = (req, res) => {
  let _id = req.body["_id"];

  ToDoListModel.remove({ _id: _id }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

// ==========================Select Todo Status============

exports.SelectToDoByStatus = (req, res) => {
  let UserName = req.headers["username"];
  let ToDoStatus = req.body["ToDoStatus"];
  ToDoListModel.find({ UserName, ToDoStatus }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

// ==========================Select Todo Status by date============

exports.SelectToDoByDate = (req, res) => {
    let UserName = req.headers["username"];
    let FromDate = req.body['FromDate'];
    let ToDate = req.body['ToDate'];
     
    ToDoListModel.find({ UserName, ToDoCreateDate:{$gte:new Date(FromDate), $lte:new Date(ToDate)}}, (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    });
  };
  