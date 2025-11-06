import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const port = 3000;

const __dirname = "/Users/kabilesh/Desktop/student registration/public";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views')); 

const db = new pg.Client({
  user: "postgres",
  host: "localhost",  
  database: "student registeration",
  password: "pandiselvi",
  port: 5432,
});
db.connect();

app.get("/", async (req, res) => {
  res.render("register.ejs", {emailUniqueError : "", name : "", email : "", createPassword : "", confirmPassword : ""});
});

app.post("/register", async (req, res) => {
  const name = req.body.name.trim();
  const email = req.body.email.trim();
  const createPassword = req.body.create_password;
  const confirmPassword = req.body.confirm_password;

  const response = await db.query("SELECT email FROM login WHERE email = $1", [email]);
  const existingEmail = response.rows[0];
  if(existingEmail){
    res.render("register.ejs", {emailUniqueError : "Email already registered", name : name, email : email, createPassword : createPassword, confirmPassword : confirmPassword});
  }else{
  await db.query("INSERT INTO login (name, email, password) VALUES ($1, $2, $3)", [name, email, createPassword]);
  res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  res.render("login.ejs", {email : "", password : "", error : ""});
});

app.post("/pass_check", async (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;
  const result = await db.query("SELECT password FROM login WHERE email = $1", [Email]);
  if (result.rows.length < 1 ){
      res.render(("login.ejs"), {error : "Your email and password does not match", email : Email, password : Password});
  }else{
    const  originalPass = result.rows[0].password;
    if (originalPass === Password){
      const response = await db.query("SELECT * FROM student_detail ORDER BY register_number");
  const result = response.rows;
  res.render("student.ejs", {userData : result, registerNumber : "", firstName : "", lastName : "", email : "", phoneNumber : "", DOB : null, gender : "", address : "", editId : "", editRegisterNumber : "", editFirstName : "", editLastName : "", editEmail : "", editPhoneNumber : "", editDOB : "", editGender : "", editAddress : "", token : "123456789"});
    }else{
      res.render(("login.ejs"), {error : "Your email and password does not match", email : Email, password : Password});
    }
  }
 });

app.get("/logout", (req, res) => {
  res.redirect("/login");
});

app.get("/student", async (req, res) => {
  const response = await db.query("SELECT * FROM student_detail ORDER BY register_number");
  const result = response.rows;
  res.render("student.ejs", {userData : result, registerNumber : "", firstName : "", lastName : "", email : "", phoneNumber : "", DOB : null, gender : "", address : "", editId : "", editRegisterNumber : "", editFirstName : "", editLastName : "", editEmail : "", editPhoneNumber : "", editDOB : "", editGender : "", editAddress : "", token : "token"});
});

app.post("/add", async (req, res) => {
    const registerNumber = req.body.register_number;
    const firstName = req.body.first_name.trim();
    const lastName = req.body.last_name.trim();
    const email = req.body.email.trim();
    const phoneNumber = req.body.phone_number;
    let DOB = req.body.dob;
    if (DOB === "") {
      DOB = null;
    }
    const gender = req.body.gender;
    const address = req.body.address;

    const response = await db.query("SELECT email FROM student_detail WHERE email = $1", [email]);
    const existingEmail = response.rows[0];
    
    if(existingEmail){
    }else{
      await db.query("INSERT INTO student_detail (register_number, first_name, last_name, email, phone_number, date_of_birth, gender, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [registerNumber, firstName, lastName, email, phoneNumber, DOB, gender, address]);
      res.redirect("/student");
    }
    
  });

  app.get("/cancel", (req, res) => {
    res.redirect("/student");
  });

  app.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await db.query("DELETE FROM student_detail WHERE id = $1", [id]);
    res.redirect("/student");
  });

  app.post("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const response = await db.query("SELECT * FROM student_detail WHERE id = $1", [id]);
    const resp = await db.query("SELECT * FROM student_detail");
    const wholeData = resp.rows;
    const editUserData = response.rows[0];
    const gotDOB = editUserData.date_of_birth;
    const string = gotDOB.toISOString().split('T')[0];
    const DOB = string.split("T"[0]);
    res.render("student.ejs", {userData : wholeData, editId : editUserData.id, editRegisterNumber : editUserData.register_number, editFirstName : editUserData.first_name, editLastName : editUserData.last_name, editEmail : editUserData.email, editPhoneNumber : editUserData.phone_number, editDOB : DOB[0], editGender : editUserData.gender, editAddress : editUserData.address, registerNumber : "", firstName : "", lastName : "", email : "", phoneNumber : "", DOB : null, gender : "", address : "", token : ""});
  });

  app.post("/update/:id", async (req, res) => {
    const id = req.params.id;
    const editRegisterNumber = req.body.edit_register_number;
    const editFirstName = req.body.edit_first_name;
    const editLastName = req.body.edit_last_name;
    const editEmail = req.body.edit_email
    const editPhoneNumber = req.body.edit_phone_number;
    const editDOB = req.body.edit_dob;
    const editGender = req.body.edit_gender;
    const editAddress = req.body.edit_address;
    
    const response = await db.query("UPDATE student_detail SET register_number = $1, first_name = $2, last_name = $3, email = $4, phone_number = $5, date_of_birth = $6, gender = $7, address = $8 WHERE id = $9", [editRegisterNumber, editFirstName, editLastName, editEmail, editPhoneNumber, editDOB, editGender, editAddress, id]);
    res.redirect("/student");
    });

