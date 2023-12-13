const express=require('express');
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express();

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));



mongoose.connect("mongodb://127.0.0.1:27017/Employee")
.then(()=>{
    console.log("connected");
})
.catch(()=>{
    console.log("error");
})


let eStructure=new mongoose.Schema(
    {
        FirstName:String,
        LastName:String,
        Email:String,
        Mobile:Number,
        Address1:String,
        Address2:String,
        Country:String,
        State:String,
        ZipCode:Number
    }
)

let eDetail=new mongoose.model("eDetail",eStructure)



app.post("/sentusers",(req,res)=>{
      const{ firstname,
        lastName,
        email,
        mobile,
        address1,
        address2,
        selectedCountry,
        selectedState,
        zipCode}=req.body

      let store=async()=>{
        try{
            let xyz={
                FirstName:firstname,
                LastName:lastName,
                Email:email,
                Mobile:mobile,
                Address1:address1,
                Address2:address2,
                Country:selectedCountry,
                State:selectedState,
                ZipCode:zipCode

            }
            let result= await eDetail.insertMany([xyz])
        }
        catch{
            console.log("Error");
        }
      }
      store()
      res.send("Received")
})


app.get("/allusers", async (req, res) => {
    try {
      
      const users = await eDetail.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      
    }
  });

  //get for edit
  app.get("/editusers/:id", async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await eDetail.findById(userId);
      
      if (!user) {
       
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching user");
    }
  });


  // update the data

  app.put("/upusers/:id", async (req, res) => {
    const userId = req.params.id;
    const{ firstname,
        lastName,
        email,
        mobile,
        address1,
        address2,
        selectedCountry,
        selectedState,
        zipCode}=req.body
  
    try {
    
      const user = await eDetail.findById(userId);
  
      if (!user) {
       
        return res.status(404).json({ message: "User not found" });
      }
  
     
      user.FirstName = firstname;
      user.LastName = lastName;
      user.Email=email;
      user.Mobile=mobile;
      user.Address1=address1;
      user.Address2=address2;
      user.Country=selectedCountry;
      user.State=selectedState;
      user.ZipCode=zipCode;
  
      const updatedUser = await user.save();
  
      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error updating user");
    }
  });


//delete user

app.delete("/deleteusers/:id", async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await eDetail.deleteOne({ _id: userId });
      
      if (!user) {
        
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching user");
    }
  });






app.listen(3500,()=>{
    console.log("server is running");
})