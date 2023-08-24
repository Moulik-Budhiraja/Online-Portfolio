type EditIconProps = {
  className?: string;
  onClick?: () => void;
};

export default function EditIcon({ className, onClick }: EditIconProps) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className="w-full h-full cursor-pointer group/edit-icon"
        onClick={onClick}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.16"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            className="stroke-neutral-500 group-hover/edit-icon:stroke-neutral-100 transition-colors duration-300 ease-out"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.3"
            d="M3.8 12.963L2 18l4.8-.63L18.11 6.58a2.612 2.612 0 00-3.601-3.785L3.8 12.963z"
          ></path>{" "}
        </g>
      </svg>
    </div>
  );
}
