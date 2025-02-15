export interface ModalProps {
  title: string;
  children: React.ReactNode;
  showClose?: boolean;
  onClose: () => void;
}
