# build app with parcel

1.  create package.json
2.  npm i parcel
3.  npm run build

# In Netlify

로컬에서 빌드 없이 그냥 netlify에서 바로 배포할 수 있음.
package.json 파일만 만들고, git repository에 푸시해둔 다음,
Netlify에서 repo 연동하고

- base directory: ./15-Mapty/starter
- build command: `package.json`에 명시된 build command 그대로 입력(parcel build index.html --dist-dir ./dist) (build command 입력하면 CI/CD 환경에서 package.json 파일을 보고 의존성 패키지들을 알아서 설치.)

- publish directory: ./15-Mapty/starter/dist

# Package.json 파일 만들기 -> npm init
