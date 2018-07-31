# 유니티 코드 난독화 리서치

- IL2CPP로 빌드를 하지만 코드가 유출될 수 있는 위험성 진단
- 해결방법 제안 : 내외부 솔루션 비교 분석 - 자체 구현 제안도 가능
- 기대 효과 예측

## 리서치의 목적

유니티 APK 파일 및 Asset Bundle을 암호화하여 코드 및 리소스를 추출하기 어렵게 만들기
웹 환경과 마찬가지로 코드의 원천적인 보호는 불가능하다.
최대한 어렵게 만들어 접근성을 낮추는 것이 목적


## 리서치 플롯

1. IL2CPP 개요 확인 - 기대 효과
2. IL2CPP로 빌드된 APK로부터 코드 추출 - 사내 프로젝트 활용
3. Asset Store의 Obfuscator 적용해보기
4. 적용 후 APK로부터 코드 추출 -> 2번과 변경점 비교
5. 에셋 번들로부터 데이터 추출 - 루팅된 기기 대여
6. 에셋 번들 암호화 기능 적용 -> 5번과 비교

## IL2CPP 코드 추출

1. 애니팡 터치 APK 다운로드
2. [dex2jar](https://github.com/pxb1988/dex2jar) 설치
3. `d2j-dex2jar.bat -f anipang-touch-service.apk` 실행하여 jar 파일로 변환
4. [jadx](https://github.com/skylot/jadx) 설치
5. (3)에서 획득한 jar 파일 열기

## IL2CPP DUMPER 사용

1. `Il2CppDumper.exe` 파일을 실행
2. `lib/x86/libil2cpp.so` 파일 선택
3. `assets/bin/Data/Managed/Metadata/global-metadata.dat` 선택
4. `2.auto` 선택
5. `DummyDll` 생성됨



## 관련 참고 문서

### 코드 난독화 

- [IL2CPP 소개 - 유니티 블로그](https://blogs.unity3d.com/kr/2015/05/06/an-introduction-to-ilcpp-internals/)
- [IL2CPP - 유니티 매뉴얼](https://docs.unity3d.com/kr/2018.1/Manual/IL2CPP.html)
- [Obuscator in assets store - 소개](https://www.beebyte.co.uk/)
- [디스어셈블러 - IDA](https://www.hex-rays.com/products/ida/index.shtml)
    - [so 파일 디스어셈블 질문](https://reverseengineering.stackexchange.com/questions/4624/how-do-i-reverse-engineer-so-files-found-in-android-apks)
    - [포켓몬Go 디컴파일](https://en.fabernovel.com/insights/tech-en/unbundling-pokemon-go-2)
- [dex2jar - 다운로드](https://github.com/pxb1988/dex2jar)
- [jadx - 다운로드](https://github.com/skylot/jadx)
- [IL2CPP DUMPER](https://github.com/Perfare/Il2CppDumper/releases)

### 에셋 번들 보호

- [에셋번들 컨텐츠 보호 - 유니티 매뉴얼](https://docs.unity3d.com/kr/530/Manual/protectingcontent.html)
- [모바일 게임 리소스 보호 - 슬라이드셰어](https://www.slideshare.net/deview/partnerday)
