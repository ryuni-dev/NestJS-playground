# NestJS-playground
* NestJS 연습용 프로젝트
  * 게시판 프로젝트
    * 회원가입
    * 유저 별 게시글 관리

## Lecture
* [https://www.youtube.com/watch?v=3JminDpCJNE](https://www.youtube.com/watch?v=3JminDpCJNE)
* 위의 강의를 토대로 NestJS의 기본 틀을 학습

## References
* [https://docs.nestjs.com/](https://docs.nestjs.com/)
* [https://www.youtube.com/watch?v=3JminDpCJNE](https://www.youtube.com/watch?v=3JminDpCJNE)
* [https://wikidocs.net/book/7059](https://wikidocs.net/book/7059)

## Problems
* Typeorm 0.3.x 에서 custom repository 사용 오류 
  * 임시방편으로 아래의 글을 참조하여 문제를 해결하였으나 공식 문서가 제시하는 방향과 다름 
    * [https://greeng00se.tistory.com/57](https://greeng00se.tistory.com/57)
  * 공식 문서에 나온대로 작성하면 custom repository 사용시 오류가 발생하기에 이를 해결할 방안 탐색 필요
* @nestjs/config 모듈을 활용해 환경변수 설정을 하려 했으나 오류 발생
  * (구글링 해봐야 할듯...)
## To Do
- [ ] : 환경변수 설정 파일 오류 해결
- [ ] : Test code 작성
- [ ] : Typeorm 0.3.x 이식 문제 해결
- [ ] : API 문서 자동화
  - [https://docs.nestjs.com/openapi/introduction](https://docs.nestjs.com/openapi/introduction)
  - [https://velog.io/@kimja01/2.-NestJS-Swagger%EB%A1%9C-API-%EB%AC%B8%EC%84%9C-%EC%9E%90%EB%8F%99%ED%99%94%ED%95%98%EA%B8%B0](https://velog.io/@kimja01/2.-NestJS-Swagger%EB%A1%9C-API-%EB%AC%B8%EC%84%9C-%EC%9E%90%EB%8F%99%ED%99%94%ED%95%98%EA%B8%B0)
- [ ] : nodemailer를 활용한 email 인증 시스템 구현
- [ ] : 클린코드 적용
- [ ] : 간단하게 프론트와 연동하여 데모 사이트 만들기
- [ ] : 배포
