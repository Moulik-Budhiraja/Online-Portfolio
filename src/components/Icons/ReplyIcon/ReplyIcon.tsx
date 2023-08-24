type ReplyIconProps = {
  className?: string;
  onClick?: () => void;
};

export default function ReplyIcon({ className, onClick }: ReplyIconProps) {
  return (
    <div className={className}>
      <svg
        className="w-full cursor-pointer group/reply-icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <g id="Arrow / Arrow_Undo_Up_Left">
          <path
            id="Vector"
            d="M7 13L3 9M3 9L7 5M3 9H16C18.7614 9 21 11.2386 21 14C21 16.7614 18.7614 19 16 19H11"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.3"
            className="stroke-neutral-500 group-hover/reply-icon:stroke-neutral-100 transition-colors duration-300 ease-out"
          />
        </g>
      </svg>
    </div>
  );
}
