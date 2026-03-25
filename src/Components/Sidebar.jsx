const navItems = [
  {
    section: "Requests",
    items: [
      {
        label: "Board",
        icon: (
          <svg
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        ),
      },
      {
        label: "Chat",
        icon: (
          <svg
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        ),
      },
    ],
  },
  {
    section: "Users",
    items: [
      {
        label: "Admins",
        icon: (
          <svg
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        ),
      },
      {
        label: "Clients",
        icon: (
          <svg
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <circle cx="9" cy="8" r="4" />
            <path d="M2 20c0-3.3 3.1-6 7-6" />
            <circle cx="17" cy="10" r="3" />
            <path d="M14 20c0-2.8 2.7-5 6-5" />
          </svg>
        ),
      },
      {
        label: "Segments",
        icon: (
          <svg
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
            <path d="M12 2a10 10 0 0 1 10 10H12z" />
          </svg>
        ),
      },
    ],
  },
  {
    section: "Marketing",
    items: [
      {
        label: "Story",
        active: true,
        icon: (
          <svg
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
        ),
      },
      {
        label: "Banner",
        icon: (
          <svg
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 9h18" />
          </svg>
        ),
      },
    ],
  },
  {
    section: "Settings",
    items: [
      {
        label: "Request types",
        icon: (
          <svg
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
          </svg>
        ),
      },
      {
        label: "Language settings",
        icon: (
          <svg
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
          </svg>
        ),
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="h-screen bg-white border-r border-gray-100 flex flex-col select-none">
      <div className="px-4 py-4 flex items-center gap-2 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
          </svg>
        </div>
        <div className="leading-tight">
          <div className="text-[11px] font-bold text-gray-800 tracking-wide">
            MIO BEAUTY
          </div>
          <div className="text-[10px] text-gray-400">Support</div>
        </div>
        <button className="ml-auto text-gray-300 hover:text-gray-500">
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {navItems.map((group) => (
          <div key={group.section} className="mb-1">
            <div className="flex items-center justify-between px-2 pt-3 pb-1">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                {group.section}
              </span>
              <svg
                width="12"
                height="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </div>
            {group.items.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left text-[12px] transition-colors
                  ${
                    item.active
                      ? "bg-gray-100 text-gray-800 font-medium"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
              >
                <span
                  className={item.active ? "text-gray-600" : "text-gray-400"}
                >
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-3 border-t border-gray-100 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold text-gray-700 truncate">
            Ism Familiya
          </div>
          <div className="text-[10px] text-gray-400">Administrator</div>
        </div>
        <svg
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
          className="text-gray-400"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </div>
    </aside>
  );
}
