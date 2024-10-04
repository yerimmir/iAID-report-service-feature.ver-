# report-service

report-service

## 목차
- [설치 방법](#설치-방법)
- [실행 방법](#실행-방법)
- [테스트](#테스트)
- [Issues](#issues)
- [History](#history)

## 설치 방법
    npm install

## 실행 방법
- Client 실행

        npm run start:wds

- Server 실행

        npm run start

- Storybook 실행

         npm run storybook

- Docker-Copose를 이용한 서버 구동

        docker-compose up -d

## 테스트
- Postman을 이용한 데이터 전송 및 출력
    - public folder의 data.json 참고 및 활용
    1. 요청 방식 Post 선택
    2. Body - raw, 언어 json 선택 후 json 형식의 데이터 추가
    3. 서버 주소 입력 후 Send 클릭
    4. Response 출력되는지 확인

    <p align="center"><image src="postman-images/postman-request.png" width="80%" /></p>
    
    <p align="center">[postman 테스트 예시]</p>

    <p align="center"><image src="postman-images/postman-response.png" width="80%" /></p>

    <p align="center">[보고서 생성 결과]</p>

### Issues

- <ListView> 컴포넌트 사용 시 나타나는 문제
   - HeaderItem Attribute 사용 시, BackGround Color 자동 적용됨

### History

- 문자열에서 사용되는 replaceAll 함수는 Node 버전에 따른 호환성이슈가 발생함으로 인해 replace 함수로 변경함
  수정된 코드는 imageFromSvg.js 파일 내, htmlSvgToPdfSvgSync 함수 구현을 참고

