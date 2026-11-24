import { Globe, LayoutTemplate, ShoppingBag, Smartphone } from 'lucide-react';
import type { ServiceIcon } from '@/lib/services';

const map = {
  globe: Globe,
  wordpress: LayoutTemplate,
  shopping: ShoppingBag,
  mobile: Smartphone,
} as const;

export function ServiceIconView({
  name,
  size = 22,
  className,
}: {
  name: ServiceIcon;
  size?: number;
  className?: string;
}) {
  const Icon = map[name];
  return <Icon size={size} className={className} aria-hidden="true" />;
}
