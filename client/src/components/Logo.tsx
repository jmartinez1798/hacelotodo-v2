interface LogoProps {
  size?: number;
}

export default function Logo({ size = 22 }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <svg 
        width={size + 6} 
        height={size + 6} 
        viewBox="0 0 64 64" 
        role="img" 
        aria-label="Hacelotodo"
        className="flex-shrink-0"
      >
        <rect rx="12" width="64" height="64" fill="#2563eb"/>
        <path d="M16 18h8v12h16V18h8v28h-8V34H24v12h-8V18z" fill="#fff"/>
      </svg>
      <div className="font-black tracking-tight" style={{ fontSize: size }}>
        <span className="text-blue-600">Hacelotodo</span>
        <span className="text-slate-400">.com</span>
      </div>
    </div>
  );
}