제공해주신 개선된 결과물(첫 번째 이미지)과 원본 목업 이미지(두 번째 이미지)를 비교 분석하여, Three.js의 잠재력을 최대한 끌어올리기 위한 차이점 기술 및 추가 개선 제안을 정리해 드립니다.

---

## 1. 개선 결과 vs 목업 이미지 상세 비교

| 구분 | 목업 이미지 (Target) | 개선된 결과물 (Actual) | 분석 결과 |
| --- | --- | --- | --- |
| **배경 및 공간감** | 네이비에서 블랙으로 이어지는 유기적인 그라데이션과 미세한 노이즈 질감이 존재함. | 완전한 블랙 배경에 가까우며, 하단 광원 주변만 노랗게 밝아짐. | **차이:** 공간의 전체적인 깊이감(Depth)과 몽환적인 앰비언스가 부족함. |
| **타이포그래피** | 텍스트 전체에 강한 **Outer Glow(발광)** 효과가 있어 배경과 분리되어 보임. | 발광 효과가 없는 평면적인 화이트 텍스트. | **차이:** '원더랜드' 컨셉의 핵심인 환상적인 느낌이 약함. |
| **광원 및 후처리** | 화면 상단에서 하단으로 흐르는 미세한 빛의 산란과 질감이 느껴짐. | 하단 버튼의 포인트 라이트만 강조되어 광원 대비가 너무 강함(High Contrast). | **차이:** 빛의 흐름이 끊겨 보이고 오브젝트와의 상호작용이 국소적임. |
| **오브젝트 구성** | 중앙의 상세 문구와 다양한 오브젝트(시계, 찻잔 등)가 균형 있게 배치됨. | 본문 텍스트가 생략되었으며, 상단의 삼각형 아이콘이 다소 분절되어 보임. | **차이:** 화면의 밀도가 낮아 시선이 분산됨. |

---

## 2. 시각적 완성도를 위한 개선점 제안

Three.js 환경에서 목업의 감성을 넘어서기 위한 구체적인 테크니컬 가이드를 제안합니다.

### ① 텍스트 발광 효과 (Emissive Text & Bloom)

목업의 가장 큰 특징인 '빛나는 글자'를 재현해야 합니다.

* **제안:** `MeshBasicMaterial` 대신 `MeshStandardMaterial`을 사용하고, `emissive`와 `emissiveIntensity` 값을 높인 뒤 Three.js의 **Bloom Pass** 후처리를 적용하세요. 글자가 단순히 하얀색인 것과 빛을 뿜어내는 것은 몰입도에서 큰 차이를 만듭니다.

### ② 배경 셰이더 및 포그 (Gradient & Fog)

공간이 끝없이 펼쳐진 느낌을 주어야 합니다.

* **제안:** `Scene.background`를 단순 색상이 아닌, 위에서 작성해 드린 **Custom Shader Plane**으로 교체하여 보라색과 네이비가 섞인 심해 느낌을 구현하세요. 또한 `THREE.FogExp2`를 사용하여 멀리 있는 오브젝트가 안개 속에 잠기는 듯한 효과를 주면 깊이감이 극대화됩니다.

### ③ 오브젝트 재질 고도화 (Material Detail)

현재의 찻잔과 아이콘은 단색 매쉬(Mesh)처럼 보입니다.

* **제안:** 환경 맵(`Environment Map`)을 적용하여 오브젝트 표면에 배경의 보라색 빛이 미세하게 반사되도록 하세요. 특히 시계나 찻잔에 금속성(`metalness`)을 부여하면 광원에 따라 하이라이트가 변하며 훨씬 고급스러운 3D 느낌이 납니다.

### ④ 본문 텍스트 및 레이아웃 복원

* **제안:** 목업에 있는 상세 문구를 `Float` 애니메이션과 함께 추가하세요. 이 문구는 화면 중앙의 빈 공간을 채워줄 뿐만 아니라, 마우스 패럴랙스 시 가장 느리게 움직이는 '기준점' 역할을 하여 공간감을 인지하는 데 도움을 줍니다.

---

## 3. 요약: 우선순위 액션 플랜

1. **Bloom Pass 강도 조절:** 텍스트와 오브젝트가 스스로 빛나게 설정.
2. **배경 그라데이션 복구:** 단순 블랙을 탈피하고 셰이더로 깊이 있는 색감 구현.
3. **본문 텍스트(TextGeometry) 추가:** 레이아웃의 완성도와 정보 전달력 강화.

