# Sublime Text - Haskell 플러그인 설치

## Sublime Package Controll 설치

서브라임의 패키지 컨트롤 플러그인을 통해 각종 플러그인을 손쉽게 관리할 수 있다.
패키지 컨트롤 플러그인을 설치하기 위해 [여기](https://packagecontrol.io/installation#st2)를 참고하자.

위 링크를 참고하여 Package Control 플러그인을 설치하면 커맨드 팔레트 `ctrl + shift + p` 를 통해 Package Control을 사용할 수 있다.

## sublimehaskell 설치

[SublimeHaskell](https://github.com/SublimeHaskell/SublimeHaskell)를 참고하여 Sublime에서 SublimeHaskell을 설치한다.

## SublimeHaskell 설치 확인

서브라임에서 아래 코드를 작성한다.

```haskell
main :: IO()
main = do
    print "Hello World"
```

Tools > Build System 에서 Haskell을 선택한 후 `ctrl + b`를 눌러 빌드를 실행한다.

아래와 같은 결과가 출력되면 성공적으로 설치가 된 것이다.
```
"Hello World"
[Finished in 0.7s]
```

## Trouble Shooting

- [http://umairsaeed.com/blog/2015/05/02/sublime-text-and-haskell/](http://umairsaeed.com/blog/2015/05/02/sublime-text-and-haskell/)