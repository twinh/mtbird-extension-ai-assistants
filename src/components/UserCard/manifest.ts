import {COMPONENT} from "@mtbird/core";
import {IComponentManifest, IComponentInstanceForm} from "@mtbird/shared";

const manifest: IComponentManifest<IComponentInstanceForm> = {
    type: "component",
    componentName: "UserCard",
    title: "用户卡片",
    icon: "mtbird-user",
    desc: "",
    category: "basic",
    schema: [
        ...COMPONENT.SCHEMA_COMPONENT_BASIC_STYLE,
    ],
    instance: {
        type: "component",
        componentName: "UserCard",
        props: {
            style: {
                ...COMPONENT.COMPONENT_DEFAULT_STYLE,
                borderRadius: 10,
                backgroundColor: '#84cff8',
                width: 320,
                height: 140,
            },
        },
        data: {},
    },
};

export default manifest;