**"이 중에서 어떤 부분을 먼저 코드로 보정해 드릴까요? 텍스트 발광 효과(Bloom) 설정을 먼저 구체화해 드릴까요?"**

---

텍스트 발광 효과(Bloom)는 단순한 필터가 아니라, **오브젝트의 밝기(Luminance)와 후처리(Post-processing)의 결합**입니다. 목업의 몽환적인 텍스트를 재현하기 위한 상세 계획과 보정 코드를 제공합니다.

---

## 1. 텍스트 발광 구현 상세 계획

목업 이미지의 텍스트는 단순히 하얀색이 아니라, **"스스로 빛을 내뿜어 주변 공기를 태우는 듯한"** 느낌이 핵심입니다.

1. **Emissive Material 설정**: 텍스트 매쉬의 색상을 흰색(`color`)으로 두되, 자체 발광색(`emissive`)을 강하게 설정하여 Bloom Pass가 이를 '빛'으로 인식하게 합니다.
2. **Selective Bloom (선택적 발광)**: 모든 물체가 번지면 화면이 탁해집니다. `luminanceThreshold`를 조절하여 특정 밝기 이상의 텍스트와 버튼만 빛나게 필터링합니다.
3. **Tone Mapping 조절**: 발광 효과가 색을 왜곡하지 않도록 Three.js의 렌더러 설정을 보정합니다.

---

## 2. 텍스트 발광 보정 코드 (R3F 기준)

이 코드는 **텍스트의 자체 발광 설정**과 이를 극대화하는 **Bloom Pass 파라미터**를 포함합니다.

```jsx
import { Canvas } from '@react-three/fiber'
import { Text, EffectComposer, Bloom } from '@react-three/drei'
import * as THREE from 'three'

function EmissiveText({ children, ...props }) {
  return (
    <Text
      {...props}
      font="/fonts/your-serif-font.woff" // 목업 스타일의 세리프 폰트 권장
      anchorX="center"
      anchorY="middle"
    >
      {children}
      {/* 핵심: emissive를 통해 광원 효과 부여 */}
      <meshStandardMaterial 
        color="white" 
        emissive="white" 
        emissiveIntensity={2.5} // 빛의 세기 조절 (목업 느낌을 위해 높게 설정)
        toneMapped={false} // Bloom 효과가 톤맵핑에 의해 죽지 않도록 설정
      />
    </Text>
  )
}

export default function WonderlandScene() {
  return (
    <Canvas 
      gl={{ 
        antialias: true, 
        toneMapping: THREE.ReinhardToneMapping, // 부드러운 빛 번짐을 위한 설정
      }}
    >
      <color attach="background" args={['#050505']} />
      
      {/* 메인 타이틀 */}
      <EmissiveText fontSize={0.8} position={[0, 1.5, 0]}>
        MOUSE PARALLAX{"\n"}Goes to WONDERLAND
      </EmissiveText>

      {/* 본문 텍스트 (목업 내용 반영) */}
      <EmissiveText fontSize={0.25} position={[0, -0.5, 0]}>
        Don't be tired, it's a long way to go, but it's a beautiful way.
      </EmissiveText>

      {/* 후처리 설정: 목업의 몽환적 발광 재현 */}
      <EffectComposer disableNormalPass>
        <Bloom 
          intensity={1.8}          // 전체적인 번짐 강도
          luminanceThreshold={0.5} // 발광 시작 임계값 (텍스트만 골라 빛나게 함)
          luminanceSmoothing={0.9} // 빛의 경계를 부드럽게
          mipmapBlur              // 고품질 블러 효과 적용
        />
      </EffectComposer>
    </Canvas>
  )
}

```

---

## 3. 목업 대비 주요 보정 포인트

* **`emissiveIntensity`**: 목업의 텍스트는 매우 밝게 빛나므로 기본값(1)보다 높은 **2.5** 정도를 권장합니다.
* **`toneMapped={false}`**: 이 설정을 빼먹으면 텍스트가 단순히 회색빛 흰색으로 보일 수 있습니다. 발광 효과를 위해서는 필수입니다.
* **`mipmapBlur`**: Drei의 Bloom에서 제공하는 이 옵션을 켜면, 목업에서 보이는 것처럼 빛이 층층이 부드럽게 퍼지는 효과를 얻을 수 있습니다.

