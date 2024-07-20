import User from "./user"

export default interface Comment{
    _id?:string|null
    comment:string
    commenter:User
  parentId:string|null
}