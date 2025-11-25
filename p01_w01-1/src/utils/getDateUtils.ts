// src/utils/getDateUtils.ts (예시 경로)

/**
 * 현재 시간을 로컬 타임존 기준으로 'YYYYMMDD_HHmmss' 형태의 문자열로 포맷하여 반환합니다.
 * 파일 이름으로 사용하기 적합하도록 특수 문자를 제거합니다.
 * * @returns {string} 예: "2025-11-25_121832"
 */
export function getFormattedDateTime(): string {
  const now = new Date();

  // toLocaleDateString() 및 toLocaleTimeString()을 사용하여 로컬 시간을 얻습니다.

  // 1. 날짜 부분 (YYYY-MM-DD)
  const datePart = now
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, "-")
    .replace(/\./g, "")
    .trim();
  // '2025. 11. 25.' -> '2025-11-25' 형태로 변환 (지역화된 구두점 처리)

  // 2. 시간 부분 (HHmmss)
  const timePart = now
    .toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24시간 형식 사용
    })
    .replace(/ /g, "")
    .replace(/:/g, ""); // '12:16:08' -> '121608' 형태로 변환

  // 3. 최종 포맷: YYYY-MM-DD_HHmmss
  return `${datePart}_${timePart}`;
}