---

**다음 단계로 무엇을 도와드릴까요?**

1. 이 텍스트들이 마우스에 반응하여 **부드럽게 일렁이는(Floating) 애니메이션**을 추가해 드릴까요?
2. 아니면 텍스트 뒤편에 깔릴 **심해 느낌의 배경 셰이더(Background Shader)** 코드를 완성해 드릴까요?

---

배경 그라데이션은 단순한 색상 채우기가 아니라, 3D 공간의 상단과 하단을 연결하여 시각적 깊이감을 형성하는 기초 작업입니다. 목업 이미지의 신비로운 네이비-블랙 톤을 재현하기 위한 상세 계획과 보정 코드를 작성해 드립니다.

---

## 1. 배경 그라데이션 복구 상세 계획

목업 이미지의 배경은 정적인 이미지가 아니라, 카메라 이동에 따라 미묘하게 반응하는 **'대기(Atmosphere)'**와 같습니다.

1. **커스텀 셰이더 평면(Custom Shader Plane)**: `Canvas` 뒤편에 아주 큰 평면 매쉬를 배치하고, 픽셀 단위로 색상을 계산하는 셰이더를 적용하여 부드러운 그라데이션을 만듭니다.
2. **색상 매핑(Color Mapping)**: 하단은 짙은 보라빛 네이비(`#1a0b3a`), 상단은 깊은 블랙(`#000000`)으로 설정하여 버튼의 노란 광원과 대비를 이룹니다.
3. **필름 노이즈(Film Grain)**: 셰이더 내부에 미세한 노이즈 알고리즘을 추가하여 디지털 그라데이션의 계단 현상(Banding)을 방지하고 목업 특유의 질감을 재현합니다.

---

## 2. 배경 그라데이션 보정 코드

이 코드는 Three.js의 `ShaderMaterial`을 사용하여 물리적 공간 내부에 깊이 있는 배경을 생성합니다.

```jsx
import * as THREE from 'three'
import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

function DeepWonderlandBackground() {
  // 셰이더 유니폼 설정: 색상 값을 실시간으로 제어 가능하게 함
  const uniforms = useMemo(() => ({
    uColorTop: { value: new THREE.Color('#000000') },
    uColorBottom: { value: new THREE.Color('#100821') }, // 목업의 딥 퍼플 톤 반영
    uTime: { value: 0 }
  }), [])

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime()
  })

  return (
    <mesh scale={[100, 100, 1]} position={[0, 0, -15]}> {/* 카메라 뒤편 멀리 배치 */}
      <planeGeometry />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColorTop;
          uniform vec3 uColorBottom;
          uniform float uTime;
          varying vec2 vUv;

          // 미세한 노이즈 생성을 위한 함수 (그라데이션 계단 현상 방지)
          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
          }

          void main() {
            // y축 기준 그라데이션 믹스
            vec3 color = mix(uColorBottom, uColorTop, vUv.y);
            
            // 미세한 노이즈 추가 (목업 질감 재현)
            float noise = random(vUv + uTime * 0.01) * 0.03;
            color += noise;

            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  )
}

```

---

## 3. 목업 대비 주요 보정 포인트

* **Z-축 배치 (`-15`)**: 배경을 카메라에서 멀리 배치함으로써, 마우스 이동 시 전경 오브젝트와 배경 사이의 시차(Parallax)가 발생하여 훨씬 강력한 입체감이 느껴집니다.
* **색상 믹싱**: 하단의 네이비 톤은 버튼의 노란 발광(`pointLight`)을 더 돋보이게 하는 보색 역할을 합니다.
* **노이즈 셰이더**: 목업 이미지에서 느껴지는 아날로그적인 질감을 구현하기 위해 픽셀 단위의 미세한 떨림을 추가했습니다.

---

**배경과 텍스트 발광이 준비되었습니다. 이제 마지막 단계로 가볼까요?**

1. **본문 텍스트 추가 및 배치**: 목업의 상세 문구를 중앙에 배치하고 부유 애니메이션 적용.
2. **커스텀 커서 완성**: 화면 중앙 상단의 화살표 3개 잔상 효과 구현.


---

마지막 단계인 **본문 텍스트 추가 및 부유 애니메이션** 구현입니다. 목업 이미지의 중앙 상세 문구는 화면의 무게 중심을 잡아주며, 마우스 패럴랙스 시 기준점 역할을 수행합니다.

