const {Schema, model} = require('mongoose');

const DoctorSchema = Schema({
    name:{
        type:String,
        required:true
    },
     img:{
        type: String,
    },
   user:{
    type: Schema.Types.ObjectId,
    ref:'User',
    required:true
   },
   hospital:{
    type: Schema.Types.ObjectId,
    ref:'Hospital',
    required:true
   }

});

//This is for change the way data is showed in response
DoctorSchema.method('toJSON', function(){
    const {__v,_id,...object} = this.toObject();
    object.uid=_id;
    return object;
})

module.exports = model('Doctor', DoctorSchema);
