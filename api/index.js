const express = require("express")
const app = express()
const cors  = require("cors")
const mongoose = require("mongoose")
const User = require("./model/User")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const multer = require("multer")
const uploadMiddleware = multer({dest: 'uploads/'})
const fs = require("fs")
const Post = require("./model/Post")
const PORT = 8000

const salt = bcrypt.genSaltSync(10)
const secret = 'kjfkjkfmmhjgkfcdshdndhj'

app.use(cors({
    credentials: true,
    origin:'http://localhost:3000'
}))
// to enable Cross-Origin Resource Sharing (CORS). This allows your server to accept requests from different origins (e.g., frontend apps running on a different domain or port).
app.use(express.json());
app.use(cookieParser())

// mongoose.connect('mongodb+srv://tanv:tanvmern_blog@cluster0.uofaycz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
mongoose.connect('mongodb+srv://tanv:tanvmern_blog@cluster0.uofaycz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('MongoDB connected')
}).catch(err => {
    console.error('MongoDB connection error:', err)
});

app.post('/register', async (req, res) => {
    const {username, password} = req.body
    try {
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password, salt)
        })
        res.json(userDoc)
    } catch (e) {
        res.status(400).json(e)
    }

})
// "app.post('/register', ...)"" -> This defines a route that listens for POST requests made to the /register endpoint.
// "const { username, password } = req.body" -> This uses object destructuring to extract username and password from the request body.
// "res.json({ requestData: { username, password } })" -> This sends a JSON response back to the client containing the received username and password.

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    const userDoc = await User.findOne({username})
    if (!userDoc)
        return res.status(400).json("User not found.")
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if(passOk){
        // logged in
        jwt.sign({username,id:userDoc._id}, secret, {}, (err, token) => {
            if (err) throw err
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'Lax',
                secure: false
            }).json({
                id: userDoc._id,
                username
            })
        })
    }
    else{
        res.status(400).json('Wrong Credentials')
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({error: "Token not provided"})
    }
    jwt.verify(token, secret, {}, (err, info) => {
        if(err)
            throw err
        res.json(info)
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: false
    }).json('ok')
})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    // res.json({files: req.file})
    const {originalname, path} = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path+'.'+ext
    fs.renameSync(path, newPath)

    const {title, summary, content} = req.body
    const PostDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath
    })

    res.json(PostDoc)
})

app.get('/post', async (req, res) => {
    res.json(await Post.find())

})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost: ${PORT}`)
})
// URL - http://localhost:8000/

// mongodb+srv://tanv:EuI5sxmUOpmO6jsQ@cluster0.uofaycz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// password: EuI5sxmUOpmO6jsQ
// database password: tanvmern_blog