app.get("/attendance", async (req, res) => {
  const response = await db.query("SELECT * FROM student_detail");
  const result = response.rows;
  res.render("attendance.ejs", {userData : result});
});

app.get("/mark", async (req, res) => {
  const response1 = await db.query("SELECT first_name, last_name, register_Number FROM student_detail ORDER BY register_number");
  const name = response1.rows;
  const response2 = await db.query("SELECT student_detail.register_number, student_detail.first_name, student_detail.last_name,mark.tamil, mark.english, mark.maths, mark.science, mark.social_science, mark.total, mark.grade FROM student_detail JOIN mark ON student_detail.register_number = mark.register_number;");
  const mark = response2.rows;
  res.render("mark.ejs",  {editRegisterNumber : "", editName : "", editTamil : "", editEnglish : "", editMaths : "", editScience : "", editSocialScience : "", editTotal : "", name : name, mark : mark});
});

app.post("/addmark", async (req, res) => {
  const registerNumber = req.body.register_number;
  const getName = await db.query("SELECT first_name, last_name from student_detail WHERE register_number = $1", [registerNumber]);
  const firstName = getName.rows[0].first_name;
  const lastName = getName.rows[0].last_name;
  const name = firstName + " " + lastName;
  const tamil = req.body.tamil;
  const english = req.body.english;
  const maths = req.body.maths;
  const science = req.body.science;
  const socialScience = req.body.social_science;
  const total = req.body.total;
  let grade = "FAIL" ;
  
  if (tamil >= 35 && english >= 35 && maths >= 35 && science >= 35 && socialScience >= 35) {
   if (total >= 175){
    grade = "C";
   } 
   if (total >= 300){
    grade = "B"
   } 
   if (total >= 350){
    grade = "B+"
   } 
   if (total >= 400){
    grade = "A"
   } 
   if (total >= 450){
    grade = "A+"
   }
  }

  const response = await db.query("INSERT INTO mark VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [registerNumber, name, tamil, english, maths, science, socialScience, total, grade]);
  res.redirect("/mark");
});

app.post("/deletemark", async (req, res) => {
  const registerNumber = req.body.register_number;
  const response = await db.query("DELETE from mark WHERE register_number = $1", [registerNumber]);
  res.redirect("/mark");
});

app.get("/markcancel", (req, res) => {
  res.redirect("/mark");
});

app.post("/getmarkforedit/:register_number",async (req, res) => {
  const response1 = await db.query("SELECT first_name, last_name, register_Number FROM student_detail ORDER BY register_number");
  const name = response1.rows;
  const response2 = await db.query("SELECT student_detail.register_number, student_detail.first_name, student_detail.last_name,mark.tamil, mark.english, mark.maths, mark.science, mark.social_science, mark.total, mark.grade FROM student_detail JOIN mark ON student_detail.register_number = mark.register_number;");
  const mark = response2.rows;
  const registerNumber = req.params.register_number;
  const response = await db.query("SELECT * FROM mark WHERE register_number = $1", [registerNumber]);
  const result = response.rows[0];
  res.render("mark.ejs", {editRegisterNumber : result.register_number, editName : result.name, editTamil : result.tamil, editEnglish : result.english, editMaths : result.maths, editScience : result.science, editSocialScience : result.social_science, editTotal : result.total, name : name, mark : mark});
});

app.post("/editmark/:registernumber", async (req, res) => {
  const registerNumber = req.params.registernumber;
  const editTamil = req.body.hiddenTamil;
  const editEnglish = req.body.hiddenEnglish;
  const editMaths = req.body.hiddenMaths;
  const editScience = req.body.hiddenScience;
  const editSocialScience = req.body.hiddenSocialScience;
  const editTotal = req.body.hiddenTotal;

  let editGrade = "FAIL" ;
  
  if (editTamil >= 35 && editEnglish >= 35 && editMaths >= 35 && editScience >= 35 && editSocialScience >= 35) {
   if (editTotal >= 175){
    editGrade = "C";
   } 
   if (editTotal >= 300){
    editGrade = "B"
   } 
   if (editTotal >= 350){
    editGrade = "B+"
   } 
   if (editTotal >= 400){
    editGrade = "A"
   } 
   if (editTotal >= 450){
    editGrade = "A+"
   }
  }
  
  const response = await db.query("UPDATE mark SET tamil = $1, english = $2, maths = $3, science = $4, social_science = $5, total = $6, grade = $7 WHERE register_number = $8", [editTamil, editEnglish, editMaths, editScience, editSocialScience, editTotal, editGrade, registerNumber]);
  res.redirect("/mark");
});

app.listen(port, () => {
  console.log("Server running on port ", port);
});