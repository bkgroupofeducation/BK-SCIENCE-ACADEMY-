const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });

const Pdf = require('../backend/models/Pdf');

async function checkPdfs() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const pdfs = await Pdf.find();
    console.log('--- PDF RECORDS ---');
    pdfs.forEach(p => {
      console.log(`ID: ${p._id}, Title: ${p.title}, fileUrl: "${p.fileUrl}"`);
    });
    await mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

checkPdfs();
