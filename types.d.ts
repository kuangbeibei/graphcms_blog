export interface Author {
    bio: string
    name: string
    id: string
    photo: {
        url: string
    }
}

export interface Categories {
    name: string
    slug: string
}

export interface Post {
    author: Author
    excerpt: string
    slug: string
    title: string
    featuredImage: {
        url: string
    }
    categories: Array<Categories>
    [k: string]: any
}

export interface WidgetPost {
    title: string
    createdAt: string
    featuredImage: {
        url: string
    }
    [k: string]: any
}

export interface ContentObj {
    text: string
    [k: string]: any
}

export interface ContentTypeObj {
    type: string
    children: Array<ContentObj>
}

export interface CommentObj {
    name: string
    email: string
    comment: string
    slug?: string
    createdAt?: string
    [k: string]: any
}
