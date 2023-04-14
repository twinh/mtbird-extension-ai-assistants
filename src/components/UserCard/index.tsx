import {IComponentDefine, IComponentProps, IComponentInstanceForm} from '@mtbird/shared';
import React, {useEffect, useState} from 'react';
import {Avatar, Button, Spin, message} from 'antd';
import manifest from "./manifest";
// import axios from "axios";
import styles from "./style.module.less";
import {UserOutlined} from '@ant-design/icons';

const UserCard: IComponentDefine<IComponentInstanceForm> = ({node, style}: IComponentProps) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        nickname: '',
        avatar: null
    });

    useEffect(() => {
        // @ts-ignore
        axios.get(`${process.env.API_URL}/user/info`, {
            headers: {
                Authorization: "Bears " + localStorage.getItem("AUTH_TOKEN"),
            },
        }).then((res: any) => {
            if (200 !== res.data.code) {
                message.error(res.data.msg);
                return;
            }
            setUser(res.data.data);
            setLoading(false);
        });
    }, []);

    return (
        <div
            className={styles.userCard}
            style={style}
        >
            {loading && <Spin/>}
            {!loading && !user.nickname && <Button href="/auth/login?to=note-generator">登录 / 注册</Button>}
            {!loading && user.nickname && <div>
                <Avatar size={60} src={user.avatar} icon={<UserOutlined/>}></Avatar>
                <span className={styles.nickname}>{user.nickname}</span>
            </div>}
        </div>
    );
};

UserCard.manifest = manifest;

export default UserCard;