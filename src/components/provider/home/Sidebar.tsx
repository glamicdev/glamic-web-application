import { Home, Calendar, Tag, Users, Book, Bell, BarChart, Settings } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { useState } from 'react';

type MenuLabel = 'home' | 'calendar' | 'services' | 'clients' | 'bookings' | 'notifications' | 'analytics' | 'settings';

interface MenuItem {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: MenuLabel;
  active?: boolean;
  page?: string;
}

const menuItems: MenuItem[] = [
  { icon: Home, label: 'home', page: 'home' },
  { icon: Calendar, label: 'calendar', active: true },
  { icon: Tag, label: 'services' },
  { icon: Users, label: 'clients' },
  { icon: Book, label: 'bookings' },
  { icon: Bell, label: 'notifications' },
  { icon: BarChart, label: 'analytics' },
  { icon: Settings, label: 'settings' }
];

export function Sidebar() {
  const { translations } = useLanguage();
  const t = translations?.dashboard?.sidebar;
  const [hoveredItem, setHoveredItem] = useState<MenuLabel | null>(null);

  return (
    <aside className="fixed left-0 top-0 h-full z-50">
      <div className="w-16 bg-primary-navy h-full flex flex-col py-6 relative">
        {/* Top Menu Items */}
        <div className="space-y-2">
          {menuItems.slice(0, 4).map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className="relative w-full group"
              onMouseEnter={() => setHoveredItem(label)}
              onMouseLeave={() => setHoveredItem(null)}
              title={t?.[label] || label}
              aria-label={t?.[label] || label}
              aria-current={active ? 'page' : undefined}
            >
              <div className={`flex items-center justify-center p-3 mx-3 rounded-xl transition-colors ${
                active 
                  ? 'bg-primary-gold text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              
              {/* Expanded Label */}
              {hoveredItem === label && (
                <div className="absolute left-full top-0 ml-2 bg-primary-navy rounded-r-xl py-3 px-4 whitespace-nowrap text-white shadow-lg flex items-center gap-3 animate-fadeIn">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{t?.[label] || label}</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 w-full border-t border-gray-700" />

        {/* Bottom Menu Items */}
        <div className="space-y-2">
          {menuItems.slice(4).map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className="relative w-full group"
              onMouseEnter={() => setHoveredItem(label)}
              onMouseLeave={() => setHoveredItem(null)}
              title={t?.[label] || label}
              aria-label={t?.[label] || label}
              aria-current={active ? 'page' : undefined}
            >
              <div className={`flex items-center justify-center p-3 mx-3 rounded-xl transition-colors ${
                active 
                  ? 'bg-primary-gold text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              
              {/* Expanded Label */}
              {hoveredItem === label && (
                <div className="absolute left-full top-0 ml-2 bg-primary-navy rounded-r-xl py-3 px-4 whitespace-nowrap text-white shadow-lg flex items-center gap-3 animate-fadeIn">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{t?.[label] || label}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}