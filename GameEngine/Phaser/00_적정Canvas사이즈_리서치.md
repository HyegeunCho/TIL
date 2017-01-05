# Phaser Engine 리서치

## 적정 Cavas 사이즈 결정 계획

기존에 제작된 mobile based HTML 게임들의 Canvas 사이즈를 조사한 후, 적장한 Canvas 사이즈 리스트 작성

이후 해당 리스트를 토대로 다음의 2개의 bias로 테스트 진행

- Canvas Size
- 재생 Animation 갯수

Canvas Size와 Animation을 증감시켜 Frame rate가 가장 높게 나오는 Canvas Size를 결정

### 기존 게임들의 Canvas 사이즈 

- [SandTrap](http://gopherwoodstudios.com/sandtrap/sand-trap.htm) : (600, W * 7 / 6)
- [게임엔 게임들](http://www.gamen.com/) 
    - 세로 모드 게임 : (720, 1230), (750, 1280)
    - 가로 모드 게임 : (1280, 670)

### 테스트에 사용할 Canvas 사이즈 리스트

개발할 게임은 세로모드라 가정한다.
세로모드 게임은 주로 가로의 길이를 먼저 결정한 후 그 값에 따라 Height를 결정한다.

```
Width : Height = 9 : 16
Height = Width / 9 * 16
```

- (360, 640)
- (480, 854)
- (600, 1067)
- (720, 1280)

### 테스트 과정

1. 테스트 환경 설정 : 개인용 Macbook 재원 표시
2. 리스트의 각 Canvas 사이즈에 따라 재생 Animation 수를 서서히 증가

### 테스트 URL

[Frame-Test](http://hgcho-phaser.appspot.com/frame-test?sizeIndex=4&drawCount=10) (sizeIndex = 4, drawCount = 10)

- 파라미터
    - sizeIndex 
        - 1 : W 360, H 640
        - 2 : W 480, H 854
        - 3 : W 600, H 1067
        - 4 : W 720, H 1280
    - drawCount : 재생할 애니메이션 갯수
        - 만일 drawCount 항목이 없거나 값이 0인 경우 오토 모드가 활성화됨
    - autoPlayTimeOffset : 오토 모드에서 애니메이션을 증가시킬 시간 Term, 기본값 5000 (ms 단위)
    - autoPlayIncrAnimCount : 오토 모드에서 한번에 증가하는 애니메이션 갯수, 기본값 50
    - autoPlayStopCount : 오토 모드 증가를 종료할 갯수, 기본값 1000 (1000개가 되면 더이상 증가하지 않음)


