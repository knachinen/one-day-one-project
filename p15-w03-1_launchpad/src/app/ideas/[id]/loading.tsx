import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="container py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-6 w-full" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className="h-6 w-40" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Skeleton className="h-8 w-1/2" />
                        <div className="space-y-4">
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <Skeleton className="h-6 w-32" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-6 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
