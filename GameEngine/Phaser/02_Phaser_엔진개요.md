# Phaser

## WebGL & Canvas

Phaser uses both a **Canvas** and **WebGL** renderer internally and can automatically swap between them based on **browser support**. This allows for lightning fast rendering across Desktop and Mobile. Phaser uses and contributes towards the excellent **Pixi.js** library for rendering.

### WebGL

OpenGL과 유사한 API. 그러나 간단한 게임에 비해 필요 이상으로 복잡하다.

각 모바일 브라우저의 WebGL 지원 여부는 [여기](http://caniuse.com/#feat=webgl)를 참고한다.

오페라는 지원하지 않고, 안드로이드 기본 브라우저는 안드로이드 5 이후로부터 일부 지원한다.



### HTML5 Canvas

다음과 같은 제한 사항이 있다.

- 그려진 개체가 canvas 비트맵의 일부가 되므로 이벤트 처리기에 연결 불가. 예를 들어 canvas에서 특정 원을 클릭해도 기본적으로 특정 이벤트 처리기를 실행할 수 없다. 그러나 전체 canvas에 대한 이벤트 처리기를 연결하여 계산으로 통해 원을 클릭했는지 여부를 판단할 수 있다.
- canvas에서 개체를 이동하는 경우 격 이동 증분에 대한 전체 canvas를 다시 그려야 한다.
- 유동적이고 유연한 레이아웃은 비교적 어렵다. 브라우저는 기본적으로 현재 브라우저의 크기에 따라 canvas크기를 조절하는 기능을 갖고 있지 않다. 창 크기 변경 이벤트를 수신하여 canvas크기를 동적으로 변경하도록 구현해야 한다.

### SVG 

현재까지 페이저는 SVG 렌더링 기능을 제공하지 않는다.

### [Pixi.js](http://www.pixijs.com/)

Most flexible 2D WebGL renderer.



## Preloader

We've made the loading of assets as simple as one line of code. Images, Sounds, Sprite Sheets Tilemaps, JSON data, XML - all parsed and handled automatically, ready for use in game and stored in a **global Cache** for Sprites to share.

### global cache

게임 엔진 내부에 에셋들이 캐싱되는 영역이 별도로 존재한다.

`game.load` 명령으로 에셋을 로드하면 자동으로 캐싱된다.

`game.cache`로 접근할 수 있다.

관련 API는 [여기](http://phaser.io/docs/2.6.2/Phaser.Cache.html)서 볼 수 있다.

```javascript
var images = game.cache.getKeys(PHaser.Cache.IMAGE);
```

실제로 브라우저 캐시는 `localStorage` 함수로 접근한다는 글이 있다.

그렇다면 `game.cache`는 앱캐시인가....


## Physics

Phaser ships with support for 3 physics systems: Arcade Physics, an extremely light-weight **AABB library** perfect for low-powered devices. **Ninja Physics** for advanced tile support and **p2.js** - a full-body system with springs, constraints and **advanced polygon support**.



## Sprites

Sprites are the life-blood of your game. Position them, tween them, rotate them, scale them, animate them, collide them, paint them onto **custom textures** and so much more!



## Groups

Group bundles of Sprites together fore easy pooling and recycling, avoiding constant object creation. Groups can also be collided: for example a "Bullets" group checking for collision against the "Aliens" group, with a custom collistion callback to handle the outcome.

실제로 사용해보면 유니티에서 Empty game object에 child를 넣어두고 사용하는 것과 비슷하다.

비슷한 것들끼리 묶어서 접근할 수 있다는 면에서 Tag와도 비슷한 느낌.



## Animation

Phaser supports **classic Sprite Sheets with a fixed frame size**, **Texture Packer** and **Flash CS6/CC JSON files** (both Hash and Array formats) and **Starling XML files**. All of these can be used to easily create animation for Sprites.



## Particles

An Arcade Particle system is **built-in**, which allows you to create fun particle effects easily. Create explosions or constant streams for effects like rain or fire. Or attach the **Emitter** to a Sprite for a jet trail.



## Camera

Phaser has a built-in Game World. Objets can be placed anywhere within the world and you've got access to a powerful Camera to look into that world. **Pan around** and follow Sprites with **ease**.



## Input 

Talk to a Phaser.Pointer and it **doesn't matter if the input came from** a touch-screen or mouse, it can even change mid-game without droping a beat. Multi-touch, Mouse, Keyboard and lots of useful functions allow you to code custom **gesture recognition**.

### Gesture Recognition

[터치로 도형 그리면 인식하는 예제](http://webcodingeasy.com/JS-classes/Javascript-gesture-recognition)
[카메라로 제스쳐 인식하는 예제](https://github.com/riomus/phaser-gesture)
[제스쳐 매니저 - 스와이프, 드래그, 터치 등을 검출](https://gist.github.com/eguneys/5cf315287f9fbf413769)



## Sound

Phaser supports both **Web Audio** and **legacy HTML Audio**. It automatically handles mobile device locking, easy Audio Sprite creation, looping, streaming and volume. We know how much of a pain dealing with audio on mobile is, so we did our best to resolve that!

## Tilemaps

Phaser can load, render and collide with a tilemap with just a couple of lines of code. We **support CSV** and **Tiled map data formats** with multiple tile layers. There are lots of powerful tile manipulation functions: swap tiles, replace them, delete them, add them and update the map in realtime.

[Tiled map editor](http://www.mapeditor.org/)


## Device Scaling

Phaser has a built-in Scale Manager which allows you to scale your game to fit any size screen. **Control aspect ratios**, **minimum and maximum scales** and **full-screen support**.

풀스크린 기능의 경우 모바일 브라우저에 따라 지원되지 않는 경우가 있음

알려진 바로는 모바일 사파리의 경우 지원하지 않는다.

## Plugin System

We are trying hard to keep the core of Phaser limited to only essential classes, so we built a **smart Plugin system** to handle everything else. Create your **own plugins easily and share** them with the community.

## Mobile Browser

Phaser was built specifically for Mobile web browsers. Of course it works blazingly fast on Desktop too, but unlike lots of frameworks **mobile was our main focus**. If it doesn't **perform well on mobile then we don't add it into the Core**.

## Developer Support

We use Phaser every day on our many client projects. As a result it's **constantly evolving and improving and we jump on bugs and pull requests quickly**. This is a living, breathing framework maintained by a commercial company with custom feature development and support packages availablel. We live and breath HTML5 games.

## Battle Tested

Phaser has been used to create hundreds of games, receiving millions of plays a month. And Version 2 is the most stable and bug-free one yet. We're not saying it is 100% perfect, but we use it for our client work every day, **issues get resolved fast** and we stay **on-top of the changing browser landscape**.