import { getUserProfile } from '@/features/auth/actions';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function ProfilePage() {
    const user = await getUserProfile();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="container py-10">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">Profile</CardTitle>
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={user.avatar_url || ''} />
                        <AvatarFallback>{user.username ? user.username[0].toUpperCase() : 'U'}</AvatarFallback>
                    </Avatar>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold">Username</h3>
                        <p className="text-muted-foreground">{user.username}</p>
                    </div>
                    {user.email && (
                        <div>
                            <h3 className="text-lg font-semibold">Email</h3>
                            <p className="text-muted-foreground">{user.email}</p>
                        </div>
                    )}
                    {user.bio && (
                        <div>
                            <h3 className="text-lg font-semibold">Bio</h3>
                            <p className="text-muted-foreground">{user.bio}</p>
                        </div>
                    )}
                    <div>
                        <h3 className="text-lg font-semibold">Points</h3>
                        <p className="text-muted-foreground">{user.points}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Member Since</h3>
                        <p className="text-muted-foreground">{new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
