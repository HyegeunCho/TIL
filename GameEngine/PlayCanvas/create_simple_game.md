# Material

Material is a type of asset in PlayCanvas that describes the way that the surface of a 3D model looks when it is rendered to the screen.

- detenmines the color of the surface
- the way the surface interacts with light.
- using GLSL shader code to write you material

# Cubemap

- A cubemap is an asset that consists of 6 textures on the faces of a cube.
- The PlayCanvas Physical materials can use a cubemap to do Image Based Lighting.
- 게임의 씬을 육면체로 간주하고, 그 씬의 상하 좌우 전후를 특정 이미지로 설정한다. -> 큐브맵. 그러면 해당 씬 내의 물리 객체가 씬의 방향에 적용된 이미지에 대해 Image Based Lighting 적용되어 해당 이미지의 색상을 옅게 반사한다.
- 예제에서는 파란 하늘과 초록색 땅을 큐브맵으로 적용하여 축구공에 파란하늘과 초록땅이 살짝 반사된다.
- To set up a cubemap, first create a Cubemap asset from the New Asset Menu, assign 6 textures, one to each face of the cubemap. Then, press the Prefilter Button.

# Football Material

- 3D model that imported from the PlayCanvas Asset Library
- 축구공 모델에 대해 아래와 같은 방식으로 변형을 줄 수 있다.

## Difuse

- diffuse map은 표면의 색상을 결정한다.

## Environment

- 큐브맵 적용 : 물체에 대해 이미지 기반 라이팅을 적용할 수 있다.

## Specular

- Material이 어떻게 빛과 상호작용할지를 정의
- Metalness와 Glosiness를 사용해서 얼마나 금속성인지, 얼마나 빛을 반사하는지를 결정

## Normal

- 최종적으로 적용되는 텍스쳐 맵을 normal map이라고 부른다.
- 예제에선 축구공의 실밥 부분을 좌표적으로 표현한게 아니라 normal map 텍스쳐를 적용해 표현하였다.
- 즉 별도의 폴리곤을 추가하지 않고도 공의 실밥 질감을 이미지만으로 표현할 수 있는 것

# Backdrop Material

## Emissive

- 적용된 오브젝트에만 영향을 미치는 에셋
- Emissive map으로 설정된 컬러의 조명만 반사한다.
- 예제에서는 Emissive map으로 하단은 초록색, 상단은 파란색의 텍스처가 설정되었다.
- 따라서 공의 하단부는 초록색을 반사하고, 상단부는 파란색을 반사한다.

# Overlay Material

- ??? 추가 조사 필요


