import React, { memo } from 'react';
import {
  Settings, Users, Cpu, Layers, MessageSquare, Smartphone, ArrowRight, ArrowLeft,
  ArrowUp, CheckCircle, CheckCircle2, Zap, Star, Shield, Globe, Code, Database,
  BarChart, TrendingUp, Clock, Award, Target, Lightbulb, Rocket, Heart, Eye,
  Play, Pause, Volume2, Search, Filter, Bell, Mail, Phone, MapPin, Calendar,
  Download, Upload, Share2, ExternalLink, ChevronRight, ChevronLeft, ChevronDown,
  ChevronUp, X, Plus, Minus, Edit, Trash2, Save, Copy, Clipboard, Link, Image,
  Video, File, Folder, Home, Menu, Grid, List, MoreHorizontal, MoreVertical,
  Loader, RefreshCw, Lock, Unlock, Key, User, UserCheck, UserPlus, LogIn, LogOut,
  Monitor, Tablet, Activity, GitBranch, Cpu as CpuIcon, Server, Cloud, Wifi,
  Bot, Sparkles, Wrench, Package, LayoutDashboard, Gauge, MessageCircle,
  ThumbsUp, ThumbsDown, Info, HelpCircle, AlertCircle, AlertTriangle, CheckSquare,
  MousePointer, ShieldCheck, TrendingDown, Building, DollarSign, CreditCard,
  Briefcase, FileText, PieChart, LineChart, BarChart2, Megaphone,
  Send, SlidersHorizontal, Headphones, Coffee, Map, Navigation,
  Crosshair, Repeat, Maximize, Minimize, Sun, Moon
} from 'lucide-react';

const ICON_MAP = {
  Settings, Users, Cpu, Layers, MessageSquare, Smartphone, ArrowRight, ArrowLeft,
  ArrowUp, CheckCircle, CheckCircle2, Zap, Star, Shield, Globe, Code, Database,
  BarChart, TrendingUp, Clock, Award, Target, Lightbulb, Rocket, Heart, Eye,
  Play, Pause, Volume2, Search, Filter, Bell, Mail, Phone, MapPin, Calendar,
  Download, Upload, Share2, ExternalLink, ChevronRight, ChevronLeft, ChevronDown,
  ChevronUp, X, Plus, Minus, Edit, Trash2, Save, Copy, Clipboard, Link, Image,
  Video, File, Folder, Home, Menu, Grid, List, MoreHorizontal, MoreVertical,
  Loader, RefreshCw, Lock, Unlock, Key, User, UserCheck, UserPlus, LogIn, LogOut,
  Monitor, Tablet, Activity, GitBranch, Server, Cloud, Wifi,
  Bot, Sparkles, Wrench, Package, LayoutDashboard, Gauge, MessageCircle,
  ThumbsUp, ThumbsDown, Info, HelpCircle, AlertCircle, AlertTriangle, CheckSquare,
  MousePointer, ShieldCheck, TrendingDown, Building, DollarSign, CreditCard,
  Briefcase, FileText, PieChart, LineChart, BarChart2, Megaphone,
  Send, SlidersHorizontal, Headphones, Coffee, Map, Navigation,
  Crosshair, Repeat, Maximize, Minimize, Sun, Moon
};

const LucideIcon = memo(function LucideIcon({ name, size = 20, className, ...props }) {
  const IconComponent = ICON_MAP[name] || Layers;
  return <IconComponent size={size} className={className} {...props} />;
});

export default LucideIcon;
