export interface InviteFormData {
  fullName: string;
  email: string;
  confirmEmail: string;
}

export interface InviteFormModalProps {
  onClose: () => void;
  onSubmit: (data: InviteFormData) => Promise<void>;
  serverError: string | null;
  setServerError: React.Dispatch<React.SetStateAction<string | null>>;
}
