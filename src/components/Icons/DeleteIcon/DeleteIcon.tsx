type DeleteIconProps = {
  className?: string;
  onClick?: () => void;
};

export default function DeleteIcon({ className, onClick }: DeleteIconProps) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#ffffff"
        className={`w-full cursor-pointer group/delete-icon`}
        onClick={onClick}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M4 7H20"
            className="stroke-neutral-500 group-hover/delete-icon:stroke-neutral-100 transition-colors duration-300 ease-out"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
          <path
            d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10"
            className="stroke-neutral-500 group-hover/delete-icon:stroke-neutral-100 transition-colors duration-300 ease-out"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
          <path
            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
            className="stroke-neutral-500 group-hover/delete-icon:stroke-neutral-100 transition-colors duration-300 ease-out"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
    </div>
  );
}
