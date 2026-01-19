import Image from "next/image";

export const ProfileImage = () => {
  return (
    <div className="relative w-full max-w-md mx-auto lg:max-w-none">
      <div className="relative aspect-[4/5] w-full h-auto lg:h-[480px] rounded-[32px] overflow-hidden bg-slate-200">
        <Image
          src="/images/profile.svg"
          alt="Profile"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};
