import Comment from "./comment"
import User from "./user"
export default interface Article{
    _id?:string|null
    title:string
    content:string
    image:string
    date?:string
    author:User
    comments:[Comment]
}