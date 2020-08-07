/// <reference types="react" />
export interface ErrorAlertProps {
    message: string;
    show: boolean;
    onClose: () => void;
}
export default function ErrorAlert(props: ErrorAlertProps): JSX.Element;
