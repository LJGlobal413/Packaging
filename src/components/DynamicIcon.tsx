import React from 'react';
import {
  Printer,
  Zap,
  Maximize2,
  Package,
  Tag,
  BookOpen,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Award,
  Sparkles,
  Layers,
  Send,
  ExternalLink,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  HelpCircle,
  ChevronRight,
  Filter,
  Check,
  Cpu,
  Truck,
  Box,
  Compass,
} from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', size }) => {
  const props = size ? { size, className } : { className };

  switch (name) {
    case 'Printer':
      return <Printer {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'Maximize2':
      return <Maximize2 {...props} />;
    case 'Package':
      return <Package {...props} />;
    case 'Tag':
      return <Tag {...props} />;
    case 'BookOpen':
      return <BookOpen {...props} />;
    case 'FileText':
      return <FileText {...props} />;
    case 'CheckCircle2':
      return <CheckCircle2 {...props} />;
    case 'ShieldCheck':
      return <ShieldCheck {...props} />;
    case 'Globe':
      return <Globe {...props} />;
    case 'Award':
      return <Award {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    case 'Layers':
      return <Layers {...props} />;
    case 'Send':
      return <Send {...props} />;
    case 'ExternalLink':
      return <ExternalLink {...props} />;
    case 'PhoneCall':
      return <PhoneCall {...props} />;
    case 'Mail':
      return <Mail {...props} />;
    case 'MapPin':
      return <MapPin {...props} />;
    case 'Clock':
      return <Clock {...props} />;
    case 'HelpCircle':
      return <HelpCircle {...props} />;
    case 'ChevronRight':
      return <ChevronRight {...props} />;
    case 'Filter':
      return <Filter {...props} />;
    case 'Check':
      return <Check {...props} />;
    case 'Cpu':
      return <Cpu {...props} />;
    case 'Truck':
      return <Truck {...props} />;
    case 'Box':
      return <Box {...props} />;
    case 'Compass':
      return <Compass {...props} />;
    default:
      return <Printer {...props} />;
  }
};