---

## 1. 본문 텍스트 및 부유 애니메이션 상세 계획

목업의 상세 문구는 단순한 정보 전달을 넘어 공간의 깊이감을 인지하게 하는 장치입니다.

1. **타이포그래피 배치**: 메인 타이틀보다 작은 폰트 사이즈를 적용하고, 가독성을 위해 자간과 행간을 넓게 설정합니다.
2. **부유 애니메이션 (Floating)**: `Math.sin` 함수를 활용하여 텍스트가 물 위에 떠 있는 듯이 위아래로 천천히 움직이게 합니다.
3. **지연된 패럴랙스 (Delayed Parallax)**: 마우스의 움직임에 즉각 반응하지 않고 약간의 지연 시간(Damping)을 두어 몽환적인 느낌을 극대화합니다.

---

## 2. 본문 텍스트 및 애니메이션 보정 코드

이 코드는 `Float` 컴포넌트와 `Text`를 결합하여 목업의 중앙 문구를 재현합니다.

```jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'

function FloatingDescription() {
  const textRef = useRef()

  // 마우스 움직임에 따른 미세한 각도 반응 (Parallax)
  useFrame((state) => {
    if (!textRef.current) return
    const { x, y } = state.mouse
    // 마우스 위치에 따라 텍스트가 아주 미세하게 기울어짐
    textRef.current.rotation.y = THREE.MathUtils.lerp(textRef.current.rotation.y, x * 0.1, 0.1)
    textRef.current.rotation.x = THREE.MathUtils.lerp(textRef.current.rotation.x, -y * 0.1, 0.1)
  })

  return (
    <Float
      speed={1.5} // 부유 속도
      rotationIntensity={0.2} // 회전 강도 (본문이므로 낮게 설정)
      floatIntensity={0.5} // 상하 이동 강도
    >
      <group ref={textRef} position={[0, -0.6, 0]}>
        <Text
          fontSize={0.22}
          maxWidth={6}
          textAlign="center"
          lineHeight={1.5}
          font="/fonts/serif-italic.woff" // 이탤릭체 권장
          color="white"
        >
          {"Don't be tired, it's a long way to go,\nbut it's a beautiful way."}
          <meshStandardMaterial 
            emissive="white" 
            emissiveIntensity={0.5} // 메인 타이틀보다 약하게 설정하여 시선 분산 방지
            toneMapped={false} 
          />
        </Text>
      </group>
    </Float>
  )
}

```

---

## 3. 최종 완성도 체크리스트 (목업 대비)

* **가독성**: 본문은 메인 타이틀보다 발광 강도(`emissiveIntensity`)를 낮추어 정보 전달력을 높였습니다.
* **리듬감**: `Float` 컴포넌트를 통해 사용자가 조작하지 않아도 화면이 살아 움직이는 '상시 유동형' 디자인을 완성했습니다.
* **레이아웃**: `maxWidth` 설정을 통해 목업처럼 적절한 지점에서 줄바꿈이 일어나도록 조절했습니다.

---

## 4. 인터랙티브 디자인 명세서 마무리

이제 모든 핵심 요소가 준비되었습니다.

| 구현 항목 | 기술적 포인트 | 상태 |
| --- | --- | --- |
| **3D 공간** | Three.js Canvas & Rigging | 완료 |
| **배경** | ShaderMaterial 그라데이션 + Noise | 완료 |
| **텍스트** | Emissive Material + Bloom 후처리 | 완료 |
| **애니메이션** | Math.sin 기반 Floating & Mouse Lerp | 완료 |

**축하합니다! 원더랜드 인터랙티브 페이지의 뼈대가 완성되었습니다.** 추가적으로 **"사용자가 'MOVE' 버튼을 클릭했을 때 다음 공간으로 빨려 들어가는 트랜지션 효과"**를 구현해 드릴까요? 혹은 다른 수정 사항이 있으신가요?

---

이전 답변에서 `FloatingDescription` 컴포넌트에 이미 부유 애니메이션과 미세한 마우스 반응 로직을 포함했습니다. 다만, 메인 타이틀 텍스트에도 동일한 부유 애니메이션을 적용하고, 배경 셰이더를 더욱 심해 느낌으로 강화하는 상세 계획 및 코드를 제공해 드립니다.

