import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export default function Home() {
  return (
    <main className="container-custom py-20 space-y-20">
      <section className="space-y-4">
        <Badge variant="primary">UI Foundation</Badge>
        <h1 className="text-gray-900">Landing Template UI Kit</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          제공된 명세서의 디자인 토큰과 공통 컴포넌트가 적용된 기반 환경입니다.
          Next.js, Tailwind CSS v4, Framer Motion, Pretendard 폰트가 설정되었습니다.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button isLoading>Loading</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section className="space-y-8 max-w-md">
        <h2 className="text-3xl font-bold">Inputs</h2>
        <div className="space-y-4">
          <Input placeholder="Default Input" />
          <Input placeholder="Error Input" error="이 필드는 필수입니다." />
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Badges</h2>
        <div className="flex flex-wrap gap-4">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="error">Error</Badge>
        </div>
      </section>
    </main>
  );
}