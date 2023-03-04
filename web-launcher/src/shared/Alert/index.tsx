import React, { useEffect } from 'react'

import { Alert as MantineAlert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

import styles from "./styles.module.scss";

type Props = {
    message: string;
    title?: string;
    onClose: () => void;
}
export const Alert = ({ message, title = "Ошибка!", onClose }: Props) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 5000);
        return () => clearTimeout(timer);
    }, [message])
    
    return (
        <MantineAlert className={styles.alert} onClose={onClose} hidden={!message} withCloseButton icon={<IconAlertCircle size="1rem" />} title={title} color="red" radius="md" variant="outline">
            {message}
        </MantineAlert>
    )
}
