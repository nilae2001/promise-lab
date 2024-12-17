const fs = require("node:fs/promises");
const { EOL } = require("node:os");
const path = require("node:path");

function checkExists (data, username) {
    const splitData = data.split(EOL);
    for (user of splitData) {
        if(user.split(":")[0] === username) {
            throw new Error(`User "${username}" already exists`)
    }
    }
    return false;
}

function readFile(filename) {
    return fs.readFile(filename, "utf8")
}

function appendFile(filename, username, password) {
    return fs.appendFile(filename, `${username}:${password}${EOL}`);
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  
function mkdir(blogName) {
    return fs.mkdir(blogName)
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkBlogName (blogName) {
    return fs.stat(blogName)
    .then(() => {
        return true; 
    })
    .catch((error) => {
        if (error.code === 'ENOENT') {
            throw new Error(`Blog folder ${blogName} does not exist.`); 
        }
        throw error;
    });
}

function addUnderscore (filename) {
    return filename.replace(" ", "_");
}
    
function pathCreator(filename, folderName) {
    const folderPath = path.join(__dirname, folderName)
    const filePath = path.join(folderPath, filename)
    return filePath;
}


function readDirectory (blogName) {
    return fs.readdir(blogName);
}

function makeUnique(array, filename) {
    let uniquename = filename;
    let counter = 1;

    while (array.includes(uniquename)) {
        uniquename = filename + `_${counter}`;
        counter++;
    }

    return uniquename;
}


function messageCreator (data) {
    let counter = 1;
    let likers = "you";
    let message = `likes:${counter}${EOL}${EOL}likedBy:${likers}${EOL}${EOL}${data}`
    return message
}

function writeFilePost(filepath, data) {
    return fs.writeFile(filepath, data);
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function checkAccountExists (data, username) {
    const splitData = data.split(EOL);
    for (user of splitData) {
        if(user.split(":")[0] === username) {
            return true
    } 
    }
    throw new Error(`User "${username}" does not exist`)
}

function writeFileLikes (filePath, message) {
    return fs.writeFile(filePath, message)
}

function addUnderscoreLike(filename) {
    return filename.replace(" ", "_");
}

function createThePath (filename, foldername) {
    const pathFile = pathCreator(filename, foldername);
    return pathFile;
}

function likesIncrement (data, username) {
    const splitData = data.split(EOL)
    let likesCount = splitData[0]
    let usersLiked = splitData[2]
    let theContent = splitData[4]

    let likesCountSplit = likesCount.split(":")
    let parsed = parseInt(likesCountSplit[1]);
    

    let usersLikedSplit = usersLiked.split(":")
    let usersLikedPosition = `${usersLikedSplit[1]}`

    let users;
    
    if (usersLikedPosition.includes(username)) {
        users = usersLikedPosition
    } else {
        users = `${usersLikedPosition}, ${username}`
        parsed++;
    }

    let message = `likes:${parsed}${EOL}${EOL}likedBy:${users}${EOL}${EOL}${theContent}`;
    return message;
}

function readFileAppend(pathFile) {
    return fs.readFile(pathFile, "utf8")
}



module.exports = {
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
};





// const fs = require("node:fs/promises")

// function check (data) {
//     if() {
//         throw new Error("User exists")
//     }
// }

// function register (username, password) {
//     return fs.readFile("database", "utf8")
//     .then((data) => checkExists(data))
//     .then(() => fs.appendFile("database.txt"))
// }

