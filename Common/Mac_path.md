# 맥에서 PATH 환경변수 사용

[참고링크](http://ohgyun.com/390)

go 세팅을 하던 중, 자꾸 PATH에 지정하지 않은 값이 설정되는 경우가 발생

확인해보니 `/etc/paths` 파일에 지정된 값들이 PATH에 추가됨

또 `/etc/paths.d/` 디렉토리 내부에 있는 심볼릭 링크가 PATH에 자동으로 추가됨.