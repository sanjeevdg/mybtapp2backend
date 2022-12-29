const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../utils/database.js');
const GlossaryTerm = require('../models/glossaryterm.js');


const tokens = [];


const getTermsList = async (req,res,next) => {

var query = "select id,term,termdesc from glossaryterms";
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);


if (results) {
res.status(200).json({"myterms":results})

}

};


const deleteGlossaryTerm = async (req,res,next) => {

var query = "delete from glossaryterms where id="+req.body.termid;
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);

//if (results) {
res.status(200).json({"message":"Glossary Term delete success."})

//}

};



const getTermById = async (req,res,next) => {

//let myforms = await SpunkyForm.findAll();

var query = "select id,term,termdesc from glossaryterms where id="+req.body.termid;
console.log('uery is'+query);
const [results, metadata] = await sequelize.query(query);


if (results) {
res.status(200).json({"myterm":results})

}

};



const addGlossaryTerm = async (req,res,next) => {

try {
let response = await GlossaryTerm.create({                        
                        term: req.body.term,
                      termdesc: req.body.termdesc                       
                    });

if (response) {
console.log('within if response');
res.status(200).json({"glossaryterm":response});
}
else { res.status(500).json({"message":"glossary term error"});}
}
catch (e) {

    console.log('newerror is:'+e.message);
    res.status().json({"message":"try reporting error occur"});


} 

return res;
};

const editGlossaryTerm = async (req,res,next) => {

try {
let response = await GlossaryTerm.update({                        
                        term: req.body.term,
                      termdesc: req.body.termdesc                       
                    },   {
    where: {
    id: req.body.termid   
  }
});

if (response) {
console.log('within if response');
res.status(200).json({"glossaryterm":response});
}
else { res.status(500).json({"message":"glossary term error"});}
}
catch (e) {

    console.log('newerror is:'+e.message);
    res.status().json({"message":"try reporting error occur"});


} 

return res;
};


module.exports = {addGlossaryTerm,editGlossaryTerm,deleteGlossaryTerm, getTermById,getTermsList} ;
