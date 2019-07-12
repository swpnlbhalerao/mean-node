const mongoose=require('mongoose');
 

const businessSchema=new mongoose.Schema({
    person_name: String,
    business_name: String,
    business_gst_number: Number,
})



module.exports=mongoose.model('business',businessSchema);