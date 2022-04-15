const introduce=(data)=>{
    let link;
    switch(data.content_type){
        case "text":
        link=`/bookIntroduce/${data.novel_name_id}`
        break
        case "png":
        link=`/comicIntroduce/${data.comic_name_id}`
        break
        default:
        link=`/bookIntroduce/${data.novel_name_id}`
    }
    return link;
}




export {introduce};