import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Camera,
  CameraOff,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  Edit3,
  FileText,
  FolderPlus,
  HeartPulse,
  HelpCircle,
  Image as ImageIcon,
  Info,
  LayoutGrid,
  ListChecks,
  type LucideIcon,
  Megaphone,
  MessageCircle,
  Mic,
  Paperclip,
  Pill,
  Plus,
  PlusCircle,
  RotateCw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Type,
  User,
  Users,
  Utensils,
  ZapOff,
} from "lucide-react";

// Mapping legacy Material-Symbols names -> Lucide components
// + new spec icons (layout-grid, users, plus-circle, image, message)
const ICONS: Record<string, LucideIcon> = {
  // navigation / common
  "layout-grid": LayoutGrid,
  "layout_grid": LayoutGrid,
  dashboard: LayoutGrid,
  users: Users,
  "plus-circle": PlusCircle,
  plus_circle: PlusCircle,
  image: ImageIcon,
  message: MessageCircle,
  message_circle: MessageCircle,
  child_care: Users,
  folder: BookOpen,
  person: User,
  calendar_today: Calendar,
  calendar: Calendar,
  // arrows
  arrow_back: ArrowLeft,
  arrow_forward: ArrowRight,
  chevron_right: ChevronRight,
  // actions
  add: Plus,
  add_a_photo: Camera,
  check: Check,
  check_circle: CheckCircle2,
  search: Search,
  send: Send,
  edit: Edit3,
  download: Download,
  cameraswitch: RotateCw,
  flash_off: ZapOff,
  photo_camera: Camera,
  attach_file: Paperclip,
  create_new_folder: FolderPlus,
  // notifications / alerts
  notifications: AlertTriangle,
  campaign: Megaphone,
  info: Info,
  help: HelpCircle,
  verified: ShieldCheck,
  settings: Settings,
  // domain
  schedule: Clock,
  medical_services: Pill,
  family_restroom: HeartPulse,
  school: BookOpen,
  auto_awesome: Sparkles,
  format_bold: Type,
  format_italic: Type,
  format_list_bulleted: ListChecks,
  mic: Mic,
  picture_as_pdf: FileText,
  description: FileText,
  music_note: FileText,
  toys: Sparkles,
  directions_run: Sparkles,
  palette: Sparkles,
  menu_book: BookOpen,
};

export function Icon({
  name,
  filled,
  className,
  size = 24,
}: {
  name: string;
  filled?: boolean;
  className?: string;
  size?: number;
}) {
  const Cmp = ICONS[name] ?? CameraOff;
  return (
    <Cmp
      aria-hidden="true"
      size={size}
      strokeWidth={filled ? 2.25 : 1.75}
      className={className}
      fill={filled ? "currentColor" : "none"}
    />
  );
}