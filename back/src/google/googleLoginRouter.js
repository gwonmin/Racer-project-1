import { Router } from "express";
import { googleVerify } from "./googleLogIn.js"
import { checkAuthenticated } from "./checkGoogleAuth.js"

const cookieParser = require('cookie-parser')
const googleUserAuthRouter = Router();

// 쿠키 정보
googleUserAuthRouter.use(cookieParser());
// googleUserAuthRouter.use(express.json());
// googleUserAuthRouter.use(express.static('public'));

// 구글 로그인 화면
googleUserAuthRouter.get('/googlelogin', (req,res)=>{
    // views 파일의 login.ejs
    res.sendFile(__dirname + '/GoogleLogin_old.html');
})

// 구글 토큰 세션에 저장하기
googleUserAuthRouter.post("/googlelogin", (req, res)=>{
    let token = req.body.token;
    googleVerify()
    .then(()=>{
        res.cookie('session-token', token);
        res.send('success');  
    })
    .catch(console.error);
});

// 구글 유저 정보 가져오기
googleUserAuthRouter.get('/googleProfile', checkAuthenticated, (req, res)=>{
    let user = req.user;
    res.render('profile', { user });
})


googleUserAuthRouter.get('/protectedRoute', checkAuthenticated, (req,res)=>{
    res.send('This route is protected')
})

// 구글 로그아웃
googleUserAuthRouter.get('/googleLogout', (req, res)=>{
    res.clearCookie('session-token');
    res.sendFile(__dirname + 'GoogleLogin_old.html');
})

export { googleUserAuthRouter };