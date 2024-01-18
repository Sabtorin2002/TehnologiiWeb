// import express from 'express'
// import cors from 'cors'
// import Sequelize from 'sequelize'
// const Op = Sequelize.Op

// const sequelize = new Sequelize({
//     dialect:'sqlite',
//     storage:''
// })

// const Participant = sequelize.define('participant',{
//     Nume:Sequelize.STRING,
//     Prenume:Sequelize.STRING,
//     CNP:Sequelize.INTEGER,
//     CodEveniment:INTEGER,
//     Gen:Sequelize.STRING,
//     Email:Sequelize.STRING,
//     Parola:Sequelize.STRING
// })

// await sequelize.sync({alter:true})

// const app = express();

// app.use(cors())
// app.use(express.json())

// const express = require('express');
// const cors = require('cors');
// const app = express();
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

let db = new sqlite3.Database('ParticipantiEveniment.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the access database.');
});

const dbParticipant = new sqlite3.Database('ParticipantiEveniment.db');
const dbEveniment = new sqlite3.Database('ParticipantiEveniment.db');
const dbOrganizator = new sqlite3.Database('ParticipantiEveniment.db');
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.post('/login', (req,res) =>{
  const{username, password}=req.body;

  dbParticipant.all('SELECT * FROM participanti WHERE Username = ? AND Parola = ?', [username, password], (err, rows)=>{
    if(err){
      console.error(err);
      throw err;
    }
    if(rows.length > 0){
      res.send({validation:true, user:rows[0]});
    }else{
      res.send({validation:false});
    }
  })
})

app.post('/OELogIn', (req, res) =>{
  const{username, password} = req.body;
  dbOrganizator.all('SELECT * FROM organizatori WHERE Nume = ? AND Parola = ?', [username, password], (err, rows) => {
    if(err){
      console.error(err);
      throw err;
    }
    if(rows.length > 0){
      res.send({validation:true, user:rows[0]});
      console.error("E ok in server");
    }else{
      res.send({validation:false});
    }
  })
})


app.post('/signup', (req, res) =>{
  const{nume, prenume, cnp, gen, username, password, codEveniment} = req.body;

  dbParticipant.run('INSERT INTO participanti(Nume, Prenume, CNP, Gen, Username, Parola, CodEveniment) VALUES(?, ?, ?, ?, ?, ?, ?)',
  [nume, prenume, cnp, gen, username, password, codEveniment],(err) =>{
    if(err){
      // console.error('Eroare SQL la adaugarea in baza de date:', err);
      if (err.message.includes('UNIQUE constraint failed: participanti.CodEveniment')) {
        res.status(400).send({ validation: false, error: "Utilizatorul cu acest username deja există." });
      } else {
        res.status(500).send({ validation: false, error: "Eroare la adaugarea in baza de date" });
      }
    }else{
      console.log('Utilizatorul a fost adaugat cu succes in baza de date');
      res.send({validation:true, message:'Inregistrare reusita!'});
    }
  });
});

app.post('/organizeazaEveniment', (req, res) =>{
  const{nume, start, durata, locatie, codAcces} = req.body;

  dbEveniment.run('INSERT INTO evenimente(Nume, Start, Durata, Locatie, CodAcces) VALUES(?, ?, ?, ?, ?)',
  [nume, start, durata, locatie, codAcces], (err) =>{
    if(err){
      if(err.message.includes('UNIQUE constraint failed: evenimente.CodAcces')){
        res.status(400).send({validation: false, error:"Acest eveniment nu exista."});
      }else{
        res.status(500).send({validation:false, error:"Eroare la adaugarea in baza de date."});
      }
    }else{
      console.log("Evenimentul a fost adaugat cu succes in baza de date.");
      res.send({validation:true, message:"Inregistrare reusita"});
    }
  });
});

app.post('/OESignUp', (req, res) =>{
const{nume, adresa, parola} = req.body;
dbOrganizator.run('INSERT INTO organizatori(Nume, Adresa, Parola) VALUES(?, ?, ?)',
[nume, adresa, parola], (err) =>{
  if(err){
    if(err.message.includes('UNIQUE constraint failed: organizatori.Adresa')){
      res.status(400).send({validation:false, error:"Acest organizator nu exista."});
    }else{
      res.status(500).send({validation:false, error:"Eroare la adaugarea in baza de date."})
    }
  }else{
    console.log("Organizatorul a fost adaugat cu succes in baza de date.");
    res.send({validation:true, message:"Inregistrare reusita"});
  }
});
});
// app.post('/login/:eid', (req, res) =>{
//   const{prezenta} = req.body;
//   dbParticipant.run('INSERT INTO participanti(Prezent) VALUES(?)',
//   [prezenta], (err) => {
//     if(err){
//       if(err.message.includes('UNIQUE constraint failed: participanti.Prezent')){
//         res.status(400).send({validation:false, error:"Nu s-a introdus in baza de date."});
//       }else{
//         res.status(500).send({validation:false, error:"Eroare la adaugarea in baza de date."});
//       }
//     }else{
//       console.log("S-a adaugat starea in baza de date.");
//       res.send({validation:true, message:"Inregistrare reusita"});
//     }
//   })
// })

app.get('/PaginaOrganizator', (req, res) =>{
dbEveniment.all('SELECT CodAcces FROM evenimente', (err, rows) =>{
  if(err){
    console.error(err);
    res.status(500).send({error:'Eroare la obtinerea datelor despre evenimente.'});
  }else{
    res.send(rows);
    console.log("S-au trimis codurile.");
  }
})
});

app.get('/PaginaOrganizator/ListaParticipanti', (req, res) =>{
  dbParticipant.all('SELECT Nume, Prenume, CodEveniment FROM participanti WHERE CodEveniment > 0', (err, rows) =>{
    if(err){
      console.error(err);
      res.status(500).send({error:'Eroare la obtinerea datelor despre participanti.'});
    }else{
      res.send(rows);
      console.log("S-au trimis participantii.");
    }
  })
})






