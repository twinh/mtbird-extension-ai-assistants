import {IComponentDefine, IComponentProps, IComponentInstanceForm, IExtensionContext} from '@mtbird/shared';
import React, {useState} from 'react';
import {Button, Input, message} from "antd";
import manifest from "./manifest";
import {generateKeys} from "@mtbird/core";
import {getMessage, sendMessage} from "../../services/ai";
import PayModal from "../../common/PayModal";
import styles from "./style.module.less";

const NoteGenerator: IComponentDefine<IComponentInstanceForm> = ({node, style}: IComponentProps) => {
    const {props} = node;

    const context = {
        // @ts-ignore
        request: axios,
        storage: localStorage,
    } as IExtensionContext;

    const [isOpen, setIsOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState<string>(props.prompt as string);
    const [note, setNote] = useState<string>('');

    const handleSend = async () => {
        if (!prompt || prompt.trim().length === 0) {
            message.error("请输入消息内容!");
            return
        }

        setIsLoading(true);
        try {
            const {data} = await sendMessage(
                context,
                prompt,
                generateKeys()
            );

            if (data.code === 40012) {
                message.error({
                    title: "不要发敏感词～",
                    icon: "error",
                });
                return;
            }

            pullingMessage(data.data.id);
        } catch (e) {
            if (e.response?.data?.msg === "AI使用次数超出限制，请充值") {
                setIsOpen(true);
                return;
            }

            console.log('res error', e);
            message.warning('请求失败：' + e.response.status);
        } finally {
          setIsLoading(false);
        }
    };

    const pullingMessage = async (id: string) => {
        const {data} = await getMessage(context, id);

        setNote(data.data.content);
        if (note && note.length > 0) {
            setIsLoading(false);
        };

        if (!data.data) {
            setIsLoading(false);
            return message.error({
                title: "小星出错了～",
                icon: "error",
            });
        }

        if (!data.data.isFinish) {
            setTimeout(() => {
                pullingMessage(id);
            }, 500);
        } else {
            setIsLoading(false);
        }
    };

    return (
        <div
            className={styles.container}
            style={{
                ...style,
            }}
        >
            <Input.TextArea
                placeholder="请输入 prompt"
                value={prompt}
                rows={4}
                onChange={(e: any) => setPrompt(e.target.value)}
                className={styles.textarea}
            />

            <Button type="primary" shape="round" size="large" block
                loading={isLoading}
                onClick={handleSend}
                className={styles.button}
            >
                生成
            </Button>

            {note.length > 0 && <div className={styles.note}>
                {note}
            </div>}

            <PayModal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
            />
        </div>
    );
};

NoteGenerator.manifest = manifest;

export default NoteGenerator;