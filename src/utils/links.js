const bookLinksGenerator=(item)=>{
    const links={
        self:`/books/${item._id}`,
        reviews:`/books/${item._id}/reviews`
    }
    return links;
}
const reviewLinksGenerator=(item)=>{
    const links={
        self:`/reviews/${item._id}`,
        book:`/reviews/${item._id}/book`,
        author: `/reviews/${item._id}/user`,
    }
    return links;
}
const bookIssueLinksGenerator=(item)=>{
    const links={
        self:`/reviews/${item._id}`,
        book:`/reviews/${item._id}/book`,
        author: `/reviews/${item._id}/user`,
    }
    return links;
}


module.exports={
    bookLinksGenerator,
    reviewLinksGenerator,
    bookIssueLinksGenerator
}