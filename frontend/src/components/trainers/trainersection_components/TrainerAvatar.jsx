function TrainerAvatar({ avatar, rounded }) {
  return (
    <div className="relative z-10 lg:py-16">
      <div className="relative h-64 sm:h-80 lg:h-full">
        <img
          alt="trainer avatar"
          src={`${avatar}`}
          className={`absolute inset-0 h-full w-full object-cover ${rounded} lg:rounded-3xl`}
        />
      </div>
    </div>
  );
}

export default TrainerAvatar;
