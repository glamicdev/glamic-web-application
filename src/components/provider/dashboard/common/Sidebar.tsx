import { Home, Calendar, MessageSquare, Workflow, Users2, Tag, Settings, Users, BookOpen, Brain, LineChart } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type MenuLabel = 'home' | 'calendar' | 'chat' | 'workflow' | 'team' | 'bookings' | 'settings' | 'bookings' | 'ai' | 'clients' | 'marketing' | 'services';

interface MenuItem {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: MenuLabel;
  active?: boolean;
  path: string;
}

export function Sidebar() {
  const { translations } = useLanguage();
  const t = translations?.dashboard?.sidebar;
  const [hoveredItem, setHoveredItem] = useState<MenuLabel | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { icon: Home, label: 'home', path: '/dashboard/home' },
    { icon: Workflow, label: 'workflow', path: '/dashboard/workflow' },
    { icon: Calendar, label: 'calendar', path: '/dashboard/calendar' },
    { icon: MessageSquare, label: 'chat', path: '/dashboard/chat' },
    { icon: BookOpen, label: 'bookings', path: '/dashboard/bookings' },
    { icon: Users2, label: 'team', path: '/dashboard/team' },
    { icon: Tag, label: 'services', path: '/dashboard/services' },
    { icon: Brain, label: 'ai', path: '/dashboard/ai' },
    { icon: Users, label: 'clients', path: '/dashboard/clients' },
    { icon: LineChart, label: 'marketing', path: '/dashboard/marketing' },
    { icon: Settings, label: 'settings', path: '/dashboard/settings' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Split items into top and bottom sections
  const topItems = menuItems.slice(0, 5); // First 6 items
  const bottomItems = menuItems.slice(6); // Remaining items

  return (
    <aside className="fixed left-0 top-0 h-full z-50">
      <div className="w-16 bg-primary-navy h-full flex flex-col py-6 relative">
        {/* Top Menu Items */}
        <div className="space-y-2">
          {topItems.map(({ icon: Icon, label, path }) => (
            <button
              key={label}
              className="relative w-full group"
              onMouseEnter={() => setHoveredItem(label)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavigation(path)}
              title={label}
              aria-label={label}
            >
              <div className={`flex items-center justify-center p-3 mx-3 rounded-xl transition-colors ${
                location.pathname === path
                  ? 'bg-primary-gold text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              
              {/* Expanded Label */}
              {hoveredItem === label && (
                <div className="absolute left-full top-0 ml-2 bg-primary-navy rounded-r-xl py-3 px-4 whitespace-nowrap text-white shadow-lg flex items-center gap-3 animate-fadeIn">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium capitalize">{label}</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 w-full border-t border-gray-700" />

        {/* Bottom Menu Items */}
        <div className="space-y-2">
          {bottomItems.map(({ icon: Icon, label, path }) => (
            <button
              key={label}
              className="relative w-full group"
              onMouseEnter={() => setHoveredItem(label)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleNavigation(path)}
              title={label}
              aria-label={label}
            >
              <div className={`flex items-center justify-center p-3 mx-3 rounded-xl transition-colors ${
                location.pathname === path
                  ? 'bg-primary-gold text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              
              {/* Expanded Label */}
              {hoveredItem === label && (
                <div className="absolute left-full top-0 ml-2 bg-primary-navy rounded-r-xl py-3 px-4 whitespace-nowrap text-white shadow-lg flex items-center gap-3 animate-fadeIn">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium capitalize">{label}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}