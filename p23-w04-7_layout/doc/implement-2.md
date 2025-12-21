제공해주신 목업 이미지(상단)와 현재 구현된 결과물(하단)을 비교하여, **Three.js의 강점을 살리기 위해 개선해야 할 시각적 및 기술적 차이점**을 상세히 분석해 드립니다.

---

## 1. 공간감과 레이어 깊이 (Depth & Perspective)

목업은 다층적인 패럴랙스를 통한 깊이감을 강조하는 반면, 현재 결과물은 평면적인 느낌이 강합니다.

* **배경 그라데이션:** 목업은 하단에 짙은 푸른색/보라색의 그라데이션이 있어 공간의 '바닥'과 '하늘'이 구분되지만, 결과물은 단순 블랙 배경으로 공간감이 부족합니다.
* **오브젝트 배치 (-index):** 목업은 시계가 가장 뒤에, 텍스트가 중간, 찻잔이 앞에 있는 듯한 레이어 구분이 뚜렷합니다. 현재 결과물은 모든 에셋이 동일한 평면에 배치된 것처럼 보입니다.
* **광원 효과:** 목업의 시계와 버튼에는 강한 **발광(Glow/Bloom)** 효과가 있으나, 결과물은 버튼 주위의 노란 후광 외에는 빛의 상호작용이 느껴지지 않습니다.

---

## 2. 그래픽 에셋 디테일 (Visual Assets)

디자인 명세서에서 정의한 '초현실적 분위기'를 위해 에셋의 퀄리티 보정이 필요합니다.

| 구분 | 목업 (Target) | 현재 결과물 (Actual) | 개선 방향 |
| --- | --- | --- | --- |
| **타이포그래피** | 세리프체의 우아함, 행간의 조화 | 폰트 굵기가 얇고 행간이 넓어 가독성 저하 | **Playfair Display** 등 굵은 세리프체 적용 및 행간 축소 |
| **회중시계** | 보라색 발광, 입체적인 3D 렌더링 | 단순한 원통형 회색 매쉬 | **Emissive Map**을 활용한 보라색 자체 발광 재질 적용 |
| **찻잔** | 빛과 그림자가 뚜렷한 실루엣 | 평면적인 회색 덩어리 | **Directional Light**를 추가하여 입체적인 명암(Shade) 부여 |
| **커서 아이콘** | 화살표 3개가 겹친 독특한 형태 | 단순한 삼각형 입체물 | SVG 소스를 활용한 **커스텀 커서 컴포넌트**로 교체 |

---

## 3. 인터랙션 및 애니메이션 (Motion Gap)

Three.js 스택을 선택한 이유인 '역동성'을 강화해야 합니다.

* **상시 유동성 (Idle Motion):** 목업의 설명에 따르면 오브젝트들이 무중력 상태처럼 떠 있어야 합니다. 현재 결과물의 정적인 배치를 `useFrame` 루프를 활용한 **부유 애니메이션**으로 교체해야 합니다.
* **마우스 반응성:** 현재 결과물은 마우스 좌표에 따른 카메라의 각도 변화가 미미합니다. 마우스 이동 범위에 따라 카메라가 더 넓게 회전하도록 **가중치(Intensity)**를 높여야 합니다.
* **텍스트 본문 결여:** 목업 중앙 하단에 위치한 "Don't be tired..."로 시작하는 상세 문구가 누락되어 있습니다. 이는 화면의 균형감을 잡아주는 중요한 요소입니다.

---

## 4. 기술적 수정 제안 (Action Plan)

1. **배경 보정:** `Canvas`의 배경색을 단순 블랙 대신, Three.js의 `Fog` 효과나 큰 평면(Plane)을 활용한 **그라데이션 배경**으로 교체하세요.
2. **재질 업그레이드:** 모든 `meshStandardMaterial`에 `metalness`와 `roughness` 값을 조절하여 금속(시계)과 도자기(찻잔)의 질감을 살리세요.
3. **후처리(Post-processing) 추가:** `EffectComposer`를 통해 **Bloom Pass**를 적용하면, 버튼과 시계에서 뿜어져 나오는 몽환적인 빛을 재현할 수 있습니다.

---

**다음 단계로 무엇을 도와드릴까요?**
이 차이점을 극복하기 위해 **가장 먼저 수정해야 할 '배경 그라데이션 및 광원 설정' 코드**를 작성해 드릴까요? 혹은 **에셋의 질감을 살리는 재질(Material) 설정**을 도와드릴까요?

