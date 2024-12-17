// only logic imports and .then() statements 

const {
    checkExists,
    checkAccountExists,
    addUnderscore,
    pathCreator,
    makeUnique,
    addUnderscoreLike,
    likesIncrement,
    messageCreator,
    readFile,
    appendFile,
    mkdir,
    writeFilePost,
    readDirectory,
    writeFileLikes,
    createThePath,
    readFileAppend,
    checkBlogName
} = require('./logic');


function register(username, password) {
    return readFile("database.txt")
    .then((data) => checkExists(data, username))
    .then(() => appendFile("database.txt", username, password))
    .then(() => console.log("User was created!"))
    .catch((error) => console.error(error.message));
}

function createABlog(blogName) {
    return mkdir(blogName)
    .then(() => console.log("Blog successfully created"))
    .catch((error) => {
        if (error.code === 'EEXIST') {
            throw new Error("Blog already exists")
        } else {
            throw error;
        }
    })
}


function createPost(postTitle, postContent, blogName) {
    return checkBlogName(blogName) 
        .then(() =>  readDirectory(blogName))
        .then((files) => {
            const underScoredTitle = addUnderscore(postTitle);
            const uniqueTitle = makeUnique(files, underScoredTitle);
            const filePath = pathCreator(uniqueTitle, blogName);
            const message = messageCreator(postContent);
            return writeFilePost(filePath, message)
        })
        .then(() => console.log("Post successfully created!"))
        .catch((error) => console.error(error.message));
    
}

function likePost(blogName, postTitle, username) {
    return readFile("database.txt")
    .then((data) => checkAccountExists(data, username))
    .then(() => addUnderscoreLike(postTitle))
    .then((underscoredPost) => createThePath(underscoredPost, blogName))
    .then((pathFile) => {
        return readFileAppend(pathFile) 
            .then((fileInfo) => { 
                const likesUpdate = likesIncrement(fileInfo, username); 
                return writeFileLikes(pathFile, likesUpdate); 
            });
    })
    .then(() => console.log("Post successfully updated!"))
    .catch((error) => console.error(error.message))
}

// Testing the functions
// register('jane', 'password123');
// register('john', 'password123');
// createABlog('john');
// createPost('first post', 'This is my first post', 'john');
likePost('john', 'first post', 'jane');