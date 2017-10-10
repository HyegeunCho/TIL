# Phaser 엔진 + Ninja Physics 빌드하기

**이 문서는 Phaser-CE 2.9 기준으로 작성하였음**


기본 페이저 엔진에는 Ninja Physics가 기본으로 포함되지 않아서 Ninja를 사용하기 위해서는 추가적으로 빌드를 해야한다.

## 1. Phaser 엔진 다운로드

[페이저 다운로드 웹페이지](http://phaser.io/download/stable)에서 최신 페이저 엔진을 다운로드 받는다.

## 2. Phaser 빌드를 위한 패키지 인스톨

커맨드 콘솔을 열어 다운로드 받은 엔진이 위치한 곳으로 이동한다.

Phaser 엔진을 빌드하기 위해선 **grunt**가 필요하다. 아래 명령을 입력해서 grunt를 설치한다.

```bash
npm install grunt grunt-cli
```

이후 엔진 빌드에 필요한 패키지들을 인스톨 한다.

```bash
npm install
```

## 3. grunt를 실행하여 Ninja Physics 빌드

아래 명령을 실행하여 Ninja Physics를 빌드한다.

```bash
grunt build ninjaphysics
```

빌드 결과는 **./build/custom** 폴더에 **phaser-ninja-physics.js** 로 생성된다.

## 4. 빌드 옵션 확인

엔진의 루트 경로에 있는 **Gruntfile.js** 파일을 참조하면 grunt 빌드 옵션들을 확인할 수 있다.

만약 Ninja와 particles를 함께 사용하고 싶다면 아래와 같이 태스크를 추가해주면 된다.

```js
grunt.registerTask('ninja-with-particles', 'Phaser with Ninja Physics and Tilemaps and Particles', function() {

	grunt.option('exclude', 'p2,creature');
    grunt.option('filename', 'phaser-ninja-with-particles');
    grunt.option('sourcemap', true);
    grunt.option('copy', true);
    grunt.option('copycustom', true);
    grunt.option('uglify', true);

    grunt.task.run('custom');
});
```