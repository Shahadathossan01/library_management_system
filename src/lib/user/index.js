const BookIssue = require("../../model/BookIssue");
const Profile = require("../../model/Profile");
const Review = require("../../model/Review");
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

const updateItemPatch=async({id,username,firstName, lastName,city,village,phone,dateOfBirth,avator,role})=>{

    //update user
    const user=await User.findById(id).select('-password')
        
    if(!user) throw error('User not found',400)
    
    user.username=username ?? user.username;
    user.role=role ?? user.role

    //update profile
    const profile=await Profile.findOne({user:user._id})

    const payload={
        firstName,
        lastName,
        city,
        village,
        phone,
        dateOfBirth,
        avator
    }
    
    Object.keys(payload).forEach((key)=>{
        profile[key]=payload[key] ?? profile[key]
    })

    //save updated user and profile to database
    await user.save()
    await profile.save()

    //find updated user after update user and profile
    const updatedUser=await User.findById(id)
        .select('-password')
        .populate({
            path: 'profile',
            select:'firstName lastName city village phone dateOfBirth avator -user',
            strictPopulate:false
        })

    return updatedUser;
}

const removeItem=async(id)=>{
    const user=await User.findById(id)
    if(!user) error('User not found',400)

    await Profile.deleteOne({user:user._id})
    await BookIssue.deleteMany({user:user._id})
    await Review.deleteMany({user:user._id})

    return await User.findByIdAndDelete(id)


}

const findBookIssuesByUserId=async({id,page,limit,sort_type,sort_by})=>{
        const user=await User.findById(id)
        if(!user) throw error('User not found',400)

        const sortStr=`${sort_type==='dsc' ? '-' :''}${sort_by}`

        const bookIssues=await BookIssue.find({user:user._id})
        .populate({
            path: 'book',
            select: '_id name authorName summary image createdAt updatedAt'
        })
        .populate({
            path: 'user',
            select: '_id username email role createdAt updatedAt'
        })
        .sort(sortStr)
        .skip(page*limit -limit)
        .limit(limit)

    if(bookIssues.length === 0)throw error('Requested Resource not found',400)
    
    return bookIssues;
}
module.exports={
    findUserByEmail,
    userExit,
    createUser,
    findAllItems,
    count,
    findSingleItem,
    updateItemPatch,
    removeItem,
    findBookIssuesByUserId

}