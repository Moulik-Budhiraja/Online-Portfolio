type CancelIconProps = {
  text?: string;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
};

export default function CancelIcon({
  text,
  className,
  iconClassName,
  onClick,
}: CancelIconProps) {
  return (
    <div
      className={`cursor-pointer group/cancel-icon flex gap-1 ${
        className || ""
      }`}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full ${iconClassName || ""}`}
      >
        <title />

        <g id="cross">
          <line
            className="stroke-neutral-500 group-hover/cancel-icon:stroke-neutral-100 transition-colors duration-300 ease-out"
            x1="7"
            x2="25"
            y1="7"
            y2="25"
          />
          <line
            className="stroke-neutral-500 group-hover/cancel-icon:stroke-neutral-100 transition-colors duration-300 ease-out"
            x1="7"
            x2="25"
            y1="25"
            y2="7"
          />
        </g>
      </svg>
      <span className="font-display text-neutral-400 opacity-90 group-hover/cancel-icon:text-neutral-100 transition-colors duration-300 ease-out">
        {text}
      </span>
    </div>
  );
}
