// read files
const fs = require('fs') // file system
fs.readFile('./docs/blog1.txt', (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data.toString())
})
// writing file
fs.writeFile('./docs/blog1.txt', 'Hello world!', (err) => {
    if (err) {
        console.log(err)
    }
    console.log('File Has written')
})

fs.writeFile('./docs/blog2.txt', 'Hello again!', (err) => {
    if (err) {
        console.log(err)
    }
    console.log('File Has written')
})

// Directories
if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('Folder created!')
    })
} else {
    fs.rmdir('./assets', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('Folder created!')
    })
}

if (fs.existsSync('./docs/deleteme.txt')) {
    fs.unlink('./docs/deleteme.txt', (err) => {
        if (err) {
            console.log(err)
        }
        console.log('File deleted.')
    })
}
