import { LucideIcon } from "lucide-react";
import { MotionValue } from "framer-motion";

interface NavbarItemProps {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface NavbarProps {
  items: NavbarItemProps[];
  className?: string;
}

export interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface WrapperProps {
  children: React.ReactNode;
}

export interface WorkSliderButtonProps {
  containerStyle: string;
  buttonStyle: string;
  iconsStyle: string;
}

export interface FooterSocialProps {
  SocialIcon: {
    icon: React.ReactNode;
    href: string;
    label: string;
  }[];
}

export interface FooterMainLinksProps {
  mainLinks: Array<{
    href: string;
    label: string;
  }>;
}

export interface FooterLegalLinksProps {
  legalLinks: Array<{
    href: string;
    label: string;
  }>;
}

export interface FooterCopyrightProps {
  text: string;
  license?: string;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "default" | "danger" | "warning";
  icon?: React.ReactNode;
}

export interface useConfirmationModalProps {
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "default" | "danger" | "warning";
}


