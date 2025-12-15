import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProblemStatementSection() {
  return (
    <section id="problem-statement" className="py-[100px] lg:py-[120px] bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12">
          {/* Sub-label: "PROBLEM STATEMENT" (chip style, Primary Blue background) */}
          <span className="inline-flex items-center rounded-full bg-vibe-blue/10 px-3 py-1 text-sm font-medium text-vibe-blue mb-4">
            PROBLEM STATEMENT
          </span>
          {/* Main H2 */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            이런 고민 하고 계시나요?
          </h2>
          {/* Description */}
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            앱 개발, 시작하기도 전에 높은 벽에 부딪히셨나요? 수많은 예비 창업자와 기획자들이 겪는 공통적인 어려움입니다.
          </p>
        </div>

        {/* 3-Column Grid for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Card className="min-h-[380px] flex flex-col justify-between items-center text-left p-0">
            <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold text-gray-800">개발자 구인난</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription className="text-gray-600">"좋은 아이디어는 있는데 내 생각을 실현해줄 개발자를 구할 수가 없어요. 팀 빌딩부터 막막합니다."</CardDescription>
            </CardContent>
            <CardFooter className="mt-6">
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-gray-800">
                    👍 막막해요 +342
                </span>
            </CardFooter>
          </Card>
          {/* Card 2 */}
          <Card className="min-h-[380px] flex flex-col justify-between items-center text-left p-0">
            <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold text-gray-800">비싼 외주 비용</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription className="text-gray-600">"간단한 MVP 하나 만드는데도 천만 원 넘는 견적을 받았어요. 초기 자본으로 큰 투자가 나갑니다."</CardDescription>
            </CardContent>
            <CardFooter className="mt-6">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-gray-800">
                    💰 너무 비싸요 +521
                </span>
            </CardFooter>
          </Card>
          {/* Card 3 */}
          <Card className="min-h-[380px] flex flex-col justify-between items-center text-left p-0">
            <CardHeader className="text-center">
                <CardTitle className="text-xl font-semibold text-gray-800">높은 진입 장벽</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription className="text-gray-600">"코딩을 직접 배우려고 학원을 알아봤는데 최소 6개월은 걸린대요. 지금 당장 시작하고 싶은데 시간이 없어요."</CardDescription>
            </CardContent>
            <CardFooter className="mt-6">
                <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-gray-800">
                    😔 너무 어려워요 +418
                </span>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
