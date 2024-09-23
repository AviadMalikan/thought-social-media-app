import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const POST_KEY = 'postDB'
_createPosts()

export const postService = {
    query,
    get,
    remove,
    save,
    getEmptyPost,
    getEmptyComment,
    getDefaultFilter,
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(POST_KEY)
        .then(posts => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                posts = posts.filter(post => regex.test(post.txt))
            }
            if (filterBy.likes) {
                posts = posts.filter(post => post.likes >= filterBy.likes)
            }
            if (filterBy.byUser) {
                const regex = new RegExp(filterBy.txt, 'i')
                posts = posts.filter(post => regex.test(post.byUser))
            }
            return posts
        })
}

function get(postId) {
    return storageService.get(POST_KEY, postId)
    // return axios.get(POST_KEY, postId)
}

function remove(postId) {
    return storageService.remove(POST_KEY, postId)
}

function save(post) {
    console.log('post: ', post)
    if (post.id) {
        return storageService.put(POST_KEY, post)

    } else {
        return storageService.post(POST_KEY, post)
    }
}

function getEmptyPost(text = '', likes = 0, byUser = 'guest') {
    return {
        id: '',
        author: {
            userName: byUser,
            profilePic: '',
        },
        content: {
            text,
            media: [],
        },
        metics: {
            likes: likes,
            share: 0,
            comments: [],
        },
        isLiked: false,
        date: '',
    }
}

function getEmptyComment(text = '', likes = 0, byUser = 'guest') {
    return {
        id: '',
        author: {
            userName: byUser,
            profilePic: '',
        },
        content: {
            text,
            media: [],
        },
        metics: {
            likes: likes,
        },
        isLiked: false,
        date: '' || new Date(),
    }
}

function getDefaultFilter() {
    return { txt: '', likes: '', byUser: '' }
}


function _createPost(txt, like = 10, byUser) {
    const post = getEmptyPost(txt, like, byUser)
    post.id = utilService.makeId()
    return post
}

function _createPosts() {
    let posts = utilService.loadFromStorage(POST_KEY)
    if (!posts || !posts.length) {
        posts = []
        posts.push(_createPost('hey guys', 50, 'shlomi'))
        posts.push(_createPost('My tutorial', 7, 'shani'))
        posts.push(_createPost('welcome to my page', 150, 'aviad'))
        posts.push(_createPost('lorem lipstum of the number six because i think that all i need is live and love but no i dont think so because tha book its pretty but not enough so finally i think yes', 150, 'aviad'))
        utilService.saveToStorage(POST_KEY, posts)
    }
}