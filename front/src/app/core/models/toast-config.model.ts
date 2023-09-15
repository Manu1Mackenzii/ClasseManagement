export type ToastHorizontalPosition = "start" | "center" | "end" | "left" | "right";
export type ToastVerticalPosition = "top" | "bottom";
export type ToastType = 'DEFAULT' | 'SUCCESS' | 'ERROR' | 'INFO' | 'WARNING';

/**
 * Interface for data input
 */
export interface ToastNotificationInput {
  horizontalPosition ?: ToastHorizontalPosition;
  verticalPosition ?: ToastVerticalPosition;
  header?: string,
  content: any,
  animation?: string;
  duration?: number;
  type?: ToastType,
  show?: boolean,
  action?: string
}


export const toastDefaultConfig = {
  horizontalPosition: 'end',
  verticalPosition: 'bottom',
  header: '',
  content: '',
  animation: '',
  duration: 50000,
  type: 'INFO',
  show: true,
  action: 'OK',
}