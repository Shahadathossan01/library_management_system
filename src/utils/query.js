const defaults = require("../config/defaults");
const error = require("./error");
const { generateQueryString } = require("./qs");

const getTransformedItems=({items=[],selection=[],linkGenerator=null})=>{
    if(!Array.isArray(items) || !Array.isArray(selection)) throw error('Invalid items or selections',400)
    
    const transFormedItems= items.map((item)=>{
        //generate links in this item
        const links=typeof linkGenerator==='function' ? linkGenerator(item) : {};

        if(selection.length===0){
            return items.map((item)=>({...item,links}));
        }
        const result={};
        selection.forEach((key)=>{
            result[key]=item[key]
        })
        result.links=links
        return result
    })

    return transFormedItems;
}

const getPagination=({
    totalItems=defaults.totalItems,
    limit=defaults.limit,
    page=defaults.page
})=>{
    const totalPage=Math.ceil(totalItems/limit)
    
    const pagination={
        page,
        limit,
        totalItems,
        totalPage,
    }

    //add next when page number is less then totalPage
    if(page<totalPage){
        pagination.next=page+1
    }

    //add prev when page number is grater then 1
    if(page>1){
        pagination.prev=page-1
    }

    return pagination;
}
const getHATEOASForAllItems=({
    url='/',
    path='',
    query={},
    hasNext=false,
    hasPrev=false,
    page=1
})=>{
    const links={
        self:url
    }
    if(hasNext){
        const queryStr=generateQueryString({...query,page:page+1})
        links.next=`${path}?${queryStr}`
    }
    if(hasPrev){
        const queryStr=generateQueryString({...query,page:page-1})
        links.prev=`${path}?${queryStr}`
    }
    return links
}


module.exports={
    getTransformedItems,
    getPagination,
    getHATEOASForAllItems
}