const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    pwd:{
        type:String,
        requiired:true,
    },
    img:{
        type: String,
    },
    role:{
        type:String,
        required:true,
        default: 'USER_ROLE'

    },
    google:{
        type:Boolean,
        default:false
    }

});

//This is for change the way data is showed in response
UserSchema.method('toJSON', function(){
    const {__v,_id,pwd,...object} = this.toObject();
    object.uid=_id;
    return object;
})

module.exports = model('User', UserSchema);