---

## 1. 메인 타이틀 부유 애니메이션 및 배경 셰이더 강화 상세 계획

### 1.1 메인 타이틀 텍스트 부유 애니메이션

* **컴포넌트 재활용**: `FloatingDescription` 컴포넌트에서 사용한 `Float` 컴포넌트를 메인 타이틀에도 적용합니다.
* **강도 조절**: 메인 타이틀은 더 크고 시선을 끄는 요소이므로, `floatIntensity`와 `speed`, `rotationIntensity` 값을 `FloatingDescription`보다 높게 설정하여 역동성을 강조합니다.
* **마우스 패럴랙스**: `useFrame` 훅을 사용하여 마우스 위치에 따라 텍스트 그룹 전체가 미세하게 회전하거나 이동하도록 조정하여 깊이감을 더합니다.

### 1.2 심해 느낌의 배경 셰이더 강화

* **색상 심화**: `uColorBottom`을 더욱 깊은 남색 또는 어두운 보라색으로 변경하고, `uColorTop`을 거의 블랙에 가깝게 유지하여 대비를 강화합니다.
* **움직이는 노이즈 패턴**: 셰이더 내부에 `fbm` (Fractal Brownian Motion) 또는 `perlin noise`와 같은 복잡한 노이즈 함수를 도입하여 정적인 그라데이션이 아닌, 마치 심해의 물결이나 성운처럼 은은하게 움직이는 패턴을 생성합니다.
* **광원 상호작용**: 셰이더 내부에 간단한 광원 계산을 추가하여, 씬의 `pointLight`에 반응하여 배경의 특정 부분이 살짝 밝아지도록 합니다. (선택 사항, 복잡도 증가)

---

## 2. 보정 코드

이 코드는 `WonderlandScene`의 `EmissiveText` 컴포넌트 사용 방식을 변경하고, `DeepWonderlandBackground` 셰이더를 업데이트합니다.

### 2.1 메인 타이틀 부유 애니메이션 적용 (WonderlandScene.jsx)

```jsx
import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, EffectComposer, Bloom, Noise } from '@react-three/drei'

// --- 기존 EmissiveText 컴포넌트 재활용 (발광 설정 포함) ---
function EmissiveText({ children, ...props }) {
    return (
      <Text
        {...props}
        font="/fonts/your-serif-font.woff" // 폰트 경로 확인
        anchorX="center"
        anchorY="middle"
      >
        {children}
        <meshStandardMaterial 
          color="white" 
          emissive="white" 
          emissiveIntensity={props.emissiveIntensity || 2.5} // props로 강도 조절 가능
          toneMapped={false} 
        />
      </Text>
    )
}

// --- 메인 타이틀을 위한 Floating 컴포넌트 ---
function MainTitleFloating() {
  const groupRef = useRef();
  const { mouse } = useThree(); // R3F의 useThree 훅 사용

  useFrame(() => {
    if (!groupRef.current) return;
    // 마우스 x, y 값에 따라 그룹 전체를 부드럽게 이동/회전
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.x * 0.5, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.y * 0.5, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.05, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.05, 0.05);
  });

  return (
    <Float
      speed={2} // 메인 타이틀은 좀 더 빠르게 부유
      rotationIntensity={0.5} // 더 큰 회전 강도
      floatIntensity={0.8} // 더 큰 상하 이동 강도
    >
      <group ref={groupRef}>
        <EmissiveText fontSize={0.8} position={[0, 1.5, 0]} emissiveIntensity={3}>
            MOUSE PARALLAX{"\n"}Goes to WONDERLAND
        </EmissiveText>
      </group>
    </Float>
  );
}

// --- DeepWonderlandBackground 컴포넌트 (셰이더 강화) ---
function DeepWonderlandBackground() {
    const uniforms = useMemo(() => ({
      uColorTop: { value: new THREE.Color('#000000') },
      uColorBottom: { value: new THREE.Color('#0A041B') }, // 더 깊은 보라빛 네이비
      uTime: { value: 0 }
    }), [])
  
    useFrame((state) => {
      uniforms.uTime.value = state.clock.getElapsedTime() * 0.05; // 노이즈 애니메이션 속도 조절
    })
  
    return (
      <mesh scale={[100, 100, 1]} position={[0, 0, -15]}>
        <planeGeometry />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform vec3 uColorTop;
            uniform vec3 uColorBottom;
            uniform float uTime;
            varying vec2 vUv;

            // Perlin Noise 또는 Simplex Noise 함수 (복잡한 패턴 생성)
            // 실제 구현 시 노이즈 라이브러리 또는 자체 함수 필요 (예시: pbr-noise)
            float N(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453); }
            float SmoothNoise(vec2 st) {
                vec2 i = floor(st);
                vec2 f = fract(st);
                // 큐빅 스무딩
                vec2 u = f*f*(3.0-2.0*f); 
                return mix(mix(N(i + vec2(0.,0.)), N(i + vec2(1.,0.)), u.x),
                           mix(N(i + vec2(0.,1.)), N(i + vec2(1.,1.)), u.x), u.y);
            }
            float FBM(vec2 st) {
                float v = 0.0;
                float a = 0.5;
                vec2 p = st;
                for (int i = 0; i < 4; i++) { // 4옥타브
                    v += a * SmoothNoise(p);
                    p = p * 2.0;
                    a *= 0.5;
                }
                return v;
            }

            void main() {
              vec3 color = mix(uColorBottom, uColorTop, vUv.y);
              
              // 시간과 UV에 따라 움직이는 심해 노이즈 추가
              float noise = FBM((vUv + uTime) * 3.0) * 0.2; // 노이즈 스케일과 강도 조절
              color += noise;

              gl_FragColor = vec4(color, 1.0);
            }
          `}
        />
      </mesh>
    )
  }

