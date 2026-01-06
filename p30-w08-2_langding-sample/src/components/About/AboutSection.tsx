import Image from 'next/image';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section id="about" className={styles.aboutSection}>
      {/* 좌측: 이미지 영역 */}
      <div className={styles.imageArea}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/images/profile-placeholder.jpg"
            alt="Profile Image"
            fill
            className={styles.profileImage}
            priority
          />
        </div>
        <div className={styles.imageInfo}>
          <div className={styles.location}>
            <span>🔵</span> Seoul, South Korea
          </div>
          <div className={styles.socialButtons}>
            <button className={styles.iconBtn} aria-label="Email">✉️</button>
            <button className={styles.iconBtn} aria-label="Link">🔗</button>
          </div>
        </div>
      </div>

      {/* 우측: 콘텐츠 영역 */}
      <div className={styles.contentArea}>
        <div className={styles.label}>ABOUT ME</div>
        <h2 className={styles.headline}>
          <span className={styles.subHeadline}>사용자 경험을 먼저 생각하는</span> 디자이너 <strong>김철수</strong>입니다.
        </h2>
        
        <div className={styles.description}>
          <p>
            단순히 아름다운 디자인을 넘어, 사용자의 문제를 해결하고 
            비즈니스 가치를 창출하는 디자인의 힘을 믿습니다.
          </p>
          <p>
            지난 5년간 다양한 프로젝트를 수행하며 논리적인 설계와 
            감각적인 시각화를 통해 최적의 결과물을 만들어왔습니다.
          </p>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <h4>✨ 관심 분야</h4>
            <p>UI/UX 디자인, 타이포그래피, 마이크로 인터랙션, 디자인 시스템</p>
          </div>
          <div className={styles.infoItem}>
            <h4>⚙️ 작업 스타일</h4>
            <p>사용자 경험 중심, 간결한 문제 해결, 논리적 설계, 데이터 기반 의사결정</p>
          </div>
          <div className={styles.infoItem}>
            <h4>🛠️ 주요 도구</h4>
            <p>Figma, Protopie, React, Framer</p>
          </div>
          <div className={styles.infoItem}>
            <h4>🎓 학력</h4>
            <p>한국대학교 시각디자인과 졸업
2018.03 – 2022.02</p>
          </div>
        </div>

        <div className={styles.ctaBox}>
          <div className={styles.ctaText}>
            <h4>더 자세한 이력이 궁금하신가요?</h4>
            <p>PDF 형식의 전체 이력서를 확인해보세요.</p>
          </div>
          <button className={styles.downloadBtn}>이력서 다운로드</button>
        </div>
      </div>
    </section>
  );
}