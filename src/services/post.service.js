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
    getDefaultFilter,
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(POST_KEY)
        .then(posts => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                posts = posts.filter(post => regex.test(post.vendor))
            }
            if (filterBy.minSpeed) {
                posts = posts.filter(post => post.maxSpeed >= filterBy.minSpeed)
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

function getEmptyPost(title = '', likes = '', byUser = '') {
    return {
        id: '',
        title,
        description: '',
        byUser: 'Admin',
        likes,
        date: new Date(),
        isLiked: false,
        // thumbnail: '',
        // emoji: {
        //     like: 10,
        //     unlike: 0,
        // },
    }
}

function getDefaultFilter() {
    return { txt: '', like: '', date: '' }
}

function _createPosts() {
    let posts = utilService.loadFromStorage(POST_KEY)
    if (!posts || !posts.length) {
        posts = []
        posts.push(_createPost('hey guys', 50, 'shlomi'))
        posts.push(_createPost('My tutorial', 50, 'shani'))
        posts.push(_createPost('welcome to my page', 150, 'aviad'))
        utilService.saveToStorage(POST_KEY, posts)
    }
}

function _createPost(title, like = 10) {
    const post = getEmptyPost(title, like)
    post.id = utilService.makeId()
    return post
}