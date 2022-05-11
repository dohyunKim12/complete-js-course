# Build app with parcel

1.  create package.json
2.  npm i parcel
3.  npm run build

- 한가지 방법 더. `npx parcel index.html`

# In Netlify

로컬에서 빌드 없이 그냥 netlify에서 바로 배포할 수 있음.
package.json 파일만 만들고, git repository에 푸시해둔 다음,
Netlify에서 repo 연동하고

- base directory: ./15-Mapty/starter
- build command: `package.json`에 명시된 build command 그대로 입력(parcel build index.html --dist-dir ./dist) (build command 입력하면 CI/CD 환경에서 package.json 파일을 보고 의존성 패키지들을 알아서 설치.)

- publish directory: ./15-Mapty/starter/dist

# Package.json 파일 만들기 -> npm init

NPM(Node Package Manager) 라는 것을 통해 package와 모듈들을 관리할 수 있음.
Packaging 하는 과정은 다음과 같다.

1. 패키징 하고자 하는 디렉토리에서 `npm init` -> package.json 파일이 생성됨.
2. 패키징 하고자 하는 디렉토리에서 `npm install (node module명)` (ex-leaflet, lodash-es, ...)
3. node_modules 라는 디렉토리가 생성되면서, 설치한 모듈을 스크립트에서 import 할 수 있게 됨. (import ... from 모듈위치)
4. Git과 같은 remote repository 사용시나 project 전체를 clone해야할 때는 node_modules 폴더를 절대 포함시키지 말 것. (용량이 상상을 초과함) (.gitignore 파일에 포함)
5. Remote repository에서 clone을 해 온 후에는, 패키징 된 디렉토리에서 `npm install`을 입력하면 package.json파일에 적혀있는 dependency 항목의 패키지/모듈들을 알아서 설치.
6. 정상적으로 사용 가능.
