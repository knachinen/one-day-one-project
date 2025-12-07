import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    user_id!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password_hash!: string;

    @Column({ nullable: true })
    nickname?: string;

    @Column({ nullable: true })
    profile_image_url?: string;

    @Column({ nullable: true })
    bio?: string;

    @Column({ default: "local" })
    provider!: string; // 'local', 'google', 'kakao'

    @CreateDateColumn()
    created_at!: Date;
}
