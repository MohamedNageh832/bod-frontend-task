import { CircleCheckBig, Info, TriangleAlert, XCircle } from "lucide-react";
import { toast as sonner, type ExternalToast } from "sonner";

const icons = {
  success: <CircleCheckBig />,
  error: <XCircle />,
  info: <Info />,
  warning: <TriangleAlert />,
};

export const toast = {
  success: (title: string, options: ExternalToast) =>
    sonner.success(title, { icon: icons.success, ...options }),
  error: (title: string, options: ExternalToast) =>
    sonner.error(title, { icon: icons.error, ...options }),
  info: (title: string, options: ExternalToast) =>
    sonner.info(title, { icon: icons.info, ...options }),
  warning: (title: string, options: ExternalToast) =>
    sonner.warning(title, { icon: icons.warning, ...options }),
};
