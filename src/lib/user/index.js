const Profile = require("../../model/Profile");
const User = require("../../model/User");
const error = require("../../utils/error");

const findUserByEmail=async(email)=>{
    //return user or false
    const user=await User.findOne({email})
    return user?user:false;
}

const userExit=async(email)=>{
    //return true or false
    const user=await findUserByEmail(email)
    return user?true:false;
}

const createUser=async({username,email,password,role='user'})=>{
    //create user
    const user=new User({username,email,password,role})
    const profile=new Profile({user:user?._id})
    await user.save()
    await profile.save()
    return user._doc
}

const findAllItems=async({
    page=defaults.page,
    sort_type=defaults.sort_type,
    limit=defaults.limit,
    search=defaults.search,
    sort_by=defaults.sort_by
})=>{
    const sortStr=`${sort_type==='dsc' ? '-' : ''}${sort_by}`;

     //filter books
     const filter={
        $or:[
            {username:{$regex: search, $options: 'i'}},
            {phone:{$regex: search, $options: 'i'}}
        ]
    }

    const user=await User.find(filter)
        .populate({
            path: 'profile',
            select:'firstName lastName city village phone dateOfBirth avator',
            strictPopulate:false
        })
        .sort(sortStr)
        .skip(page*limit - limit)
        .limit(limit)
    
    return user;

    
}

const count=({search=''})=>{
    const filter={
        $or:[
            {username:{$regex: search, $options: 'i'}},
            {phone:{$regex: search, $options: 'i'}}
        ]
    }

    return User.countDocuments(filter)
}

const findSingleItem=async(id)=>{
    const user=await User.findById(id)
    .select('-password')
    .populate({
        path: 'profile',
        select:'firstName lastName city village phone dateOfBirth avator -user',
        strictPopulate:false
    })

    return user;
}

module.exports={
    findUserByEmail,
    userExit,
    createUser,
    findAllItems,
    count,
    findSingleItem

}