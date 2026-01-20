-- Enable RLS
alter table posts enable row level security;

-- Policy: Users can view their own posts
create policy "Users can view own posts" 
on posts for select 
using ( auth.uid() = user_id );

-- Policy: Users can insert their own posts
create policy "Users can insert own posts" 
on posts for insert 
with check ( auth.uid() = user_id );

-- Policy: Users can update their own posts
create policy "Users can update own posts" 
on posts for update 
using ( auth.uid() = user_id );

-- Policy: Users can delete their own posts
create policy "Users can delete own posts" 
on posts for delete 
using ( auth.uid() = user_id );