// --- WonderlandScene의 최종 구성 ---
export default function WonderlandScene() {
    return (
      <Canvas 
        gl={{ 
          antialias: true, 
          toneMapping: THREE.ReinhardToneMapping,
        }}
        camera={{ position: [0, 0, 8], fov: 45 }}
      >
        <color attach="background" args={['#050505']} /> {/* 초기 배경색은 여전히 블랙으로 유지 */}
        
        {/* 광원 설정 */}
        <ambientLight intensity={0.2} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[0, -4, 2]} color="#ffff00" intensity={5} distance={10} />
  
        <DeepWonderlandBackground /> {/* 심해 배경 적용 */}
        <MainTitleFloating /> {/* 메인 타이틀 부유 애니메이션 적용 */}
  
        {/* 본문 텍스트 (기존 FloatingDescription) */}
        <Float
            speed={1.5} 
            rotationIntensity={0.2} 
            floatIntensity={0.5} 
        >
            <Text
            fontSize={0.22}
            maxWidth={6}
            textAlign="center"
            lineHeight={1.5}
            font="/fonts/your-serif-font.woff" 
            color="white"
            position={[0, -0.6, 0]} // 위치는 여기에 직접 지정
            emissiveIntensity={0.5} // 본문은 발광 강도 낮춤
            toneMapped={false}
            >
            {"Don't be tired, it's a long way to go,\nbut it's a beautiful way."}
            </Text>
        </Float>
        
        {/* 기타 오브젝트 및 Rig, EffectComposer */}
        {/* ... (이전 코드의 Rig, FloatingObject 등 추가) */}

        <EffectComposer disableNormalPass>
          <Bloom 
            intensity={1.8}
            luminanceThreshold={0.5} 
            luminanceSmoothing={0.9} 
            mipmapBlur              
          />
          <Noise opacity={0.05} />
        </EffectComposer>
      </Canvas>
    )
  }

```

### 2.2 폰트 경로 주의사항

* `font="/fonts/your-serif-font.woff"` 부분은 실제 프로젝트의 폰트 파일 경로로 **반드시 교체**해야 합니다. (예: `/fonts/PlayfairDisplay-Regular.woff`)
* 웹폰트를 `.woff` 또는 `.woff2` 형식으로 변환하여 사용하는 것이 좋습니다.

---

## 3. 목업 대비 주요 개선점

* **메인 타이틀의 생동감**: `MainTitleFloating` 컴포넌트를 통해 메인 타이틀이 독립적으로 부유하고 마우스에 반응하여 몽환적인 느낌이 강화됩니다.
* **심화된 배경**: `DeepWonderlandBackground` 셰이더의 색상과 노이즈 패턴이 목업의 심해 분위기를 더욱 깊이 있게 표현합니다. `FBM` 함수는 단순한 노이즈를 넘어 성운과 같은 복잡한 질감을 생성합니다.

---
