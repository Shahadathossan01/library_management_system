const create=require('./create')
const findAllItems=require('./findAllItems')
const updateItemPatch=require('./updateItemPatch')
const removeItem=require('./removeItem')
const findSingleItem=require('./findSingleItem')
const findBookByReviewId=require('./findBookByReviewId')
const findAuthorByReviewId=require('./findAuthorByReviewId')
module.exports={
    create,
    findAllItems,
    updateItemPatch,
    removeItem,
    findSingleItem,
    findBookByReviewId,
    findAuthorByReviewId
}