// components/hero/cards/ChecklistCard.tsx
import NoteCard from '../NoteCard';

export default function ChecklistCard({ className }: { className?: string }) {
  return (
    <NoteCard className={`w-[200px] ${className}`}> {/* Example width, can be adjusted */}
      <h3 className="font-semibold text-sm mb-2">오늘 할 일</h3>
      <ul>
        <li className="flex items-center text-xs text-gray-700 mb-1">
          <svg className="w-3 h-3 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          문서 작성
        </li>
        <li className="flex items-center text-xs text-gray-700 mb-1">
          <svg className="w-3 h-3 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          회의 참석
        </li>
        <li className="flex items-center text-xs text-gray-700">
          <svg className="w-3 h-3 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          아이디어 정리
        </li>
      </ul>
    </NoteCard>
  );
}
