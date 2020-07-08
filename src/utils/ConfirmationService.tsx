import * as React from "react";
import { ConfirmationDialog, ConfirmationOptions } from "./ConfirmationDialog";

//see https://dev.to/dmtrkovalenko/the-neatest-way-to-handle-alert-dialogs-in-react-1aoe for explanations

const ConfirmationServiceContext = React.createContext<
    (options: ConfirmationOptions) => Promise<void>
    >(Promise.reject);

export const useConfirmation = () => React.useContext(ConfirmationServiceContext);

// @ts-ignore
export const ConfirmationServiceProvider = ({ children }) => {
    const [
        confirmationState,
        setConfirmationState
    ] = React.useState<ConfirmationOptions | null>(null);

    const awaitingPromiseRef = React.useRef<{
        resolve: () => void;
        reject: () => void;
    }>();

    const openConfirmation = (options: ConfirmationOptions) => {
        setConfirmationState(options);
        return new Promise<void>((resolve, reject) => {
            awaitingPromiseRef.current = { resolve, reject };
        });
    };

    const handleClose = () => {
        // @ts-ignore
        if (confirmationState.catchOnCancel && awaitingPromiseRef.current) {
            awaitingPromiseRef.current.reject();
        }

        setConfirmationState(null);
    };

    const handleSubmit = () => {
        if (awaitingPromiseRef.current) {
            awaitingPromiseRef.current.resolve();
        }

        setConfirmationState(null);
    };

    return (
        <>
            <ConfirmationServiceContext.Provider
                value={openConfirmation}
                children={children}
            />

            <ConfirmationDialog
                open={Boolean(confirmationState)}
                onSubmit={handleSubmit}
                onClose={handleClose}
                {...confirmationState}
            />
        </>
    );
};
