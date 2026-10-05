import { Outlet, NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const MainLayout = () => {
  const navItems = [
    { to: "/", icon: "home", label: "Trang chủ" },
    { to: "/workout", icon: "fitness_center", label: "Tập luyện" },
    { to: "/nutrition", icon: "nutrition", label: "Dinh dưỡng" },
    { to: "/progress", icon: "monitoring", label: "Tiến trình" },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      
      <nav className="absolute bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-4px_20px_rgba(15,23,42,0.06)]">
        <div className="grid grid-cols-5 items-center h-16 px-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(
                "flex flex-col items-center justify-center min-h-[48px] py-1 transition-all gap-0.5",
                isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {({ isActive }) => (
                <>
                  <span className="material-symbols-outlined text-[22px]" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                    {item.icon}
                  </span>
                  <span className="text-[11px] leading-none">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
          
          {/* AI Coach Special Button */}
          <NavLink
            to="/ai-coach"
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center min-h-[48px] py-1 transition-all gap-0.5 relative",
              isActive ? "text-tertiary font-bold" : "text-on-surface-variant hover:text-tertiary"
            )}
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-tertiary to-primary-container shadow-[0_2px_10px_rgba(115,46,228,0.25)] text-on-tertiary">
              <span className="material-symbols-outlined text-[17px]">auto_awesome</span>
            </div>
            <span className="text-[11px] leading-none font-semibold text-tertiary">AI Coach</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
