import User from "./user"

export default interface Article{
    id?:string
    title:string
    content:string
    image:string
    date?:string
    author:User
    comments:[]
}