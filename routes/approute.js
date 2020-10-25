const router = require('express').Router()
const sql =  require('mssql');

const config = {
    user: 'michaelG',
    password: 'leah@0949',
    server: 'hshospitalsystem.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'Clients',
    options: {
        encrypt: true
    }
}
sql.connect(config).catch(err => console.error(err));

router.route('/Patients').get((req, res) => {
    sql.query('SELECT * FROM Patients').then(result => res.json(result.recordset));
}).post((req,res) => {
    (async function (){
        try{
            const pool = await sql.connect(config).catch(err => console.log(err))
            const result =  await pool.request()
                .input('Patient_id',req.body.Patient_id)
                .input('Firstname',req.body.Firstname)
                .input('Lastname',req.body.Lastname)
                .input('Addresses',req.body.Addresses)
                .input('Email',req.body.Email)
                .input('TelePhone',req.body.TelePhone)
                .input('Age', req.body.Age)
                .input('Sex', req.body.Sex)
                .input('Health_status', req.body.Health_status)
                .input('Transaction_status', req.body.Transaction_status)
                .query(`INSERT INTO Patients (Patient_id,FirstName,LastName, Addresses,Email,TelePhone,Age,Sex,Health_status,Transaction_status )
VALUES(@Patient_id,@FirstName,@LastName, @Addresses,@Email,@TelePhone,@Age,@Sex,@Health_status,@Transaction_status);`)

       res.send(result);
        }catch(err){
            console.log(err);
        }
    }())
});

router.route('/Employees').get((req, res) => {
    sql.query('SELECT * FROM Employees').then(result => res.json(result.recordset));
}).post((req,res) => {
    (async function (){
        try{
            const pool = await sql.connect(config).catch(err => console.log(err))
            const result =  await pool.request()
                .input('Employee_id',req.body.Employee_id)
                .input('Firstname',req.body.Firstname)
                .input('Lastname',req.body.Lastname)
                .input('Marital_status',req.body.Marital_status)
                .input('Position',req.body.Position)
                .input('Qualification',req.body.Qualification)
                .input('Email',req.body.Email)
                .input('Sex',req.body.Sex)
                .input('TelePhone',req.body.TelePhone)
                .input('Agreed_Pay',req.body.Agreed_Pay)
                .input('Addresses',req.body.Addresses)
                .query(
                    `INSERT INTO Employees 
                    (Employee_id,Firstname,Lastname,Marital_status,Position,Qualification,Email,Sex,TelePhone,Agreed_Pay,Addresses)
                    VALUES
                    (@Employee_id,@Firstname,@Lastname,@Marital_status,@Position,@Qualification,@Email,@Sex,@TelePhone,@Agreed_Pay,@Addresses)`);

            res.send(result)

        }catch(err) {
           console.log(err)
        }
    }());
});

router.route('/Appointments').get((req, res) => {
    sql.query('SELECT * FROM Appointments ORDER BY Time_of_appointment').then(result => res.json(result.recordset));
}).post((req,res) => {
    (async function (){
        try {
            const pool = await sql.connect(config).catch(err => console.log(err));
            const result = await pool.request()
                .input('Patient_id', req.body.Patient_id)
                .input('Firstname', req.body.Firstname)
                .input('Lastname', req.body.Lastname)
                .input('Addresses', req.body.Addresses)
                .input('Email', req.body.Email)
                .input('Marital_status', req.body.Marital_status)
                .input('TelePhone', req.body.TelePhone)
                .input('Age', req.body.Age)
                .input('Sex', req.body.Sex)
                .input('Reason', req.body.Reason)
                .input('Doctor', req.body.Doctor)
                .input('Date_of_appointment', req.body.Date_of_appointment)
                .input('Time_of_appointment', req.body.Time_of_appointment)
                .input('Payment_method', req.body.Payment_method)
                .query(`INSERT INTO Appointments (Patient_id,FirstName,LastName, Addresses,Email,Marital_status,TelePhone,Age,Sex,Reason,Doctor,Date_of_appointment,Time_of_appointment,Payment_method)
                     VALUES(@Patient_id,@FirstName,@LastName, @Addresses,@Email,@Marital_status,@TelePhone,@Age,@Sex,@Reason,@Doctor,@Date_of_appointment,@Time_of_appointment,@Payment_method);`);

            res.send(result)
        }catch(err){
            console.log(err)
        }

    }())
});

router.route('/Transaction_data')
    .get((req, res) => {
    sql.query('SELECT * FROM Transaction_data').then(result => res.json(result.recordset));
}).post((req,res) => {

});


module.exports = router