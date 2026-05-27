const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB CONNECT
mongoose.connect("mongodb://127.0.0.1:27017/crm")
.then(() => console.log("MongoDB Connected 🚀"))
.catch(err => console.log(err));

// LEAD MODEL
const Lead = mongoose.model("Lead", {
    name: String,
    email: String,
    status: {
        type: String,
        default: "New"
    },
    notes: {
        type: String,
        default: ""
    }
});

// HOME
app.get("/", (req, res) => {
    res.send("CRM Running 🚀");
});

// ADD LEAD
app.post("/add-lead", async (req, res) => {
    const lead = new Lead(req.body);
    await lead.save();
    res.send("Lead Added 🚀");
});

// GET LEADS
app.get("/leads", async (req, res) => {
    const leads = await Lead.find();
    res.json(leads);
});

// UPDATE STATUS
app.put("/update-status/:id", async (req, res) => {
    await Lead.findByIdAndUpdate(req.params.id, req.body);
    res.send("Status Updated 🚀");
});

// ADD NOTE
app.put("/add-note/:id", async (req, res) => {
    await Lead.findByIdAndUpdate(req.params.id, {
        notes: req.body.notes
    });
    res.send("Note Added 🚀");
});

// DELETE LEAD
app.delete("/delete-lead/:id", async (req, res) => {
    await Lead.findByIdAndDelete(req.params.id);
    res.send("Lead Deleted 🗑️");
});

// SERVER START
app.listen(5000, () => {
    console.log("Server running on port 5000");
});