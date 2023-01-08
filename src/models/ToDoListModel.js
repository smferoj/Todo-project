const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    UserName: { type: String },
    ToDoSubject: { type: String},
    ToDoDescription: { type: String},
    ToDoStatus: { type: String, default:"New"},
    ToDoCrateDate: { type: Date},
    ToDoUpdateDate: { type: Date}
  },
  { versionKey: false }
);

const ToDoListModel = mongoose.model("List", DataSchema);

module.exports = ToDoListModel;
