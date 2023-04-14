import {IComponentDefine, IComponentProps, IComponentInstanceForm} from '@mtbird/shared';
import React from 'react';
import {List as AntdList} from 'antd';
import manifest from "./manifest";

const List: IComponentDefine<IComponentInstanceForm> = ({node, style}: IComponentProps) => {
    const options = node.data?.options;
    return (
        <div
            style={{
                ...style,
            }}
        >
            <AntdList
                itemLayout="horizontal"
                dataSource={options}
                renderItem={(cur: Record<string, any>) => (
                    <AntdList.Item
                        style={{
                            borderBlockEndColor: style.color,
                        }}
                        onClick={() => cur.href && (location.href = cur.href)}
                    >
                        <AntdList.Item.Meta
                            avatar={cur.icon ? <i className={`mtbird-icon ${cur.icon}`}/> : ''}
                            title={
                                // TODO 需要接口提取出所有文字样式
                                <span style={{color: style.color}}>{cur.label}</span>
                            }
                        />
                    </AntdList.Item>
                )}
            />
        </div>
    );
};

List.manifest = manifest;

export default List;