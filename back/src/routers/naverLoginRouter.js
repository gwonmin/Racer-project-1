import { Router } from "express";
//yarn add request 필요!

const naverLoginRouter = Router();

var client_id = '3wO8fO549CGAeAT0mcNu';
var client_secret = process.env.naverLoginClientSecret;

var code = "";
var state = "RANDOM_STATE";
var redirectURI = encodeURI("http://127.0.0.1:5001/callback");
var api_url = "";

var token = "";
var refreshToken = "";
var header = "Bearer " + token; // Bearer 다음에 공백 추가

//네이버 로그인 api
naverLoginRouter.get('/naverlogin', function (req, res) {
  api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
   res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
   res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
 });
 
 //로그인 토큰정보를 주는 api
naverLoginRouter.get('/callback', function (req, res) {
    code = req.query.code;
    state = req.query.state;
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id='
     + client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // body는 객체타입이 아니라 String이기 때문에 사용하기 쉽도록 객체타입으로 형변환

        let objectBody = JSON.parse(body);
        token = objectBody.access_token;
        refreshToken = objectBody.refresh_token;

        res.status(200).send(objectBody)
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
  });

//회원 프로필 조회 api
naverLoginRouter.get('/member', function (req, res) {
  var api_url = 'https://openapi.naver.com/v1/nid/me';
  var request = require('request');
  //header 업데이트
  var header = "Bearer " + token; 
  var options = {
      url: api_url,
      headers: {'Authorization': header}
    };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // body는 객체타입이 아니라 String이기 때문에 사용하기 쉽도록 객체타입으로 형변환
      let objectBody = JSON.parse(body);

      res.status(200).send(objectBody.response)
    } else {
      console.log('error');
      if(response != null) {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    }
  });
});

export { naverLoginRouter }