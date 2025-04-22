const bookLinksGenerator=(item)=>{
    const links={
        self:`/books/${item._id}`,
        reviews:`/books/${item._id}/reviews`
    }
    return links;
}


module.exports={
    bookLinksGenerator
}