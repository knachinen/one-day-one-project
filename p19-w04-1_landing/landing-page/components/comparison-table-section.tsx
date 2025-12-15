import { motion } from "framer-motion";
import { Variants } from 'framer-motion';

export default function ComparisonTableSection() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const pulseVariants: Variants = { 
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.02, 1],
      transition: { 
        duration: 1.5, 
        repeat: Infinity, 
        ease: "easeInOut" // Now this string should be correctly inferred/accepted
      } 
    },
  };
  return (
    <section id="comparison-table" className="py-[100px] lg:py-[120px] bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          {/* Sub-label */}
          <span className="inline-flex items-center rounded-full bg-vibe-blue/10 px-3 py-1 text-sm font-medium text-vibe-blue mb-4">
            Why Vibe Coding?
          </span>
          {/* Main H2 */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            왜 바이브코딩인가요?
          </h2>
          {/* Description */}
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            수개월 걸리는 독학이나 비싼 외주 대신, 단 3시간 만에 나만의 앱을 완성하세요.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto w-full">
          <motion.table
            className="min-w-full divide-y divide-gray-200"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.1 }} // Stagger children for sequential animation
          >
            <thead className="bg-gray-50">
              <motion.tr variants={itemVariants}>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  구분
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  독학
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  온라인 강의
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  개발 외주
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-vibe-blue">
                  바이브코딩
                </th>
              </motion.tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Row 1: 소요 시간 */}
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">소요 시간</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3~6개월 (시행착오 발생) <span className="text-red-500 font-bold">X</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1~2개월 (완성률 5% 미만) <span className="text-red-500 font-bold">X</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">일정 협의 (대기 시간 발생) <span className="text-red-500 font-bold">X</span></td>
                <motion.td
                  className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white bg-vibe-blue/80"
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                >
                  단 3시간 (당일 완성 가능) <span className="text-green-300 font-bold">V</span>
                </motion.td>
              </motion.tr>
              {/* Row 2: 비용 */}
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">비용</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">저렴함 (자기주도적) <span className="text-green-500 font-bold">V</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">보통 (30~50만원대)</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">매우 비쌈 (건당 비용 청구) <span className="text-red-500 font-bold">X</span></td>
                <motion.td
                  className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white bg-vibe-blue/80"
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                >
                  합리적 (최소 비용 투자) <span className="text-green-300 font-bold">V</span>
                </motion.td>
              </motion.tr>
              {/* Row 3: 실시간 지원 */}
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">실시간 지원</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">X (답변 지연) <span className="text-red-500 font-bold">X</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">X (답변 대기) <span className="text-red-500 font-bold">X</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1:1 코칭 (실시간 화면 공유)</td>
                <motion.td
                  className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white bg-vibe-blue/80"
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                >
                  V (1:1 코칭, 실시간 화면 공유) <span className="text-green-300 font-bold">V</span>
                </motion.td>
              </motion.tr>
              {/* Row 4: 후속 지원 */}
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">후속 지원</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">X (스스로 해결) <span className="text-red-500 font-bold">X</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">X (수강생 전체 공통) <span className="text-red-500 font-bold">X</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">유지보수 계약 (별도 비용 발생)</td>
                <motion.td
                  className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white bg-vibe-blue/80"
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                >
                  V (평생 멘토링, 커뮤니티 시스템) <span className="text-green-300 font-bold">V</span>
                </motion.td>
              </motion.tr>
              {/* Row 5: 맞춤형 교육 */}
              <motion.tr variants={itemVariants}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">맞춤형 교육</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">낮음 (스스로 탐색) <span className="text-red-500 font-bold">X</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">낮음 (정해진 커리큘럼) <span className="text-red-500 font-bold">X</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">높음 (요구 사항 맞춤)</td>
                <motion.td
                  className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white bg-vibe-blue/80"
                  variants={pulseVariants}
                  initial="initial"
                  animate="animate"
                >
                  V (개인 맞춤, 내 아이디어 실현) <span className="text-green-300 font-bold">V</span>
                </motion.td>
              </motion.tr>
            </tbody>
          </motion.table>
        </div>

        {/* Final CTA below table */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-800">망설일 시간이 없습니다</h3>
          <p className="mt-2 text-lg text-gray-600">이미 3,000명 이상의 수강생이 자신만의 앱을 만들었습니다.</p>
          <button className="mt-4 bg-gradient-to-r from-vibe-blue to-energy-orange hover:from-vibe-blue/90 hover:to-energy-orange/90 text-white font-bold py-3 px-8 rounded-full text-lg">
            지금 3시간 만에 앱 만들기 🚀
          </button>
        </div>
      </div>
    </section>
  );
}