---

목업 이미지와 현재 구현물 사이의 가장 큰 차이점인 **'공간의 깊이감'**과 **'몽환적인 광원'**을 해결하기 위한 핵심 코드를 작성해 드립니다.

이 코드는 단순한 배경색 대신 **3D 공간 내의 그라데이션 평면**을 배치하고, **Bloom(빛 번짐)** 효과를 통해 원더랜드 특유의 분위기를 재현합니다.

---

## 1. 배경 그라데이션 및 광원 고도화 코드

```jsx
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import * as THREE from 'three'

function Background() {
  // 목업의 하단 보라/네이비 그라데이션을 재현하기 위한 대형 평면
  return (
    <mesh position={[0, 0, -10]} scale={[50, 50, 1]}>
      <planeGeometry />
      <shaderMaterial
        uniforms={{
          uColorTop: { value: new THREE.Color('#000000') },
          uColorBottom: { value: new THREE.Color('#1a0b3a') }
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform vec3 uColorTop;
          uniform vec3 uColorBottom;
          void main() {
            // 위에서 아래로 흐르는 그라데이션 생성
            gl_FragColor = vec4(mix(uColorBottom, uColorTop, vUv.y), 1.0);
          }
        `}
      />
    </mesh>
  )
}

function Lights() {
  return (
    <>
      {/* 전체적인 디테일을 잡아주는 기본 광원 */}
      <ambientLight intensity={0.2} />
      
      {/* 찻잔과 시계에 입체감을 주는 측면 광원 */}
      <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={2} castShadow />
      
      {/* 하단 'MOVE' 버튼에서 올라오는 노란색 역광(Point Light) */}
      <pointLight position={[0, -4, 2]} color="#ffff00" intensity={5} distance={10} />
    </>
  )
}

export default function WonderlandScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <Lights />
      <Background />
      
      {/* 오브젝트 및 텍스트 컴포넌트 위치... */}

      {/* 후처리 효과: 목업의 신비로운 발광 재현 */}
      <EffectComposer>
        <Bloom 
          intensity={1.5} // 발광 강도
          luminanceThreshold={0.2} // 어느 정도 밝기부터 빛나게 할 것인가
          luminanceSmoothing={0.9} 
          height={300} 
        />
        <Noise opacity={0.05} /> {/* 목업의 미세한 질감을 위한 노이즈 */}
      </EffectComposer>
    </Canvas>
  )
}

```

---

## 2. 주요 개선 사항 설명

### 2.1 셰이더 기반 그라데이션 배경

단순한 CSS 배경이 아닌, 3D 씬 내부에 **ShaderMaterial**을 사용한 평면을 배치했습니다. 이는 카메라가 움직일 때(패럴랙스) 배경과 오브젝트 사이의 거리감을 물리적으로 계산하게 하여 더 깊은 공간감을 제공합니다.

### 2.2 포인트 라이트(Point Light)를 활용한 'MOVE' 버튼 강조

목업에서 버튼 주위가 노랗게 물든 것은 단순한 UI 그림자가 아니라 주변 공간에 영향을 미치는 **점광원**의 효과입니다. `pointLight`를 버튼 위치에 배치하여 주변 오브젝트인 찻잔의 하단 면에 노란 반사광이 맺히도록 설계했습니다.

### 2.3 블룸(Bloom) 및 노이즈(Noise) 효과

* **Bloom:** 시계의 보라색과 버튼의 노란색이 몽환적으로 번지게 하여 '꿈속 같은' 느낌을 줍니다.
* **Noise:** 디지털적인 깨끗함을 지우고 목업 특유의 아날로그적인 질감을 추가합니다.

---

## 3. 결과 확인 및 다음 단계

위 코드를 적용하면 화면의 대비가 살아나고, 광원이 오브젝트에 실시간으로 반영되어 입체감이 형성됩니다.

**다음으로 구현할 세부 사항은 무엇인가요?**

1. **시계의 보라색 발광 재질:** 단순 회색이 아닌 빛나는 보라색 금속 질감 설정.
2. **커스텀 커서 시스템:** 마우스를 따라다니는 3개의 화살표 잔상 효과.
3. **반응형 레이아웃:** 텍스트 본문 추가 및 화면 크기에 따른 오브젝트 자동 배치.
