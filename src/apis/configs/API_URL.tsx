const JsonServiceUrl ='http://localhost:4000'

export const API_URL ={
    Blogs:{
        GET_PAGINATED_BLOGS: JsonServiceUrl + '/blogs',
        GET_BLOG_BY_ID: JsonServiceUrl + '/blogs/',
        UPDATE_BLOG_BY_ID: JsonServiceUrl + '/blogs/',
        CREATE_BLOG_BY_ID: JsonServiceUrl + '/blogs'
    }
}