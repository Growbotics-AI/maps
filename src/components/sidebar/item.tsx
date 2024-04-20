"use client";
import { useMemo, useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import SubMenuItem from "./sub-item";

interface ISidebarItem {
  name: string;
  path: string;
  icon: LucideIcon;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const SidebarItem = ({ item, isCollapsed }: { item: ISidebarItem, isCollapsed: boolean }) => {
  const { name, icon: Icon, items, path } = item;
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    if (items && items.length > 0) {
      setExpanded(!expanded);
    } else {
      router.push(path);
    }
  };

  const isActive = useMemo(() => {
    return items?.some(subItem => subItem.path === pathname) ?? (path === pathname);
  }, [items, path, pathname]);

  return (
    <>
      <div
        className={`flex items-center p-3 rounded-lg hover:bg-gray-200 cursor-pointer justify-between ${isActive ? "bg-gray-200" : ""}`}
        onClick={onClick}
      >
        <div className="flex items-center space-x-2">
          {Icon && <Icon size={20} />}
          {!isCollapsed && <p className="text-base font-semibold">{name}</p>}
        </div>
        {/* Render ChevronDown only when sidebar is not collapsed and items exist */}
        {!isCollapsed && items && items.length > 0 && <ChevronDown size={18} />}
      </div>
      {expanded && items && (
        <div className={`flex flex-col space-y-1 ml-10 ${isCollapsed ? 'hidden' : 'block'}`}>
          {items.map(subItem => (
            <SubMenuItem key={subItem.path} item={subItem} isCollapsed={isCollapsed} />
          ))}
        </div>
      )}
    </>
  );
};


export default SidebarItem;
